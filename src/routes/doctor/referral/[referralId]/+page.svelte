<script lang="ts">
    import ReferralView from '$lib/ReferralView.svelte';
    import * as Card from '$lib/components/ui/card';
    import { ReferralStatus, translateFileState } from '$lib/global';

    export let data : import('./$types').PageData;
</script>
<div class="mx-auto max-w-[40rem]">
    {#await data.referral}
        <p>Loading Referral...</p>
    {:then referral} 
        <ReferralView referral={referral} referralId={data.referralId}/>
        <Card.Root class="my-2">
            <Card.Header class="">
              <Card.Title>Files</Card.Title>
            </Card.Header>
            <Card.Content>
                <ul>
                    {#each data.referralFiles as file}
                    <li class="w-50 flex justify-between">
                        <span>{file}</span>
                        <span>{translateFileState(referral.ReferralStatus)}</span></li>
                    {/each}
                </ul>
            </Card.Content>
          </Card.Root>
    {:catch}
        <p>Error: Could not fetch referral</p>
    {/await}
</div>