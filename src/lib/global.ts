export enum ReferralStatus {
    PreparingData = "PreparingData",
    Created = "Created",
    AwaitingConsent = "AwaitingConsent",
    ConsentGiven = "ConsentGiven",
    AwaitingConfirmation = "AwaitingConfirmation",
    TransferringData = "TransferringData",
    AwaitingCompletion = "AwaitingCompletion",
    Complete = "Complete",
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
    CreationDate: number;

    //// Not sent ////
    DoctorId: string;
    IsOutgoing: boolean; // true for origin, else false
    ReferralStatus: ReferralStatus;
}

export type PatientData = {
    hn: string;
    citizenId: string;
    prefix: string;
    firstname: string;
    lastname: string;
    address: string;
    birthDate: string;
    gender: string;
    email: string;
    telephone: string;
}

export type Consent = {
    Id: number; // server generated
    Referral: number;
    Message: string;
    ConsentStatus: ConsentStatus;
}

export type HospitalData = {
    hcode: string;
    hname: string;
}

export const getPatientName = (p : PatientData)=>{
    return `${p.prefix}. ${p.firstname} ${p.lastname}`
}

export const setFormElement = (name: string, value: any)=>{
    const element = document.getElementsByName(name)[0] as HTMLInputElement
    element.value = value
}