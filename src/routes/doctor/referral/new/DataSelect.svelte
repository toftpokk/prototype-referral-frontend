<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public";
  import Summary from "./Summary.svelte";

  export let patientId: string;
  let data: Promise<Data>;
  async function getData(pId: string) {
    return fetch(PUBLIC_CLIENT_FRONTEND_URL + "/patient/" + pId + "/summary", {
      method: "GET",
    })
      .then(async (d: Response) => {
        if (d.status != 200) {
          throw await d.json();
        }
        return d.json();
      })
      .catch((e) => {
        return console.log(e);
      });
  }
  $: if (patientId) {
    data = getData(patientId);
  }
  type Data = {
    Id: string;
    Name: string;
    Reason: string;
    Start: string;
    Observations: {
      Id: string;
      Encounter: string;
      Name: string;
      Value: string;
      Unit: string;
    }[];
  }[];
  // Submission
  export let submit: Function;
  let dialogOpen = false;
  function setOpen(val: boolean) {
    dialogOpen = val;
  }
  export let dataView = "Find Patient Data";
  let checks: Record<string, boolean> = {};
</script>

<Dialog.Root open={dialogOpen} onOpenChange={setOpen}>
  <Dialog.Trigger
    class={buttonVariants({ variant: "outline" }) + " w-full text-start ps-0"}
  >
    <span class="w-full pl-3">{dataView}</span>
  </Dialog.Trigger>
  {#await data}
    <p>Loading data...</p>
  {:then dataVal}
    {#each Object.keys(checks) as check}
      {@const checkObject = dataVal.filter((a) => a.Id == check)[0]}
      <p class="my-4">
        <span class="text-muted-foreground mx-4">
          {checkObject.Start.substring(0, 10)}
        </span>{checkObject.Name}
      </p>
    {:else}
      <span class="w-full pl-3"></span>
    {/each}
  {:catch error}
    <p>Data load error: {error}</p>
  {/await}
  <Dialog.Content class="sm:max-w-[60rem]">
    <Dialog.Header>
      <Dialog.Title>Select Data</Dialog.Title>
    </Dialog.Header>

    {#await data}
      <p>Loading data...</p>
    {:then dataVal}
      <Summary data={dataVal} bind:checks />
    {:catch error}
      <p>Data load error: {error}</p>
    {/await}
    <Dialog.Footer>
      <Button
        on:click={() => {
          submit(checks);
          setOpen(false);
        }}>Submit</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
