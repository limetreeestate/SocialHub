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
  s: boolean= false

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
