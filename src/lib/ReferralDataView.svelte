<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button, buttonVariants } from "$lib/components/ui/button";
    import Summary from "../routes/doctor/referral/new/Summary.svelte";
    import type { ReferralDataFile } from "./global";
  
  let dialogOpen = false;
  function setOpen(val: boolean) {
    dialogOpen = val;
  }
  export let data: ReferralDataFile;
</script>
<style>
  .key {
      @apply text-muted-foreground pr-2 h-6 text-base mt-4;
  }
  .val {
      @apply col-span-3 text-lg;
  }
</style>

<Dialog.Root open={dialogOpen} onOpenChange={setOpen}>
    <Dialog.Trigger
      class={buttonVariants({ variant: "default" }) + " my-2 text-start ps-0"}
    >
      <span class="w-full pl-3">View Patient Data</span>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[60rem]">
      <Dialog.Header>
        <Dialog.Title>Patient Data</Dialog.Title>
      </Dialog.Header>
      <div class="overflow-y-scroll max-h-[30rem]">
        <div class="mx-2 mb-8">
          <p class="key">Diagnosis</p>
          <p class="val">{data.Diagnosis}</p>
          <p class="key">History</p>
          <p class="val">{data.History}</p>
        </div>
        <Summary data={data.Summary} checks={{}} hasCheck={false} />
      </div>
    </Dialog.Content>
  </Dialog.Root>