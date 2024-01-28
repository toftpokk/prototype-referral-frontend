<script lang="ts">
    import * as Table from "./components/ui/table";
    import ReferralStatusBadge from "./ReferralStatusBadge.svelte";
import { Badge } from "./components/ui/badge";
    import * as Card from "./components/ui/card";
    import { translateName, type Referral } from "./global";
    export let translateHospital : (hcode: string)=>Promise<string>
    export let referral : Referral 
    export let referralId : string 
    export let isDoc : boolean = false
</script>
<style>
    .key {
        @apply text-muted-foreground pr-2 h-6 text-base mt-4;
    }
    .val {
        @apply col-span-3 text-lg;
    }
</style>

<Card.Root class="my-2">
    <Card.Header class="pb-0">
      <Card.Title>Referral</Card.Title>
    </Card.Header>
    <Card.Content>
        <p class="key">ID</p>
        <p class="val">{referralId}</p>
        <p class="key">Status</p>
        <p class="key"><ReferralStatusBadge status={referral.ReferralStatus} class="text-sm"/></p>
        <p class="key">Origin</p>
        <p class="val">
            {#await translateHospital(referral.Origin)}
                <div>...</div>
            {:then name}
                <div>{name} ({referral.Origin})</div>
            {:catch e}
            <div>{e}</div>
            {/await}
        </p>
        <p class="key">Destination</p>
        <p class="val">
            {#await translateHospital(referral.Destination)}
                <div>...</div>
            {:then name}
                <div>{name} ({referral.Destination})</div>
            {/await}
        </p>
        <p class="key">Reason</p>
        <p class="val">{referral.Reason}</p>
        <p class="key">Department</p>
        <p class="val">{referral.Department}</p>
        <div class="key">Creation Date</div>
    <div class="val">{new Date(referral.Created*1000).toLocaleString('en-UK')}</div>
    </Card.Content>
  </Card.Root>

  <Card.Root class="my-2">
    <Card.Header class="pb-0">
      <Card.Title>Patient</Card.Title>
    </Card.Header>
    <Card.Content>
        <div class="key">Gender</div>
        <div class="val">{referral.Gender}</div>
        <div class="key">Age</div>
        <div class="val">{new Date().getFullYear() -  Number(referral.BirthDate.slice(0,4))}</div>
        {#if isDoc}
        <div class="key">Name</div>
        <div class="val">{translateName(referral)}</div>   
        <div class="key">Contact Email</div>
        <div class="val">{referral.Email}</div>
        <div class="key">Contact Telephone</div>
        <div class="val">{referral.Telephone}</div>  
        {/if}
    </Card.Content>
  </Card.Root>