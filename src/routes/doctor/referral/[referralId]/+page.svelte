<script lang="ts">
    import { env } from '$env/dynamic/public';
    import FileView from '$lib/FileView.svelte';
    import ReferralView from '$lib/ReferralView.svelte';
    import * as Card from '$lib/components/ui/card';
    import { ReferralStatus, translateFileState, translateHospitalClient } from '$lib/global';

    export let data : import('./$types').PageData;
</script>
<div class="mx-auto max-w-[40rem]">
    {#await data.referral}
        <p>Loading Referral...</p>
    {:then referral} 
        <ReferralView referral={referral} referralId={data.referralId} isDoc={true} translateHospital={translateHospitalClient}/>
          <FileView
            referral={referral}
            referralId={data.referralId}
            files={data.referralFiles}
            isAssigned={data.isAssigned}
            isOrigin={referral.Origin == env.PUBLIC_HOSPITAL_ID}
            isDoc={true}
            data={data.referralDatafile}
          >
          </FileView>
    {:catch}
        <p>Error: Could not fetch referral</p>
    {/await}
</div>