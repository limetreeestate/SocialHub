import { FormControl } from '@angular/forms';

interface Params {
    [key: string]: any
}

export class FilterProfile {

    //filter profile name
    public facebook: Params
    public twitter: Params
    public youtube: Params

    constructor() {
        let fromDate = new FormControl(new Date('1/1/2000')).value;
        let toDate = new FormControl(new Date()).value;
        this.twitter = {
            'show': false,
            'is:verified': false,
            'has:videos': true,
            'has:images': true,
            'toDate': toDate,
            'fromDate': "",
            'from:': "",
            'to:': "",
            'lang:': 'en'
        }
        this.facebook = {
            'show': false
        }
        //initialize and assign default values
        this.youtube = {
            'show': false,
            'safeSearch': 'none',
            'publishedAfter': fromDate,
            'publishedBefore': toDate,
            'videoDuration': "any",
            'videoDimension': "any",
            'channel': "",
            'order': 'relevance'
        }
    }
}