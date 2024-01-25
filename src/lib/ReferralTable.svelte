<script lang="ts">
import * as Table from "$lib/components/ui/table";
    import {type Referral, translateHospital, translateName } from "$lib/global";
    import ReferralStatusBadge from "./ReferralStatusBadge.svelte";
    import TableMenu from "./TableMenu.svelte";
export let referrals : Referral[] = []
export let referralLink : string = "/"
export let isDoc : boolean = false
</script>
<Table.Root class="">
    <Table.Header>
        <Table.Row>
            <Table.Head class="w-[50px] text-right">ID</Table.Head>
            {#if isDoc}
                <Table.Head>Patient</Table.Head>
            {/if}
            <Table.Head>Origin</Table.Head>
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
                {#if isDoc}
                    <Table.Cell class="font-bold text-base"><a class="hover:underline" href={referralLink+"/"+referral.Id}>{translateName(referral)}</a></Table.Cell>
                {/if}
                {#await translateHospital(referral.Origin)}
                    <Table.Cell>...</Table.Cell>
                {:then value}
                    <Table.Cell>{value}</Table.Cell>
                {/await}
                {#await translateHospital(referral.Destination)}
                    <Table.Cell>...</Table.Cell>
                {:then value}
                    <Table.Cell>{value}</Table.Cell>
                {/await}
                <Table.Cell>{(new Date(referral.Created)).toLocaleString('en-UK')}</Table.Cell>
                <Table.Cell>{referral.Reason}</Table.Cell>
                
                <Table.Cell class="">
                    <ReferralStatusBadge class="w-max" status={referral.ReferralStatus}/>
                </Table.Cell>
                <Table.Cell>
                    <TableMenu class="w-8 h-8 p-0" url={referralLink+"/"+referral.Id}>
                    <span class="sr-only">Open menu</span>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor"></path></svg>
                    </TableMenu>
                </Table.Cell>
            </Table.Row>
        {:else}
        <Table.Row class="mx-auto text-center">
            <Table.Cell colspan={7} class="text-muted-foreground">No Referrals Found</Table.Cell>
        </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>