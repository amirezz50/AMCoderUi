
// const serviceUrl = 'http://jointclinc-001-site8.itempurl.com';
const serviceUrl = 'https://localhost:44381';
export class CONFIG {
  public static baseUrls = {
    // config: 'commands/config',
    localhost: `${serviceUrl}`,
    Users: `${serviceUrl}/api/Users`,
    login: `${serviceUrl}/api/Auth`,
    uploadSheet: `${serviceUrl}/api/UploadSheet`,
    MedicalSheet: `${serviceUrl}/api/MedicalSheet`,
    Dashboard: `${serviceUrl}/api/Dashboard`,
    Doctors: `${serviceUrl}/api/Doctors`,
    Schedule: `${serviceUrl}/api/schedule`,
    MemberShip: `${serviceUrl}/api/Membership`,
    OperationManage: `${serviceUrl}/api/OperationManage`,
    Review: `${serviceUrl}/api/Review`,


  }
}
