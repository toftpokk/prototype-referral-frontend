import { env } from "$env/dynamic/public";
import type { Referral } from "$lib/global"
import { error } from "@sveltejs/kit";

export async function load(){
    let referrals : Promise<{referrals:{referrals:[]}, doctorReferrals:[]}>
    try{ 
        referrals = fetch(env.PUBLIC_CLIENT_FRONTEND_URL+"/doctor")
        .then(async (d: Response)=>{
            if(d.status != 200){
                throw await d.json()
            }
            return d.json()
        })
        .then((d)=>{
            return {
                referrals: {
                    referrals: d.referrals.referrals.sort((a : Referral,b : Referral)=>
                        a.Id > b.Id ? -1 : 1
                    )
                },
                doctorReferrals: d.doctorReferrals.sort((a : Referral,b : Referral)=>
                    a.Id > b.Id ? -1 : 1
                )
            }
        })
    } catch(e){
        throw new Error("a")
    }
    return {
        title: "Referral Cases",
        referrals: referrals
    } 
}
