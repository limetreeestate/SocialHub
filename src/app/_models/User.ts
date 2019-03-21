import { UserAccount } from './UserAccount';
import { FilterProfile } from './FilterProfile';

export class User {

    private name: String;
    private email: String;

    //User's registered social media accounts
    private accounts: UserAccount[];

    //User's saved filter profiles
    private filterProfiles: FilterProfile[];

    constructor (name:String, email:String){

        this.name = name;
        this.email = email;
        this.accounts = [];
        this.filterProfiles = [];

    }

    getName(){
        return this.name;
    }
    
    getEmail(){
        return this.email;
    }
    
    getUserAccounts(){
        return this.accounts;
    }
    
    getFilterProfiles(){
        return this.filterProfiles;
    }
    
    public addAccount(accessToken: String){
        this.accounts.push(new UserAccount(accessToken));
    }
    
    public addFilterProfile(profile: FilterProfile){
        this.filterProfiles.push(profile);
    }
    
}