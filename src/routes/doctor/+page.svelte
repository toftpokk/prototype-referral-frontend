<script lang="ts">
    import Table from "$lib/Table.svelte";
    import type { Referral } from "$lib/global"
    export let data;
    let referrals = data.referrals as Referral[]
    referrals = referrals.map(r=>{
        return {...r, action: "View"}
    })
</script>
<svelte:head>
    <title>Referral Cases</title>
</svelte:head>
<div>
    <!-- <p>{JSON.stringify(referrals)}</p> -->
    <a class="btn hover:text-white no-underline m-4" href="/doctor/referral/new">Create New Case</a>
    {#if data.error}
        <p class="text-xl">{data.error}</p>
    {:else}
        <Table header={[
            {key:"Id",name:"ID"},
            {key:"CitizenId",name:"Patient"},
            {key:"Destination",name:"Destination Hospital"},
            {key:"Created",name:"Referral Completion", type: "date"},
            {key:"ReferralStatus",name:"Status", type:"status"},
            {key:"action",name:"Actions",type:"action",url: "/doctor/referral/"},
        ]} data={referrals}/>
    {/if}
</div>