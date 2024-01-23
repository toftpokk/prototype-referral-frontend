<script lang="ts">
    import { Button } from "$lib/components/ui/button";
      import ReferralTable from '$lib/ReferralTable.svelte';
      import Spinner from '$lib/Spinner.svelte';
      export let data;
  </script>
  
  <svelte:head>
      <title>Referral Cases</title>
  </svelte:head>
  
  <div class="max-w-[80rem] mx-auto">
      {#await data.referrals}
      <div>
          <div class="mx-auto w-[20rem] text-xl text-center">Loading...</div>
          <Spinner class="mx-auto mt-4 w-[3rem]"/>
      </div>
      {:then referrals}
        <h2 class="text-xl">Refer-in</h2>
        <ReferralTable referrals={referrals.incoming} referralLink="/staff/referral"/>
        <h2 class="text-xl mt-4">Refer-out</h2>
        <ReferralTable referrals={referrals.outgoing} referralLink="/staff/referral"/>
      {:catch}
          <div class="mx-auto w-[20rem] text-xl text-center">Error: Could not load referral data</div>
      {/await}
  </div>
  