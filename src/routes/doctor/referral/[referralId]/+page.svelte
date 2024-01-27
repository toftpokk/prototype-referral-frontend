<script lang="ts">
    import { env } from '$env/dynamic/public';
    import ReferralView from '$lib/ReferralView.svelte';
    import * as Card from '$lib/components/ui/card';
    import { ReferralStatus, translateFileState } from '$lib/global';

    export let data : import('./$types').PageData;
</script>
<div class="mx-auto max-w-[40rem]">
    {#await data.referral}
        <p>Loading Referral...</p>
    {:then referral} 
        <ReferralView referral={referral} referralId={data.referralId} isDoc={true}/>
        <Card.Root class="my-2">
            <Card.Header class="">
              <Card.Title>Files</Card.Title>
            </Card.Header>
            <Card.Content>
                <ul>
                    <li class="w-50 flex justify-between">
                    {#each data.referralFiles as file}
                        <span>{file}</span>
                        {#if data.isAssigned}
                            <a class="underline" href={env.PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+data.referralId+"/download/"+file} download>Download</a>
                        {:else}
                            <span>{translateFileState(referral.ReferralStatus)}</span>
                        {/if}
                    {/each}
                    </li>
                </ul>
            </Card.Content>
          </Card.Root>
    {:catch}
        <p>Error: Could not fetch referral</p>
    {/await}
</div>