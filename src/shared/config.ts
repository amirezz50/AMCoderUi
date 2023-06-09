
const serviceUrl = 'https://localhost:44324';
export class CONFIG {
    public static baseUrls = {
        // config: 'commands/config',
        localhost: `${serviceUrl}`,
        Users: `${serviceUrl}/Users`,
        login: `${serviceUrl}/api/Authentication`,
        uploadSheet: `${serviceUrl}/api/UploadSheet`,

    }
}