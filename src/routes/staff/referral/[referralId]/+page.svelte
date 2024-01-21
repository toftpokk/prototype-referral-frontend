<script lang="ts">
    import ReferralView from '$lib/ReferralView.svelte';
    import { Button } from '$lib/components/ui/button';
    import { ReferralStatus } from '$lib/global';
    import GrantDialog from '../../GrantDialog.svelte';
    export let data : import('./$types').PageData;
    let dialogOpen : Function
</script>
<GrantDialog bind:dialogOpen={dialogOpen}/>
<div class="mx-auto max-w-[40rem]">
    {#await data.referral}
    <p>Loading Referral...</p>
    {:then referral} 
    <ReferralView referral={referral}/>
    <div class="ml-40">
        {#if referral.ReferralStatus == ReferralStatus.Created}
            <Button on:click={dialogOpen(data.referralId)}>Grant Details</Button>
        {/if}
    </div>
    {:catch}
    <p>Error: Could not fetch referral</p>
    {/await}
</div>