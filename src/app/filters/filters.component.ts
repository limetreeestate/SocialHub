import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { AuthService } from '../_services/authentication.service';
import { FilterProfile } from '../_models/FilterProfile';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {

  private profileMap: any
  private filterProfile: FilterProfile
  private show = []
  languages = {
    'Amharic': 'am',
    'Arabic': 'ar',
    'Armenian': 'hy',
    'Bengali': 'bn',
    'Bulgarian': 'bg',
    'Burmese': 'my',
    'Chinese': 'zh',
    'Czech': 'cs',
    'Danish': 'da',
    'Dutch': 'nl',
    'Estonian': 'et',
    'English': 'en',
    'Finnish': 'fi',
    'French': 'fr',
    'Georgian': 'ka',
    'German': 'de',
    'Greek': 'el',
    'Gujarati': 'gu',
    'Haitian': 'ht',
    'Hebrew': 'iw',
    'Hindi': 'hi',
    'Hungarian': 'hu',
    'Icelandic': 'is',
    'Indonesian': 'in',
    'Italian': 'it',
    'Japanese': 'ja',
    'Kannada': 'kn',
    'Khmer': 'km',
    'Korean': 'ko',
    'Lao': 'lo',
    'Latvian': 'lv',
    'Lithuanian': 'lt',
    'Malayalam': 'ml',
    'Maldivian': 'dv',
    'Marathi': 'mr',
    'Nepali': 'ne',
    'Norwegian': 'no',
    'Oriya': 'or',
    'Panjabi': 'pa',
    'Pashto': 'ps',
    'Persian': 'fa',
    'Polish': 'pl',
    'Portuguese': 'pt',
    'Romanian': 'ro',
    'Russian': 'ru',
    'Serbian': 'sr',
    'Sindhi': 'sd',
    'Sinhala': 'si',
    'Slovak': 'sk',
    'Slovenian': 'sl',
    'Sorani Kurdish': 'ckb',
    'Spanish': 'es',
    'Swedish': 'sv',
    'Tagalog': 'tl',
    'Tamil': 'ta',
    'Telugu': 'te',
    'Thai': 'th',
    'Tibetan': 'bo',
    'Turkish': 'tr',
    'Ukrainian': 'uk',
    'Urdu': 'ur',
    'Uyghur': 'ug',
    'Vietnamese': 'vi',
    'Welsh': 'cy',
}
langKeys = Object.keys(this.languages)

  constructor(
    private _auth: AuthService,
  ) {
    this.filterProfile = new FilterProfile()

    this.profileMap = {
      'facebook': this.filterProfile.facebook,
      'twitter': this.filterProfile.twitter,
      'youtube': this.filterProfile.youtube
    }

  }

  ngOnInit() {
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log("changed")
  }

  addSocialMedia(media: string): void {
    this.show.push(media)
    this.profileMap[media].show = true
  }

  removeSocialMedia(media: string): void {
    this.show = this.show.filter((value, index, arr) => {
      return value != media
    })
    this.profileMap[media].show = false
  }

  setYTValue(key: string, val: string): void {
    this.filterProfile.youtube[key] = val
    console.log(this.filterProfile.youtube)
  }

  getFilterProfile() :FilterProfile {
    return this.filterProfile
  }

  setInParent(){
    console.log(this.filterProfile)
  }

}
