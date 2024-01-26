import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public";

export enum ReferralStatus {
    Created = "Created",
    Consented = "Consented",
    Complete = "Complete",
    Granted = "Granted",
    UploadIncomplete = "UploadIncomplete",
    UploadComplete = "UploadComplete",
    NotGranted = "NotGranted",
}

export type Hospital = {
    Id: number;
    HospitalName: string
    HospitalId: string
}

export enum GrantStatus {
    Accepted = "Accepted",
    Declined = "Declined"
}

export enum ConsentStatus {
    AwaitingConsent = "AwaitingConsent",
    Accepted = "Accepted",
    Declined = "Declined"
}

export enum Department {
    Anesthesiology = "Anesthesiology",
    Cardiology = "Cardiology",
    Gynaecology = "Gynaecology",
    Pediatrics = "Pediatrics",
    Neurology = "Neurology",
    Oncology = "Oncology",
    Orthopaedic = "Orthopaedic",
    Otolaryngology = "Otolaryngology",
    Urology = "Urology",
    Psychiatry = "Psychiatry",
    Radiology = "Radiology",
}

export type referralMeta = {
    Origin: string; // Id of origin
    Destination: string; // Id of dest

    Department: Department;
    Reason: string;
    CitizenId: string;
    Prefix: string;
    FirstName: string;
    LastName: string;
    BirthDate: string;
    Address: string;
    Gender: string;
    Telephone: string;
    Email: string;
}

export type Referral = referralMeta & {
    //// Server->Dest ////
    Id: number; // not autogen
    Created: number;

    //// Not sent ////
    DoctorId: string;
    IsOutgoing: boolean; // true for origin, else false
    ReferralStatus: ReferralStatus;
}

export type PatientData = {
    Hn: string;
    CitizenId: string;
    Prefix: string;
    FirstName: string;
    LastName: string;
    Address: string;
    BirthDate: string;
    Gender: string;
    Email: string;
    Telephone: string;
}

export type Consent = {
    Id: number; // server generated
    Referral: number;
    Message: string;
    ConsentStatus: ConsentStatus;
}

export type HospitalData = {
    HospitalId: string;
    HospitalName: string;
}
export const setFormElement = (name: string, value: any)=>{
    const element = document.getElementsByName(name)[0] as HTMLInputElement
    element.value = value
}

export function translateReferralStatus(status: ReferralStatus){
    switch(status){
        case ReferralStatus.Created:
            return "Awaiting Patient Consent"
        case ReferralStatus.Consented:
            return "Awaiting Permission to Refer"
        case ReferralStatus.Complete:
            return "Referral Complete"
        case ReferralStatus.UploadIncomplete:
            return "Uploading"
        case ReferralStatus.Granted:
            return "Preparing Data"
        case ReferralStatus.UploadComplete:
            return "Upload Complete"
        case ReferralStatus.NotGranted:
            return "Destination Denied Referral"
        default:
            return status
    }
}

function getPrefix(p: string){
    if(p == "mr"){
        return "Mr."
    }
    else if(p == "mrs"){
        return "Mrs."
    }
    else if(p == "ms"){
        return "Ms."
    }
}

export function translateName(obj : {Prefix: string, FirstName: string, LastName : string}){
    const pfx = getPrefix(obj.Prefix)
    return `${pfx} ${obj.FirstName} ${obj.LastName}`
}

let hospitalCache : HospitalData[] = []

export async function translateHospital(hcode: string) : Promise<string>{
    // Check if in cache
    let filtered = hospitalCache.filter((d)=>d.HospitalId == hcode)
    if(filtered.length > 0){
        return filtered[0].HospitalName
    }
    // Not -> fetch
    let response
    try{
        response = await fetch(PUBLIC_CLIENT_FRONTEND_URL + "/hospitals")
        .then(async (d: Response)=>{
            if(d.status != 200){
                throw await d.json()
            }
            return d.json()
        })
    } catch(e){
        return "Unknown Hospital"
    }
    hospitalCache = response
    // Check in cache
    filtered = hospitalCache.filter((d)=>d.HospitalId == hcode)
    if(filtered.length > 0){
        return filtered[0].HospitalName
    }
    return "Unknown Hospital"
}

export function translateFileState(status : ReferralStatus){
    switch(status){
        case ReferralStatus.Created:
            return "Waiting"
        case ReferralStatus.Consented:
            return "Waiting"
        case ReferralStatus.Complete:
            return "Complete"
        case ReferralStatus.UploadIncomplete:
            return "Uploading"
        case ReferralStatus.Granted:
            return "Waiting"
        case ReferralStatus.UploadComplete:
            return "Complete"
        case ReferralStatus.NotGranted:
            return "Stopped"
        default:
            return status
    }
}