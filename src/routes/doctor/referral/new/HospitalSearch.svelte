<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import { createTable, Render, Subscribe } from "svelte-headless-table";
    import { readable } from "svelte/store";
    import * as Dialog from "$lib/components/ui/dialog"
  import { Button, buttonVariants } from "$lib/components/ui/button";
    import { addSelectedRows } from "svelte-headless-table/plugins";
const data = [
  {
    Id: "12345",
    Name: "Hospital One",
  },
  {
    Id: "67890",
    Name: "Hospital Two",
  },
]
const table = createTable(readable(data),{
  select: addSelectedRows()
})
const columns = table.createColumns([
  table.column({
    accessor: "Id",
    header: "ID"
  }),
  table.column({
    accessor: "Name",
    header: "Name"
  }),
])
const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
    table.createViewModel(columns,{
      rowDataId: ({Id})=> Id
    });
function patientToName(p : any):string{
    return `${p.Id}: ${p.Name}`
  }
let selectedPatient : any = null
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
              selectedPatient = row
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

    <Dialog.Footer>
      {#if selectedPatient}
        <p class="py-2">Selected: {patientToName(selectedPatient.original)}</p>
        <Button type="submit" on:click={()=>{
          submit(selectedPatient.original)
          setOpen(false)
        }}>Select Destination</Button>
      {:else}
        <p class="py-2">No hospital selected</p>
        <Button type="submit" class="bg-slate-300 hover:bg-slate-300">Select Destination</Button>
      {/if}      
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>