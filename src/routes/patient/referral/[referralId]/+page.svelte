<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import ReferralView from '$lib/ReferralView.svelte';
    import * as Alert from '$lib/components/ui/alert';
    import { Button, buttonVariants } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
    import * as Table from '$lib/components/ui/table';
    import {Input} from '$lib/components/ui/input';
    import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
    import Label from '$lib/components/ui/label/label.svelte';
    import { ReferralStatus, translateHospital, translateName } from '$lib/global';
    import { cn } from '$lib/utils';
    import { enhance } from '$app/forms';

    export let form : import('./$types').ActionData
    export let data : import('./$types').PageData;
</script>
<div class="mx-auto max-w-[40rem]">
    {#await data.referral}
        <p>Loading Referral...</p>
    {:then referral}
          <Card.Root class="my-2">
            <Card.Header class="pb-0">
              <Card.Title>Consent</Card.Title>
            </Card.Header>
            <Card.Content>
        {#if referral.ReferralStatus == ReferralStatus.Created}
            {#await translateHospital(referral.Destination)}
                <p class="my-2">Loading...</p>
            {:then destHos}
            <form class="block my-4" method="POST" use:enhance>
                <p class="my-2">I, <span class="underline">{referral.FirstName} {referral.LastName}</span> acknowledge the terms set out in this document in relation to my Personal Data:</p>
                <ol>
                    <li class="list-decimal ml-4">That I give permission to <span class="font-bold">Ministry of Public Health</span> to transfer or
                        process personal health data in accordance with the Personal Data Protection Act (PDPA).
                        By signing this consent form, I acknowledge that these terms apply to my personal health data.</li>
                    <li class="list-decimal ml-4">That I give permission to <span class="font-bold">{destHos}</span> to collect, use, disclose or
                        otherwise process said personal data in accordance with the Personal Data Protection Act (PDPA).
                        By signing this consent form, I acknowledge that these terms apply to all my personal health data.</li>
                </ol>
                <div class="my-4 flex">
                    <Input type="checkbox" name="agree" value="true" class="box-content shrink-0 flex items-center justify-center text-current h-4 w-4 accent-primary"/>
                    <Label class="mx-4 text-lg -mt-1">I agree to the terms and conditions</Label>
                </div>
                {#if form?.error}
                    <Alert.Root class="my-4" variant="destructive">
                        <Alert.Title>Submission Error</Alert.Title>
                        <Alert.Description>
                            {form.error}
                        </Alert.Description>
                    </Alert.Root>
                {/if}
                <Input type="submit" class={cn(buttonVariants(),"btn-alt block")} value="Submit"/>
            </form>
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
          <ReferralView referral={referral} referralId={data.referralId}/>  
    {:catch}
        <p>Error: Could not fetch referral</p>
    {/await}
</div>