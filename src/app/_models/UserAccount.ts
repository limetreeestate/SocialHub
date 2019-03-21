export class UserAccount {

    //access token for user's social media account
    private accessToken: String;

    constructor (accessToken){
        this.accessToken = accessToken;
    }

    getToken() :String {
        return this.accessToken;
    }
}