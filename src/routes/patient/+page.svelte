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
    {#if data.error}
        <p class="text-xl">{data.error}</p>
    {:else}
        <Table header={[
            {key:"Origin",name:"Origin Hospital"},
            {key:"Destination",name:"Destination Hospital"},
            {key:"CreationDate",name:"Referral Created", type: "date"},
            {key:"ReferralStatus",name:"Status", type:"status"},
            {key:"action",name:"Actions",type:"action",url:"/patient/referral/"},
        ]} data={referrals}/>
    {/if}
</div>