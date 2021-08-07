import { Component, OnInit } from '@angular/core';
import {MeetService} from "../../_services";

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit {

  constructor(
    private meetService: MeetService
  ) { }

  ngOnInit(): void {
    this.meetService.list()
      .subscribe(
        res => {
          console.log(res);
        },
          error => {
          console.log(error);
          }
      );
  }

}
