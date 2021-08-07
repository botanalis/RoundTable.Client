import { NgModule } from '@angular/core';
import { MeetComponent } from './meet.component';
import {MeetRoutingModule} from "./meet-routing.module";



@NgModule({
  declarations: [
    MeetComponent
  ],
  imports: [
    MeetRoutingModule
  ]
})
export class MeetModule { }
