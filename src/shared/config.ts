
const serviceUrl = 'http://jointclinc-001-site8.itempurl.com';
export class CONFIG {
    public static baseUrls = {
        // config: 'commands/config',
        localhost: `${serviceUrl}`,
        Users: `${serviceUrl}/Users`,
        login: `${serviceUrl}/api/Auth`,
        uploadSheet: `${serviceUrl}/api/UploadSheet`,
        MedicalSheet:`${serviceUrl}/api/MedicalSheet`,
        Dashboard:`${serviceUrl}/api/Dashboard`,
        Doctors:`${serviceUrl}/api/Doctors`,
        Schedule:`${serviceUrl}/api/schedule`,


    }
}
