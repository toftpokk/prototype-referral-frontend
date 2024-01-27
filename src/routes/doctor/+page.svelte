<script lang="ts">
  import { Button } from "$lib/components/ui/button";
    import ReferralTable from '$lib/ReferralTable.svelte';
    import Spinner from '$lib/Spinner.svelte';
    // import ab from './Abraham100_Stracke611_990db43c-4604-a27c-4153-bfa9ef42a9e2.json'
    export let data;
    // Data
        //Patient > has ssn, but may be not used
        // Encounter > Yes?
        // Condition > Yes
        // MedicationRequest > No
        // Claim > Money is not related to referral, but maybe 30 baht system
        // CareTeam > team of caring, includes why cared, but not related to referral
        // CarePlan > health plan of taking care of patient, may not be related
        // DiagnosticReport > Jumble of things, may be useful?
        // DocumentReference > Reference to related documents, may be?
        // ExplanationOfBenefit > money
        // Procedure > YES
        // Observation > YES
        // Immunization > YES vaccines
        // Media > a bunch of base64 encoded images
        // ImagingStudy > Should be dicom data, but incomplete
        // Medication  > No
        // MedicationAdministration  > YES
        // Provenance > No?
</script>

<svelte:head>
    <title>Referral Cases</title>
</svelte:head>

<div class="max-w-[80rem] mx-auto">
    <div class="my-5">
        <Button href="/doctor/referral/new" variant="default">Create New Referral</Button>
    </div>
    {#await data.referrals}
    <div>
        <div class="mx-auto w-[20rem] text-xl text-center">Loading...</div>
        <Spinner class="mx-auto mt-4 w-[3rem]"/>
    </div>
    {:then r}
        <h2 class="text-xl">Refer-Out</h2>
        <ReferralTable isDoc={true} referrals={r.referrals.referrals} referralLink="/doctor/referral"/>
        <h2 class="text-xl">Refer-In</h2>
        <ReferralTable isDoc={true} referrals={r.doctorReferrals} referralLink="/doctor/referral"/>
    {:catch}
        <div class="mx-auto w-[20rem] text-xl text-center">Error: Could not load referral data</div>
    {/await}
</div>
