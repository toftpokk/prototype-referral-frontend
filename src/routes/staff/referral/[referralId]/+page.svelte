<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { PUBLIC_CLIENT_FRONTEND_URL } from '$env/static/public';
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
</script>
<div class="mx-auto max-w-[40rem]">
    {#await data.referral}
        <p>Loading Referral...</p>
    {:then referral} 
        <ReferralView referral={referral} referralId={data.referralId}/>
        <div class="ml-40">
            {#if grantError}
                <p>Grant Error: {grantError}</p>
            {/if}
            {#if referral.ReferralStatus == ReferralStatus.Consented}
                <Button on:click={grant(true)}>Grant Permission to Refer</Button>
                <Button on:click={grant(false)} variant="destructive">Deny Permission to Refer</Button>
            {:else}
                <p>Not in a state to give or deny permissions</p>
            {/if}
        </div>
    {:catch}
        <p>Error: Could not fetch referral</p>
    {/await}
</div>