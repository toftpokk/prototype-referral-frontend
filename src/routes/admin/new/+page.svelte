<script lang="ts">
    import Spinner from "$lib/Spinner.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Label } from "$lib/components/ui/label";
    import * as Alert from "$lib/components/ui/alert";
    import { Input } from "$lib/components/ui/input";
    import { env } from "$env/dynamic/public";

    let submitStatus = "";
    let submitError = "";
    function onSubmit(e: SubmitEvent) {
        const errList: string[] = [];
        e.preventDefault();
        if (!e.target) {
            submitError = "Unable to find data";
            return false;
        }
        const target: any = e.target;
        const formData = new FormData(target);

        const name = formData.get("HospitalName") as string;
        if (name == "") {
            errList.push("HospitalName");
        }
        const hospitalId = formData.get("HospitalId") as string;
        if (hospitalId == "") {
            errList.push("HospitalId");
        }

        if(errList.length > 0){
            // submitErrorTitle = "Validation Error"
            submitError = "Required Fields: "+errList.join(", ")
            return false
        }
        let formObject = JSON.stringify(Object.fromEntries(formData));
        fetch(env.PUBLIC_SERVER_FRONTEND_URL+"/hospital",{
            method: "POST",
            body: formObject
        })
        .then(async (d: Response)=>{
            if(d.status != 201){
            throw await d.json()
            }
            return d.json()
        })
        // .then((d:{id: number})=>{
        //     submitStatus = "complete"
        //     referralId = d.id
        // }).catch((e : any)=>{
        //     submitStatus = "error"
        //     submitErrorTitle = "Submission Error"
        //     submitError = e.message
        // })
        return false;
    }
</script>

{#if submitStatus == "submitting"}
    <div class="mx-auto w-[20rem] text-xl text-center">Submitting...</div>
    <Spinner class="mx-auto mt-4 w-[3rem]" />
{:else if submitStatus == "complete"}
    <div class="mx-auto w-[20rem] text-xl text-center">Submission Complete</div>
    <!-- <div class="mx-auto w-[20rem] text-2xl mt-8 text-center">Referral ID: {referralId}</div> -->
    <div class="mx-auto text-center">
        <!-- <Button href={"/admin/referral/"}>View Referral</Button> -->
        <Button variant="outline" class="inline-block mt-8" href="/admin"
            >Return to List</Button
        >
    </div>
{:else}
    <form class="mx-auto max-w-[40rem]" on:submit={onSubmit}>
        <Label class="font-semibold text-[11pt] block mb-1"
            >Hospital Name<span class="text-red-500">*</span></Label
        >
        <Input name="HospitalName" value="" placeholder="" />
        <Label class="font-semibold text-[11pt] block mb-1 mt-4"
            >Hospital Code<span class="text-red-500">*</span></Label
        >
        <Input name="HospitalId" value="" placeholder="" />

        {#if submitError != ""}
            <Alert.Root class="my-4" variant="destructive">
                <Alert.Title>Submission Error</Alert.Title>
                <Alert.Description>
                    {submitError}
                </Alert.Description>
            </Alert.Root>
        {/if}
        <Button type="submit" class="block w-full mt-5">Create Hospital</Button>
    </form>
{/if}
