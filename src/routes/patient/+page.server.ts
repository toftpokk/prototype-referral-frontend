import { PUBLIC_CLIENT_FRONTEND_URL, PUBLIC_SERVER_FRONTEND_URL } from "$env/static/public";
import type { Referral } from "$lib/global"

export function load({cookies}){
    const response = fetch(PUBLIC_SERVER_FRONTEND_URL+"/?username="+cookies.get("username"))
        .then(async (d: Response)=>{
            if(d.status != 200){
                throw await d.json()
            }
            return d.json()
        })
        .then((d:{"referrals":Referral[]})=>d["referrals"]
            .sort((a,b)=>{
                return a.Id > b.Id ? -1 : 1
            })
        )
        .catch((e)=>{
            console.log(e)
            return new Error("a")
        })
    return {
        title: "Referral Cases",
        referrals: response as Promise<Referral[]>,
    } 
}
