import { env } from "$env/dynamic/public"
import { ReferralStatus, type Referral } from "$lib/global"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
    const referralId = params.referralId
    const response : Referral = await fetch(env.PUBLIC_CLIENT_FRONTEND_URL + "/referral/" + referralId)
        .then(async (d: Response) => {
            if (d.status != 200) {
                throw await d.json()
            }
            return d.json()
        })
        .catch((e) => {
            console.log(e)
            return new Error("a")
        })
    let files : string[] = []
    if(response.Origin == env.PUBLIC_HOSPITAL_ID){
        files = await fetch(env.PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+referralId+"/outfile")
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
    } else{
        if(response.ReferralStatus == ReferralStatus.Complete){
            files = await fetch(env.PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+referralId+"/file")
                .then(async(d: Response)=>{
                    if (d.status != 200) {
                        console.log("e")
                        throw await d.json()
                    }
                    return d.json()
                })
                .catch((e) => {
                    console.log(e)
                    return []
                })
            console.log(files)
        }
    }
    return {
        referral: response,
        title: "Referral " + referralId,
        referralId: referralId,
        referralFiles: files
    }
}