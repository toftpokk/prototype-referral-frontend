import { PUBLIC_CLIENT_FRONTEND_URL, PUBLIC_SERVER_FRONTEND_URL } from "$env/static/public";
import type { Referral } from "$lib/global"
import { error } from "@sveltejs/kit";

export function load(){
    return {
        title: "Register User",
    } 
}