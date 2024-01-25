<script lang="ts">
    import ReferralStatusBadge from "./ReferralStatusBadge.svelte";
import { Badge } from "./components/ui/badge";
    import { translateName, type Referral, translateHospital } from "./global";
    export let referral : Referral 
    export let referralId : string 
</script>
<style>
    .key {
        @apply font-semibold text-right pr-2 h-8 text-lg;
    }
    .val {
        @apply pl-2 col-span-3 text-xl;
    }
</style>

<div class="grid grid-cols-4">
    <div class="col-span-1"></div>
    <div class="col-span-3 font-bold text-xl">Referral</div>
    <div class="key">ID</div>
    <div class="val">{referralId}</div>
    <div class="key">Status</div>
    <div class="val"><ReferralStatusBadge status={referral.ReferralStatus} class="text-sm"/></div>
    <div class="key">Origin</div>
    {#await translateHospital(referral.Origin)}
        <div class="val">...</div>
    {:then name}
        <div class="val">{name} ({referral.Origin})</div>
    {/await}
    <div class="key">Destination</div>
    {#await translateHospital(referral.Destination)}
        <div class="val">...</div>
    {:then name}
        <div class="val">{name} ({referral.Destination})</div>
    {/await}
    <div class="key">Reason</div>
    <div class="val">{referral.Reason}</div>
    <div class="key">Creation Date</div>
    <div class="val">{new Date(referral.Created*1000).toLocaleString('en-UK')}</div>
    <div class="col-span-1"></div>
    <div class="col-span-3 font-bold text-xl mt-4">Patient</div>
    <div class="key">Name</div>
    <div class="val">{translateName(referral)}</div>
    <!-- <div class="key">Citizen ID</div>
    <div class="val">{referral.CitizenId}</div> -->
    <div class="key">Gender</div>
    <div class="val">{referral.Gender}</div>
    <!-- <div class="key">Birth Date</div>
    <div class="val">{referral.BirthDate}</div> -->
    <!-- <div class="key">Address</div>
    <div class="val">{referral.Address}</div>
    <div class="key">Email</div>
    <div class="val">{referral.Email}</div>
    <div class="key">Telephone</div>
    <div class="val">{referral.Telephone}</div> -->
</div>