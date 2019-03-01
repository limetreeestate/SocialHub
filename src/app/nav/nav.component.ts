import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private title: String = "SocialHub";

  constructor() { }

  ngOnInit() {
  }

  public getTitle()
  {
    return this.title;
  }

}
