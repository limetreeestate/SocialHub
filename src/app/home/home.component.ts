import { Component, OnInit } from '@angular/core';
import { AppManagerService } from '../_services/app-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private appManager: AppManagerService,
    private router: Router
  ) { 
    
  }

  ngOnInit(){}

}
