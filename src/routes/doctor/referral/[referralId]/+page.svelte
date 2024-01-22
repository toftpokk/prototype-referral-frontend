<script lang="ts">
    import ReferralView from '$lib/ReferralView.svelte';

    export let data : import('./$types').PageData;
</script>
<div>
    {#await data.referral}
        <p>Loading Referral...</p>
    {:then referral} 
        <ReferralView referral={referral} referralId={data.referralId}/>
    {:catch}
        <p>Error: Could not fetch referral</p>
    {/await}
</div>