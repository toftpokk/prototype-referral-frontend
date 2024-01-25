import { fail, redirect } from "@sveltejs/kit";

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
    patient: async ({request, cookies}) : Promise<{error: string|undefined}> => {
        // console.log(await request.formData())
        // return fail(400, {
        //     error: "Test Error"
        // })
        cookies.set("username","test",{path: '/',secure: false})
        // login as doctor
        cookies.set("role","patient",{path: '/',secure: false})
        
        // Accepted
        throw redirect(303,"/patient")
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
            error: "Test Error"
        })
    }
};