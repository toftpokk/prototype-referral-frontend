<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { PUBLIC_CLIENT_FRONTEND_URL, PUBLIC_HOSPITAL_ID } from '$env/static/public';
    import ReferralView from '$lib/ReferralView.svelte';
    import { Button } from '$lib/components/ui/button';
    import { ReferralStatus } from '$lib/global';
    export let data : import('./$types').PageData;
    let grantError = ""
    const grant = (verdict: boolean)=>()=>{
        const payload = JSON.stringify({
            Granted: verdict
        })
        console.log(payload)
        const response = fetch(PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+data.referralId+"/grant",{
            method: "POST",
            body: payload
        }).then(async (d: Response)=>{
            if(d.status != 200){
                grantError = (await d.json()).message
                return
            }
            grantError = ""
            invalidateAll()
        })
    }
    function translateState(status : ReferralStatus){
        switch(status){
            case ReferralStatus.Created:
                return "Waiting"
            case ReferralStatus.Consented:
                return "Waiting"
            case ReferralStatus.Complete:
                return "Complete"
            case ReferralStatus.UploadIncomplete:
                return "Uploading"
            case ReferralStatus.Granted:
                return "Waiting"
            case ReferralStatus.UploadComplete:
                return "Complete"
            case ReferralStatus.NotGranted:
                return "Waiting"
            default:
                return status
        }
    }
</script>
<div class="mx-auto max-w-[40rem]">
    <ReferralView referral={data.referral} referralId={data.referralId}/>
    {#if data.referral.Origin == PUBLIC_HOSPITAL_ID}
        <!--I am origin-->
    {:else}
        <div class="ml-40">
            {#if grantError}
                <p>Grant Error: {grantError}</p>
            {/if}
            <div class="my-4">
            {#if data.referral.ReferralStatus == ReferralStatus.Consented}
                <Button on:click={grant(true)}>Grant Permission to Refer</Button>
                <Button on:click={grant(false)} variant="destructive">Deny Permission to Refer</Button>
            {:else if data.referral.ReferralStatus == ReferralStatus.Created}
                <p>Referral awaiting patient consent</p>
            {:else}
                <p>You have given permission to this referral</p>
            {/if}
        </div>
        </div>
    {/if}
    <div class=" ml-40">
    {#if data.referral.Origin != PUBLIC_HOSPITAL_ID}
            <div class="col-span-3 font-bold text-xl">Files</div>
                <ul>
                    {#each data.referralFiles as file}
                    <li class="w-50 flex justify-between">
                        <span>{file}</span>
                        {#if data.referral.ReferralStatus == ReferralStatus.Complete}
                             <!-- content here -->
                             <!-- href={PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+data.referralId+"/download/"+file} -->
                            <a class="underline" href={PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+data.referralId+"/download/"+file} download>Download</a>
                        {:else}
                            <span>{translateState(data.referral.ReferralStatus)}</span>
                        {/if}
                    </li>
                    {/each}
                </ul>
    {/if}
    </div>
</div>