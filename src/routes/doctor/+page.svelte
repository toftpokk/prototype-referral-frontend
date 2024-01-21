<script lang="ts">
    import spinner from '$lib/spinner.svg'
import * as Table from "$lib/components/ui/table";
  import { Button } from "$lib/components/ui/button";
    import { ReferralStatus, type Referral } from "$lib/global";
    import TableMenu from "./TableMenu.svelte";
    export let data;
    function translateReferralStatus(status: ReferralStatus){
        switch(status){
            case ReferralStatus.Created:
                return "Awaiting Patient Consent"
            case ReferralStatus.Consented:
                return "Awaiting Destination Hospital"
            case ReferralStatus.Complete:
                return "Referral Complete"
            case ReferralStatus.UploadIncomplete:
                return "Uploading"
            case ReferralStatus.Granted:
                return "Preparing Data"
            case ReferralStatus.UploadComplete:
                return "Upload Complete"
            case ReferralStatus.NotGranted:
                return "Destination Denied Referral"
            default:
                return status
        }
    }
</script>

<svelte:head>
    <title>Referral Cases</title>
</svelte:head>
<style>
    /* Errors */
    .NotGranted{
        @apply bg-red-300;
    }
    /* Action Needed */
    .Created {
        @apply bg-orange-300;
    }
    /* Action Not Needed */
    .Consented{
        @apply bg-gray-300;
    }
    .UploadIncomplete{
        @apply bg-gray-300;
    }
    .Granted{
        @apply bg-gray-300;
    }
    .UploadComplete {
        @apply bg-green-300;
    }
    .Complete{
        @apply bg-green-300;
    }
</style>
<div class="max-w-[80rem] mx-auto">
    <div class="my-5">
        <Button href="/doctor/referral/new" variant="default">Create New Referral</Button>
    </div>
    {#await data.referrals}
    <div>
        <div class="mx-auto w-[20rem] text-xl text-center">Loading...</div>
        <img src={spinner} alt="spinner" class="mx-auto mt-4 w-[3rem]"/>
    </div>
    {:then referrals}
<Table.Root class="">
    <Table.Header>
        <Table.Row>
            <Table.Head class="w-[50px] text-right">ID</Table.Head>
            <Table.Head>Patient</Table.Head>
            <Table.Head>Destination</Table.Head>
            <Table.Head>Created</Table.Head>
            <Table.Head>Reason</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Actions</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each referrals as referral}
            <Table.Row>
                <Table.Cell class="text-right text-md">{referral.Id}</Table.Cell>
                <Table.Cell>{`${referral.Prefix} ${referral.FirstName} ${referral.LastName}`}</Table.Cell>
                <Table.Cell>{referral.Destination}</Table.Cell>
                <Table.Cell>{(new Date(referral.Created)).toLocaleString('en-UK')}</Table.Cell>
                <Table.Cell>{referral.Reason}</Table.Cell>
                
                <Table.Cell>
                    <span class={referral.ReferralStatus+" inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none select-none focus:ring-2 focus:ring-ring focus:ring-offset-2"}>
                        {translateReferralStatus(referral.ReferralStatus)}
                    </span>
                </Table.Cell>
                <Table.Cell>
                    <TableMenu class="w-8 h-8 p-0" url={"/doctor/referral/"+referral.Id}>
                    <span class="sr-only">Open menu</span>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor"></path></svg>
                    </TableMenu>
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
    {:catch}
        <div class="mx-auto w-[20rem] text-xl text-center">Error: Could not load referral data</div>
    {/await}
</div>
