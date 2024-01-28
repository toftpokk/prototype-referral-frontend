<script lang="ts">
    import { Button } from "$lib/components/ui/button";
      import ReferralTable from '$lib/ReferralTable.svelte';
      import Spinner from '$lib/Spinner.svelte';
      export let data;
      async function translateHospitalServer(hcode: string){
        const filtered = (await data.hospitalCache).filter((d)=>d.HospitalId == hcode)
        if(filtered.length > 0){
            return filtered[0].HospitalName
        }
        else{
            return "Unknown"
        }
    }
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
          <ReferralTable referrals={referrals} referralLink="/patient/referral" translateHospital={translateHospitalServer}/>
      {:catch}
          <div class="mx-auto w-[20rem] text-xl text-center">Error: Could not load referral data</div>
      {/await}
  </div>
  