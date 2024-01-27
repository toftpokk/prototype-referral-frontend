<script lang="ts">
    import { env } from '$env/dynamic/public';
    import * as Card from '$lib/components/ui/card';
    import { onMount } from 'svelte';
    import ReferralDataView from './ReferralDataView.svelte';
    import { Button } from './components/ui/button';
    import { translateFileState, type Referral, ReferralStatus, type ReferralDataFile } from './global';
    
    export let referral : Referral 
    export let referralId : string
    export let files : string[] = []
    export let isDoc : boolean = false
    export let isOrigin = true
    export let isAssigned = false
    export let sendReferral = ()=>{}
    export let data : ReferralDataFile = {Summary:[],Diagnosis:"",History:""}
</script>
<Card.Root class="my-2">
    <Card.Header class="">
      <Card.Title>Files</Card.Title>
    </Card.Header>
    <Card.Content>
        {#if isOrigin}
            {#if isDoc}
                <!-- Origin Doc -->
                <ul>
                    {#each files.filter((f)=>f != "ReferralData.json") as file}
                    <li class="w-50 flex justify-between">
                        <span>{file}</span>
                        <span>{translateFileState(referral.ReferralStatus)}</span>
                    </li>
                    {:else}
                    <p class="text-muted-foreground">This referral does not contain any files</p>
                    {/each}
                </ul>
            {:else}
                <!-- Origin Staff -->
                <ul>
                    {#each files.filter((f)=>f != "ReferralData.json") as file}
                    <li class="w-50 flex justify-between">
                        <span>{file}</span>
                        <span>{translateFileState(referral.ReferralStatus)}</span>
                    </li>
                    {:else}
                    <p class="text-muted-foreground">This referral does not contain any files</p>
                    {/each}
                </ul>
            {/if}
        {:else}
            {#if isDoc}
                <!-- Dest Doc -->
                <ul>
                    {#each files.filter((f)=>f != "ReferralData.json") as file}
                    <li class="w-50 flex justify-between">
                        <span>{file}</span>
                        {#if referral.ReferralStatus == ReferralStatus.Complete}
                            <a class="underline" href={env.PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+referralId+"/download/"+file} download>Download</a>
                        {:else}
                            <span>{translateFileState(referral.ReferralStatus)}</span>
                        {/if}
                    </li>
                    {:else}
                    <p class="text-muted-foreground">This referral does not contain any files</p>
                    {/each}
                    {#if referral.ReferralStatus == ReferralStatus.Complete}
                        <ReferralDataView
                        data={data}
                        ></ReferralDataView>
                    {/if}
                </ul>
            {:else}
                <!-- Dest Staff -->
                {#if referral.ReferralStatus != ReferralStatus.Complete}
                    <p>Patient data is not available until referral is completed</p>
                {:else}
                    <ul>
                        {#each files.filter((f)=>f != "ReferralData.json") as file}
                        <li class="w-50 flex justify-between">
                            <span>{file}</span>
                            <span>{translateFileState(referral.ReferralStatus)}</span>
                        </li>
                        {:else}
                        <p class="text-muted-foreground">This referral does not contain any files</p>
                        {/each}
                    </ul>
                    {#if !isAssigned}
                        <Button on:click={sendReferral}>Send Referral to Doctor</Button>
                    {:else}
                        <Button disabled>This referral has been transferred to the doctor</Button>
                    {/if}
                {/if}
            {/if}
        {/if}
    </Card.Content>
  </Card.Root>