<script lang="ts">
    import {ReferralStatus} from "$lib/global"

export let header : {key:string, name:string, type?:string, url?:string}[]
    // {key:"name", name:"Name"}
export let data : Record<string,any>[]
    // { key: value }
const statusToClass = (status: ReferralStatus)=>{
    let c = "badge"
    if(status == ReferralStatus.AwaitingConsent || status == ReferralStatus.AwaitingConfirmation){
        c+=" bg-warn-50 text-yellow-600"
    }
    else if(status == ReferralStatus.Complete){
        c+=" bg-done-50 text-done-100"
    }
    // else if(status == ReferralStatus.consentDenied || status == ReferralStatus.grantDenied){
    //     c+=" bg-error-50 text-error-100"
    // }
    else{
        c+=" bg-gray-300"
    }
    return c
}
const statusToNum = (status: ReferralStatus)=>{
    switch (status) {
        case ReferralStatus.PreparingData: return 7
        case ReferralStatus.Created: return 6
        case ReferralStatus.AwaitingConsent: return 5
        case ReferralStatus.ConsentGiven: return 4
        case ReferralStatus.AwaitingConfirmation: return 3
        case ReferralStatus.TransferringData: return 2
        case ReferralStatus.AwaitingCompletion: return 1
        case ReferralStatus.Complete: return 0
        default: return 8
    }
}
const statusToString = (status: ReferralStatus)=>{
    switch (status) {
        case ReferralStatus.PreparingData:
            return "Preparing Data"
        case ReferralStatus.Created:
            return "Created"
        case ReferralStatus.AwaitingConsent:
            return "Waiting for Consent"
        case ReferralStatus.ConsentGiven:
            return "Consent Given"
        case ReferralStatus.AwaitingConfirmation:
            return "Waiting for Confirmation"
        case ReferralStatus.TransferringData:
            return "Transferring Data"
        case ReferralStatus.AwaitingCompletion:
            return "Waiting for Completion"
        case ReferralStatus.Complete:
            return "Complete"
        default:
            return "Unknown"
    }
}
const sortCol = (key: string)=>{
    return ()=>{
        data = data.toSorted((a,b)=>{
            if(key == "status"){
                let a_num = 0
                let b_num = 0
                if(a["ReferralStatus"]){
                    a_num = statusToNum(a["ReferralStatus"])
                }
                if(b["ReferralStatus"]){
                    b_num = statusToNum(b["ReferralStatus"])
                }
                return a_num > b_num?-1:1
            }
            return a[key] < b[key]? -1:1
        })
    }
}
</script>
<table>
    <thead>
        <tr>
            {#each header as h}
            {#if h.type == "select"}
                <th class="min-w-0"><button on:click={sortCol(h.key)}>{h.name}</button></th>
            {:else}
                <th><button class="text-left" on:click={sortCol(h.key)}>{h.name}</button></th>
            {/if}
                 
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each data as dataRow}
        <!-- each row -->
        <tr>
            {#each header as h}
                <!-- each col -->
                {#if "type" in h}
                    <!-- Type status-->
                    {#if h.type == "status"}
                        <td>
                            <span class={statusToClass(dataRow[h.key])}>{dataRow[h.key]}</span>
                        </td>
                    {:else if h.type == "action"}
                        <td>
                            {#if dataRow["Id"]}
                                <a href={h.url+dataRow["Id"]}>{dataRow[h.key]}</a>
                            {/if}    
                        </td>
                    {:else if h.type == "select"}
                        <td>
                            <input type="checkbox" name={dataRow["id"]}/>
                        </td>
                    {:else if h.type == "date"}
                        {#if typeof dataRow[h.key] == "number"}
                            <td>{new Date(dataRow[h.key]*1000).toLocaleString('en-UK')}</td>
                        {:else}
                            <td>No Date</td>
                        {/if}
                    {/if}
                {:else}
                    <td>{dataRow[h.key]}</td>
                {/if}
            {/each}
        </tr>
        {/each}
    </tbody>
</table>