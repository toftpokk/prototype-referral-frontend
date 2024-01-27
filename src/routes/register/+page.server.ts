import { env } from "$env/dynamic/public";
import type { Referral } from "$lib/global"
import { error, fail } from "@sveltejs/kit";

export function load(){
    return {
        title: "Register User",
    } 
}

function checkPassword(str: string) {
    // Check if string has at least 8 characters
    if (str.length < 8) {
        return false;
    }
    
    // Check if string has at least 1 upper case letter
    if (!/[A-Z]/.test(str)) {
        return false;
    }
    
    // Check if string has at least 1 lower case letter
    if (!/[a-z]/.test(str)) {
        return false;
    }
    
    // If all conditions pass, return true
    return true;
}
    // async function onSubmit(e : SubmitEvent){
    //   e.preventDefault()
    //   if(!e.target){
    //     submitErrorTitle = "Fatal Error"
    //     submitError = "Unable to find data"
    //     return false
    //   }
    //   const target : any = e.target
    //   const formData = new FormData(target)
    //   // Validation
    //   

    //   
    //   
    //   


export const actions : import('./$types').Actions = {
    default: async ({request,cookies,params})=>{
        const errList : string[] = []
        const formData = await request.formData()
        // const username = formData.get("Username") as string
        if(formData.get("CitizenId")== ""){
            errList.push("CitizenId")
        }
        if(formData.get("Username")== ""){
            errList.push("Username")
        }
        if(formData.get("Password")== ""){
            errList.push("Password")
        }
        if(formData.get("password-check")== ""){
            errList.push("Re-type Password")
        }
        if(formData.get("Email")== ""){
            errList.push("Email")
        }
        if(errList.length > 0){
            return fail(500,{
                error:"Validation Error",
                message: "Required Fields: "+errList.join(", ")
            })
        }
        if(formData.get("Password") != formData.get("password-check")) {
            return fail(500,{
                error:"Validation Error",
                message: "Password and Re-type Password do not match"
            })
        }
        if(!checkPassword(formData.get("Password") as string)){
            return fail(500,{
                error:"Validation Error",
                message: "Password does not meet requirements"
            })
        }
        const formObject = JSON.stringify(Object.fromEntries(formData))
        const response = await fetch(env.PUBLIC_SERVER_FRONTEND_URL+"/register",{
            method: "POST",
            body: formObject
        })
        const responseBody = await response.json()
        if(response.status != 201){
            return fail(500,{
                error:"Submission Error",
                message: responseBody.message
            })
        }
        let ndidId = responseBody.id
        return { success: true, ndid: ndidId}
    }
}