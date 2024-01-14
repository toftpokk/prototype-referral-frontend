<script lang="ts">
    export let data : import('./$types').PageData;
    function getPrefix(p: string){
        if(p == "mr"){
            return "Mr."
        }
        else if(p == "mrs"){
            return "Mrs."
        }
        else if(p == "ms"){
            return "Ms."
        }
    }
</script>
<div>
    <h2 class="text-xl font-bold">Referral</h2>
    <p>{data.referral.IsOutgoing?"This is an outgoing referral":"This is an incoming referral"}</p>
    <p>referralId: {data.referralId}</p>
    <p>Destination: {data.referral.Destination}</p>
    <p>Creation Date: {new Date(data.referral.CreationDate *1000).toLocaleString('en-UK')}</p>
    <h2 class="text-xl font-bold">Patient</h2>
    <p>CitizenId: {data.referral.CitizenId}</p>
    <p>Gender: {data.referral.Gender}</p>
    <p>Name: {getPrefix(data.referral.Prefix)} {data.referral.FirstName} {data.referral.LastName}</p>
    <p>BirthDate: {data.referral.BirthDate}</p>
    <p>Address: {data.referral.Address}</p>
</div>