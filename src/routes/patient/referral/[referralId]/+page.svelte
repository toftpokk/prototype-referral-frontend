<script lang="ts">
    import { ConsentStatus } from '$lib/global';
    import ConsentDialog from '../../ConsentDialog.svelte';

    export let data : import('./$types').PageData;

    let dialogOpen : Function

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
{#if data.referral}
    <ConsentDialog bind:dialogOpen={dialogOpen}/>
    <div>
        <h2 class="text-xl font-bold">Referral</h2>
        <p>{data.referral.IsOutgoing?"This is an outgoing referral":"This is an incoming referral"}</p>
        <p>referralId: {data.referralId}</p>
        <p>Destination: {data.referral.Destination}</p>
        <p>Creation Date: {new Date(data.referral.CreationDate *1000).toLocaleString('en-UK')}</p>
        <h2 class="text-xl font-bold">Patient</h2>
        <p>CitizenId: {data.referral.CitizenId}</p>
        <p>Gender: {data.referral.Gender}</p>
        <p>Name: {getPrefix(data.referral.Prefix)} {data.referral.FirstName} {data.referral.LastName}</p>
        <p>BirthDate: {data.referral.BirthDate}</p>
        <p>Address: {data.referral.Address}</p>
        <h2 class="text-xl font-bold">Consent Requests</h2>
        {#each data.consent as consent}
            <p>{consent.Id} ({consent.ConsentStatus}): {consent.Message}
                {#if consent.ConsentStatus == ConsentStatus.AwaitingConsent}
                    <button class="btn-alt" on:click={dialogOpen(consent)}>View</button>
                {/if}
            </p>
        {/each}
    </div>
{:else}
    <p>Error: {data.error}</p>
{/if}