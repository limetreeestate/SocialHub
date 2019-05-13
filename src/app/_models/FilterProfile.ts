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
            'safe': true,
            'verified': false,
            'native_video': true,
            'images': true,
            'reaction': ':)',
            'until': toDate,
            'result_type': 'popular'
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
            'order': 'relevance'
        }
    }
}