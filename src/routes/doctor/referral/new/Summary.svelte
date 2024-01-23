<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion";
  import * as Tabs from "$lib/components/ui/tabs";
    import { BarChart3 } from "lucide-svelte";
    import Button from "$lib/components/ui/button/button.svelte";
  type Data = {
    Encounter: {
      Id: string;
      Name: string;
      Reason: string;
      Start: string;
    },
    Observations: {
      Id: string;
      Encounter: string;
      Name: string;
      Value: string;
      Unit: string;
    }[];
  };
  export let data: Data[];
  let dataFix : (Data & {Start: string})[];
  let df : Data[];
  export let checks : Record<string,boolean> = {};
  function resetCheck(){
    checks = {}
  }
  $: {
    dataFix = data
    .map((enc) => {
      let start_date = new Date(0)
      try{
        start_date = new Date(enc.Encounter.Start)
      } catch(e){
        console.log(e)
      }
      return {
        ...enc,
        Start: start_date,
      };
    })
    .sort((a, b) => {
      return a.Start > b.Start ? -1 : 1;
    })
    .map((enc) => {
      return {
        ...enc,
        Start: enc.Start.toISOString().substring(0, 10),
        // Start: "Invalid"
      };
    });
    console.log(dataFix)
    resetCheck()
  }
</script>

<Tabs.Root value="visits" class="">
  <Tabs.List>
    <Tabs.Trigger value="visits">Visits</Tabs.Trigger>
    <!-- <Tabs.Trigger value="graph">Graph</Tabs.Trigger> -->
  </Tabs.List>
  <Tabs.Content value="visits">
    <form class="h-[20rem] overflow-scroll">
      <Accordion.Root>
        {#each dataFix as encounter}
          <Accordion.Item value={encounter.Encounter.Id} class="flex">
            <input type="checkbox" class="my-5 w-7 inline-block mb-auto accent-primary" value={encounter.Encounter.Id} bind:checked={checks[encounter.Encounter.Id]}/>
            <div class="flex-grow flex-col">
            <Accordion.Trigger class="flex-row flex">
              <span class="w-full text-left flex" >
                <span class="text-muted-foreground px-4 w-[7rem]">{encounter.Start}</span>
                <span class="flex-grow">
                  {encounter.Encounter.Name}{encounter.Encounter.Reason
                    ? ": " + encounter.Encounter.Reason
                    : ""}</span>
              </span>
              {#if encounter.Observations.length > 0}
                <span class="mx-4"><BarChart3/></span>
              {/if}
              </Accordion.Trigger
            >
            <Accordion.Content>
              {#each encounter.Observations as obs}
                <p class="ml-6 mt-2">{obs.Name}: {obs.Value} {obs.Unit}</p>
              {/each}
            </Accordion.Content>
          </div>
          </Accordion.Item>
        {/each}
      </Accordion.Root>
    </form>
  </Tabs.Content>
  <!-- <Tabs.Content value="graph">
  </Tabs.Content> -->
</Tabs.Root>

