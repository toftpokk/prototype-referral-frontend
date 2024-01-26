import { PUBLIC_SERVER_FRONTEND_URL } from "$env/static/public";
import { fail, redirect, type ActionResult } from "@sveltejs/kit";

export const actions : import('./$types').Actions = {
    doctor: async ({request, cookies}) : Promise<{error: string|undefined}> => {
        // console.log(await request.formData())
        // return fail(400, {
        //     error: "Test Error"
        // })
        cookies.set("username","test",{path: '/',secure: false})
        // login as doctor
        cookies.set("role","doctor",{path: '/',secure: false})
        
        // Accepted
        throw redirect(303,"/doctor")
    },
    patient: async ({request, cookies}) => {
        const data = await request.formData()
        const username = data.get("username") as string
        const password = data.get("password") as string
        let response : Response
        try {
            response = await fetch(PUBLIC_SERVER_FRONTEND_URL+"/login",{
                method: "POST",
                body: JSON.stringify({
                    Username: username,
                    Password: password
                })
            })
        }catch(e){
            return fail(400, {
                error: "Could not connect to server"
            })
        }
        if(response.status != 200) {
            console.log(response)
            return fail(400, {
                error: "Wrong Username or Password"
            })
        }
        cookies.set("username",username,{path: '/',secure: false})
        // login as doctor
        cookies.set("role","patient",{path: '/',secure: false})
        
        // Accepted
        return redirect(303,"/patient")
    },
    staff: async ({request, cookies}) : Promise<{error: string|undefined}> => {
        // console.log(await request.formData())
        // return fail(400, {
        //     error: "Test Error"
        // })
        cookies.set("username","test",{path: '/',secure: false})
        // login as doctor
        cookies.set("role","staff",{path: '/',secure: false})
        console.log(cookies.get("role"))
        
        // Accepted
        redirect(303,"/staff")
    },
    admin: async ({request, cookies}) : Promise<{error: string|undefined}> => {
        // console.log(await request.formData())
        // return fail(400, {
        //     error: "Test Error"
        // })
        cookies.set("username","test",{path: '/',secure: false})
        // login as doctor
        cookies.set("role","admin",{path: '/',secure: false})
        
        // Accepted
        throw redirect(303,"/admin")
    },
    "": async()=>{
        return fail(400, {
            error: "Please select a role"
        })
    }
};