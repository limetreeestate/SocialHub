export class FilterProfile {

    //filter profile name
    private name: String;

    public static IMAGE: number = 0;
    public static TEXT: number = 1;
    public static VIDEO: number = 2;

    private postType: number;
    private isPersonalAccount: boolean;
    private isVerfied: boolean;

    constructor(name: String) {
        this.name = name;
    }

    public setTypeOfPost(type: number) {
        let status: boolean = type != FilterProfile.IMAGE || type != FilterProfile.TEXT || type != FilterProfile.VIDEO;
        if (status) {
            window.alert("Not a valid type");
        } else {
            this.postType = type;
        }
    }

    public getTypeOfPost(): number {
        return this.postType;
    }

    public setIfPersonalAccount(type: boolean) {
        this.isPersonalAccount = type;
    }

    public getIfPersonalAccount() {
        return this.isPersonalAccount;
    }

    public setIfVerified(type: boolean) {
        this.isVerfied = type;
    }

    public getIfVerified() {
        return this.isVerfied;
    }

}