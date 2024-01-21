import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public"
import type { Referral } from "$lib/global"
import type { PageServerLoad } from "./$types"

export const load : PageServerLoad = ({ params }) => {
    const referralId = params.referralId
    const response = fetch(PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+referralId)
        .then(d=>d.json())
        .catch((e)=>{
            console.log(e)
            return new Error("a")
        })
    return {
        referral: response as Promise<Referral>,
        title: "Referral Cases",
        referralId: referralId,
    } 
}