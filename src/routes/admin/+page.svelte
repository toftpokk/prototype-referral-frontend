<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Table from "$lib/components/ui/table";
      import ReferralTable from '$lib/ReferralTable.svelte';
      import Spinner from '$lib/Spinner.svelte';
      export let data;
  </script>
  
  <svelte:head>
      <title>Referral Cases</title>
  </svelte:head>
  
  <div class="max-w-[80rem] mx-auto">
      {#await data.hospitals}
      <div>
          <div class="mx-auto w-[20rem] text-xl text-center">Loading...</div>
          <Spinner class="mx-auto mt-4 w-[3rem]"/>
      </div>
      {:then hospitals}
        <Button href="/admin/new" variant="default">Create New Hospital</Button>
        <Table.Root class="">
            <Table.Header>
                <Table.Row>
                    <Table.Head class="w-[50px] text-right">ID</Table.Head>
                    <Table.Head>Code</Table.Head>
                    <Table.Head>Name</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each hospitals as hospital}
                    <Table.Row>
                        <Table.Cell>{hospital.Id}</Table.Cell>
                        <Table.Cell>{hospital.HospitalId}</Table.Cell>
                        <Table.Cell>{hospital.HospitalName}</Table.Cell>
                    </Table.Row>
                {:else}
                <Table.Row class="mx-auto text-center">
                    <Table.Cell colspan={7} class="text-muted-foreground">No Hospitals Found</Table.Cell>
                </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
      {:catch}
          <div class="mx-auto w-[20rem] text-xl text-center">Error: Could not load referral data</div>
      {/await}
  </div>
  