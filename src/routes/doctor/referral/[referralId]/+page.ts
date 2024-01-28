import { env } from "$env/dynamic/public"
import type { Referral } from "$lib/global"
import type { PageLoad } from "./$types"

export const load : PageLoad = async ({ params }) => {
    const referralId = params.referralId
    let isAssigned : boolean = false
    const response = fetch(env.PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+referralId)
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
    isAssigned = await fetch(env.PUBLIC_CLIENT_FRONTEND_URL+"/assign/"+referralId)
    .then(async(d: Response)=>{
        if (d.status != 200) {
            return false
        }
        return true
    })
    .catch((e) => {
        throw new Error(e)
    })
    let referralDatafile = {Summary:[],Diagnosis:"",History:""}
    if(isAssigned){
        try{
            referralDatafile = await fetch(env.PUBLIC_CLIENT_FRONTEND_URL+"/assign/"+referralId+"/data")
            .then(async(d: Response)=>{
                if (d.status != 200) {
                    throw d.status
                }
                return await d.json()
            })
        } catch(e){
            console.log("aaa", e)
            referralDatafile = {Summary:[],Diagnosis:"",History:""}
        }
        // Get result dir
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
                return new Error("a")
            })
    }
    else{
        // Get origin dir
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
    }
    return {
        title: "Referral "+referralId,
        referralId: referralId,
        referral: response as Promise<Referral>,
        referralFiles: files,
        isAssigned: isAssigned,
        referralDatafile: referralDatafile
    } 
}