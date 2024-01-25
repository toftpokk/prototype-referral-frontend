import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public"
import type { Referral } from "$lib/global"
import type { PageLoad } from "./$types"

export const load : PageLoad = async ({ params }) => {
    const referralId = params.referralId
    const response = fetch(PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+referralId)
        .then(async (d: Response)=>{
            if(d.status != 200){
                throw await d.json()
            }
            return d.json()
        })
        .catch((e)=>{
            return new Error("a")
        })
        let files : string[] = []
    // if(response.ReferralStatus == ReferralStatus.Complete){
        files = await fetch(PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+referralId+"/outfile")
            .then(async(d: Response)=>{
                if (d.status != 200) {
                    console.log("e")
                    throw await d.json()
                }
                return d.json()
            })
            .catch((e) => {
                console.log(e)
                return new Error("a")
            })
    // }
    return {
        title: "Referral "+referralId,
        referralId: referralId,
        referral: response as Promise<Referral>,
        referralFiles: files
    } 
}