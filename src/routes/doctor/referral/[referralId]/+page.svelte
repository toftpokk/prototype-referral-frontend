<script lang="ts">
    export let data : import('./$types').PageData;
    function getPrefix(p: string){
        if(p == "mr"){
            return "Mr."
        }
        else if(p == "mrs"){
            return "Mrs."
        }
        else if(p == "ms"){
            return "Ms."
        }
    }
</script>
<div>
    {#if data["error"]}
        <p>{data["error"]}</p>
    {:else}
        <h2 class="text-xl font-bold">Referral</h2>
        <p>referralId: {data.referralId}</p>
        <p>Destination: {data.referral.Destination}</p>
        <p>Creation Date: {new Date(data.referral.Created).toLocaleString('en-UK')}</p>
        <h2 class="text-xl font-bold">Patient</h2>
        <p>CitizenId: {data.referral.CitizenId}</p>
        <p>Gender: {data.referral.Gender}</p>
        <p>Name: {getPrefix(data.referral.Prefix)} {data.referral.FirstName} {data.referral.LastName}</p>
        <p>BirthDate: {data.referral.BirthDate}</p>
        <p>Address: {data.referral.Address}</p>
        <p>Telephone: {data.referral.Telephone}</p>
    {/if}
</div>