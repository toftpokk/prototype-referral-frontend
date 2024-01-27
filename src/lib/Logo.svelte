<script>

    import { env } from "$env/dynamic/public";

</script>
<div class="flex">
    <div class="flex flex-col ml-1">
        <span class="font-black text-xl leading-5">Referral System</span>
        {#if env.PUBLIC_ROLE == "Client"}
            <span class="">{env.PUBLIC_HOSPITAL_NAME} (ID: {env.PUBLIC_HOSPITAL_ID})</span>
        {:else}
        <span class="">Server</span>
        {/if}
    </div>
</div>