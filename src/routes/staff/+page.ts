import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public";
import type { Referral } from "$lib/global"
import { error } from "@sveltejs/kit";

export function load() {
    const response = fetch(PUBLIC_CLIENT_FRONTEND_URL + "/staff")
        .then(async (d: Response) => {
            if (d.status != 200) {
                throw await d.json()
            }
            return d.json()
        })
        .then((d: { incoming: { "referrals": Referral[] }, outgoing: { "referrals": Referral[] } }) => {
            return {
                incoming: d.incoming.referrals.sort((a, b) => {
                    return a.Id > b.Id ? -1 : 1
                }),
                outgoing: d.outgoing.referrals.sort((a, b) => {
                    return a.Id > b.Id ? -1 : 1
                })
            }
        }
        )
        .catch((e) => {
            console.log(e)
            return new Error("a")
        })
    return {
        title: "Referral Cases",
        referrals: response as Promise<{ incoming: Referral[], outgoing: Referral[] }>,
    }
}
