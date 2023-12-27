
// const serviceUrl = 'http://femtovision-001-site2.ctempurl.com';
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
    Email: `${serviceUrl}/api/Email`,
    Booking: `${serviceUrl}/api/Booking`,
    Selectize: `${serviceUrl}/api/Selectize`,
    FinancialUrl: `${serviceUrl}/api/Financial`,



  }
}
