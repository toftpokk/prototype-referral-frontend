import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public"
import type { Referral } from "$lib/global"

export const load = async ({ params }) => {
    const referralId = params.referralId
    let response : Response
    try {
        // TODO
        response = await fetch(PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+referralId)
        if(!response.ok){
            console.log(await response.text())
            throw new Error("Could not fetch from referral system client: "+response.statusText);
        }
    } catch (error) {
        return {
            title: "Referral Cases",
            referral: {},
            error: String(error),
            referralId: referralId,
        }
    }
    let fetchData : {"referral":Referral} = await response.json()
    return {
        referral: fetchData,
        title: "Referral Cases",
        referralId: referralId,
    } 
}