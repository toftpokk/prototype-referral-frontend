<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { PUBLIC_SERVER_FRONTEND_URL } from '$env/static/public';
    import ReferralView from '$lib/ReferralView.svelte';
    import * as Alert from '$lib/components/ui/alert';
    import { Button } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
    import * as Table from '$lib/components/ui/table';
    import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
    import Label from '$lib/components/ui/label/label.svelte';
    import { ReferralStatus, translateHospital, translateName } from '$lib/global';

    export let data : import('./$types').PageData;
    let consentError = ""
    let submitError = ""
    function giveConsent(){
        if(checked == false){
            submitError = "Please tick to agree to the terms and conditions"
            return
        }
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
    let checked : boolean = false
</script>
<div class="mx-auto max-w-[40rem]">
    {#await data.referral}
        <p>Loading Referral...</p>
    {:then referral} 
        <ReferralView referral={referral} referralId={data.referralId}/>
          <Card.Root class="my-2">
            <Card.Header class="pb-0">
              <Card.Title>Consent</Card.Title>
            </Card.Header>
            <Card.Content>
                {#if consentError}
                <p>Consent Error: {consentError}</p>
                {/if}
        {#if referral.ReferralStatus == ReferralStatus.Created}
            {#await translateHospital(referral.Destination)}
                <p class="my-2">a</p>
            {:then destHos}
            <div class="block my-4">
                <p class="my-2">I, <span class="underline">{referral.FirstName} {referral.LastName}</span> acknowledge the terms set out in this document in relation to my Personal Data:</p>
                <ol>
                    <li class="list-decimal ml-4">That I give permission to <span class="font-bold">Ministry of Public Health</span> to transfer or
                        process personal health data in accordance with the Personal Data Protection Act (PDPA).
                        By signing this consent form, I acknowledge that these terms apply to my personal health data.</li>
                    <li class="list-decimal ml-4">That I give permission to <span class="font-bold">{destHos}</span> to collect, use, disclose or
                        otherwise process said personal data in accordance with the Personal Data Protection Act (PDPA).
                        By signing this consent form, I acknowledge that these terms apply to all my personal health data.</li>
                </ol>
                <div class="my-4">
                    <Checkbox class="" bind:checked={checked}></Checkbox>
                    <Label class="mx-4 text-lg">I agree to the terms and conditions</Label>
                </div>
                {#if submitError != ""}
                    <Alert.Root class="my-4" variant="destructive">
                        <Alert.Title>Submission Error</Alert.Title>
                        <Alert.Description>
                            {submitError}
                        </Alert.Description>
                    </Alert.Root>
                {/if}
                <Button class="btn-alt block" on:click={giveConsent}>Submit</Button>
            </div>
            {/await}
        {:else if referral.ReferralStatus == ReferralStatus.Consented}
            <p class="my-2">You have given your consent. Your referral is being processed</p>
        {:else if referral.ReferralStatus == ReferralStatus.Complete}
            <p class="my-2">You have given your consent. Your referral is being processed</p>
        {:else if referral.ReferralStatus == ReferralStatus.NotGranted}
            <p class="my-2">The destination hospital has denied the permission to refer. Please contact your doctor.</p>
        {/if}
            </Card.Content>
          </Card.Root>
    {:catch}
        <p>Error: Could not fetch referral</p>
    {/await}
</div>