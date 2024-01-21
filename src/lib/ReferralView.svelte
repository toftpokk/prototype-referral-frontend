<script lang="ts">
    import { translateName, type Referral, translateReferralStatus } from "./global";
    export let referral : Referral
</script>

<h2 class="text-xl font-bold">Referral</h2>
<p>referralId: {referral.Id}</p>
<p>{translateReferralStatus(referral.ReferralStatus)}</p>
<p>Destination: {referral.Destination}</p>
<p>Creation Date: {new Date(referral.Created).toLocaleString('en-UK')}</p>
<h2 class="text-xl font-bold">Patient</h2>
<p>CitizenId: {referral.CitizenId}</p>
<p>Gender: {referral.Gender}</p>
<p>Name: {translateName(referral.Prefix, referral.FirstName, referral.LastName)}</p>
<p>BirthDate: {referral.BirthDate}</p>
<p>Address: {referral.Address}</p>
<p>Telephone: {referral.Telephone}</p>