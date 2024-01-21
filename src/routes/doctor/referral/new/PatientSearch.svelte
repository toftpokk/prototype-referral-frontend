<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import { createTable, Render, Subscribe } from "svelte-headless-table";
    import { readable } from "svelte/store";
    import * as Dialog from "$lib/components/ui/dialog"
  import { Button, buttonVariants } from "$lib/components/ui/button";
    import { addSelectedRows } from "svelte-headless-table/plugins";
    import type { PatientData } from "$lib/global";

export let data : PatientData[] = [

]
// Table
const table = createTable(readable(data),{
  select: addSelectedRows()
})
const columns = table.createColumns([
  table.column({
    accessor: "Hn",
    header: "HN"
  }),
  table.column({
    accessor: "CitizenId",
    header: "Citizen ID"
  }),
  table.column({
    accessor: patientToName,
    header: "Name"
  }),
  table.column({
    accessor: "BirthDate",
    header: "Birthday"
  }),
  table.column({
    accessor: "Gender",
    header: "Gender"
  }),
  table.column({
    accessor: "Email",
    header: "Email"
  }),
  table.column({
    accessor: "Telephone",
    header: "Telephone"
  }),
])
const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
    table.createViewModel(columns,{
      rowDataId: ({Hn})=> Hn
    });
function patientToName(p : any):string{
    return `${p.Prefix.toUpperCase()} ${p.FirstName} ${p.LastName}`
  }
let selectedPatientRow : any
export let submit : Function
let dialogOpen = false
function setOpen(val:boolean){
  dialogOpen = val
}
export let dataView = "Find Patient"
</script>

<Dialog.Root open={dialogOpen} onOpenChange={setOpen}>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })+" w-full text-start ps-0"} 
    ><span class="w-full pl-3">{dataView}</span></Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[60rem]">
    <Dialog.Header>
      <Dialog.Title>Find Patient</Dialog.Title>
    </Dialog.Header>

    <Table.Root {...$tableAttrs} class="w-full">
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Table.Head {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs} class="cursor-pointer select-none" on:click={()=>{
              selectedPatientRow = row
            }}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
    {#if data.length == 0}
      <p>Fetching data...</p>
    {/if}

    <Dialog.Footer>
      {#if selectedPatientRow}
        <p class="py-2">Selected: {patientToName(selectedPatientRow.original)}</p>
        <Button type="submit" on:click={()=>{
          submit(selectedPatientRow.original)
          setOpen(false)
        }}>Select Patient</Button>
      {:else}
        <p class="py-2">No patient selected</p>
        <Button type="submit" class="bg-slate-300 hover:bg-slate-300">Select Patient</Button>
      {/if}      
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>