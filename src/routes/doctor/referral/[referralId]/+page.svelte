<script lang="ts">
    import ReferralView from '$lib/ReferralView.svelte';
    import { ReferralStatus, translateFileState } from '$lib/global';

    export let data : import('./$types').PageData;
</script>
<div class="mx-auto max-w-[40rem]">
    {#await data.referral}
        <p>Loading Referral...</p>
    {:then referral} 
        <ReferralView referral={referral} referralId={data.referralId}/>
        <div class="ml-40">
            <div class="col-span-3 font-bold text-xl">Uploaded Files</div>
            <ul>
                {#each data.referralFiles as file}
                <li class="w-50 flex justify-between">
                    <span>{file}</span>
                    <span>{translateFileState(referral.ReferralStatus)}</span></li>
                {/each}
            </ul>
        </div>
    {:catch}
        <p>Error: Could not fetch referral</p>
    {/await}
</div>