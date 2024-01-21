export enum ReferralStatus {
    Created = "Created",
    Consented = "Consented",
    Complete = "Complete",
    Granted = "Granted",
    UploadIncomplete = "UploadIncomplete",
    UploadComplete = "UploadComplete",
    NotGranted = "NotGranted",
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
    Firstname: string;
    Lastname: string;
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
            return "Awaiting Destination Hospital"
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

export function translateName(prefix: string, firstName: string, lastName : string){
    const pfx = getPrefix(prefix)
    return `${pfx} ${firstName} ${lastName}`
}