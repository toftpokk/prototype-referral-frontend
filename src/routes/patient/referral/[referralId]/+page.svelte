<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { PUBLIC_SERVER_FRONTEND_URL } from '$env/static/public';
    import ReferralView from '$lib/ReferralView.svelte';
    import { Button } from '$lib/components/ui/button';
    import { ReferralStatus } from '$lib/global';
    import ConsentDialog from '../../ConsentDialog.svelte';

    export let data : import('./$types').PageData;
    let dialogOpen : Function
    let consentError = ""
    function giveConsent(){
        const response = fetch(PUBLIC_SERVER_FRONTEND_URL+"/referral/"+data.referralId+"/consent",{
            method: "POST"
        }).then(async (d: Response)=>{
            if(d.status != 200){
                consentError = await d.json()
                return
            }
            consentError = ""
            invalidateAll()
        })
    }
</script>
<ConsentDialog bind:dialogOpen={dialogOpen}/>
<div>
    {#await data.referral}
        <p>Loading Referral...</p>
    {:then referral} 
        <ReferralView referral={referral} referralId={data.referralId}/>
        {#if consentError}
                <p>Consent Error: {consentError}</p>
        {:else}
            {#if referral.ReferralStatus == ReferralStatus.Created}
                <Button class="btn-alt" on:click={giveConsent}>Give Consent to Referral</Button>
            {:else}
                <p>Consent given, transferring data...</p>
            {/if}
        {/if}
    {:catch}
        <p>Error: Could not fetch referral</p>
    {/await}
</div>