<script lang="ts">
    import Table from "$lib/Table.svelte";
    export let data;
    let referrals = data.referrals
    referrals = referrals.map(r=>{
        return {...r, action: "View"}
    })
</script>
<svelte:head>
    <title>Referral Cases</title>
</svelte:head>
<div>
    <!-- <a class="btn hover:text-white no-underline m-4" href="/doctor/referral/new">Create New Case</a> -->
    {#if data.error}
        <p class="text-xl">{data.error}</p>
    {:else}
        <Table header={[
            {key:"CitizenId",name:"Patient"},
            {key:"Destination",name:"Destination Hospital"},
            {key:"CreationDate",name:"Referral Completion", type: "date"},
            {key:"ReferralStatus",name:"Status", type:"status"},
            {key:"action",name:"Actions",type:"action",url: "/staff/referral/"},
        ]} data={referrals}/>
    {/if}
</div>