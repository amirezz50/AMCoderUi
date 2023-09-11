
const serviceUrl = 'https://localhost:44381';
export class CONFIG {
    public static baseUrls = {
        // config: 'commands/config',
        localhost: `${serviceUrl}`,
        Users: `${serviceUrl}/Users`,
        login: `${serviceUrl}`,
        uploadSheet: `${serviceUrl}/api/UploadSheet`,
        MedicalSheet:`${serviceUrl}/api/MedicalSheet`

    }
}
