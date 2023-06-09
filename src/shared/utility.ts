import { HttpHeaders } from "@angular/common/http";

export function getAuthorizationHeader() {
    // let currentUser: any = <any>{};
    // currentUser = sessionStorage.getItem('UserData') ? sessionStorage.getItem('UserData') : "{}"
    // let header = {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Basic ' + btoaUser(JSON.parse(currentUser))
    // };
    const header = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set("Authorization", "Bearer " + sessionStorage.getItem('token'))
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // 'Authorization': 'Basic ' + btoaUser(JSON.parse(currentUser))

    return header;
}
export function createAuthorizationHeader() {
    let currentUser: any = <any>{};
    currentUser = sessionStorage.getItem('UserModel') ? sessionStorage.getItem('UserModel') : "{}"
    const headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('accept', 'application/json')
        .set('Access-Control-Allow-Origin', 'http://localhost:4200')
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        .set('Access-Control-Allow-Headers', 'Content-Type, Authorization')



    // let header: HttpHeaders().set(
    //     'Content-Type': 'application/json',
    //     'accept': 'application/json'
    //     // 'Authorization': 'Basic ' + btoaUser(JSON.parse(currentUser))
    // };
    return headers;
}
function btoaUser(userData: any) {
    return btoa(userData.userName + ":" + userData.password)
}

// headerAuthorization() {
//     let currentUser: any = <any>{};
//     currentUser = sessionStorage.getItem('UserData') ? sessionStorage.getItem('UserData') : "{}"

//     const headers = new HttpHeaders()
//         .set('content-type', 'application/json')
//         .set('accept', 'application/json');
//     if (currentUser) {
//         headers.set('Authorization', 'Baerer ' + currentUser.token);
//     }
//     return headers;
// }