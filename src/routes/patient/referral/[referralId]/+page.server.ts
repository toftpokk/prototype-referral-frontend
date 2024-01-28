import { env } from "$env/dynamic/public"
import type { HospitalData, Referral } from "$lib/global"
import { fail } from "@sveltejs/kit"
import { translateHospitalServer } from '$lib/server/helper';
import type { PageServerLoad } from "./$types"

export const load : PageServerLoad = ({ params }) => {
    const referralId = params.referralId
    const response = fetch(env.PUBLIC_SERVER_FRONTEND_URL+"/referral/"+referralId)
        .then(async (d: Response)=>{
            if(d.status != 200){
                throw await d.json()
            }
            return d.json()
        })
        .catch((e)=>{
            return new Error("a")
        })
    let response2
        response2 = fetch(env.PUBLIC_SERVER_FRONTEND_URL + "/hospitals")
        .then(async (d: Response)=>{
            if(d.status != 200){
                throw await d.json()
            }
            return d.json()
        })
        .catch((e)=>{
            return new Error("a")
        })
    const hospitalCache = response2
    return {
        title: "Referral "+referralId,
        referralId: referralId,
        referral: response as Promise<Referral>,
        hospitalCache: hospitalCache as Promise<HospitalData[]>
    } 
}

export const actions : import('./$types').Actions = {
    default: async ({request,cookies,params})=>{
        const data = await request.formData()
        if(data.get("agree") != "true"){
            return fail(400, {
                error: "Please tick to agree to the terms and conditions"
            })
        }
        let response : Response
        try{
            response = await fetch(env.PUBLIC_SERVER_FRONTEND_URL+"/referral/"+params.referralId+"/consent?username="+cookies.get("username"),{
                method: "POST"
            })
        } catch(e){
            return fail(500,{error:"Could not submit data"})
        }
        if(response.status != 200){
            const resJson = await response.json()
            return fail(500,{error:resJson.message})
        }
        return
    }
}