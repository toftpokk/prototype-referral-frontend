export const actions : import('./$types').Actions = {
    default: async ({request})  => {
        console.log(await request.formData())
//         // console.log(await request.formData())
//         // return fail(400, {
//         //     error: "Test Error"
//         // })
//         cookies.set("username","test",{path: '/'})
//         // login as doctor
//         cookies.set("role","doctor",{path: '/'})
        
//         // Accepted
//         throw redirect(303,"/doctor")
    }
};