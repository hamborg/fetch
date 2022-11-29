import { Component, OnInit } from '@angular/core';

// import  *  as  data  from  './coordinates.json';
// var data = require('./coordinates.json');
// NOTE: Jeg kan ikke se forskellen på de to her.

import * as db from '../../assets/db.coords.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {
  // public persons: any = (data as any).default
  public DB: any = db.default.PersonsDB

  constructor() { }

  ngOnInit() {
    // console.log("Json data : ", JSON.stringify(data));
    // console.log(data)
    // console.log(this.persons);
    console.log(this.DB)
  
  

    // myCoordinates

  }
    

}
