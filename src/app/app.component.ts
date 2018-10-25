import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { RequestService } from './request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'PUBG-Rotations';
  infos = null;
  hidden;
  
  constructor(private bes: RequestService) { }
  
  ngOnInit() { 
    this.hidden = true;
  }
  
  ngAfterViewInit() {
    this.bes.requestEvent
      .subscribe((event) => {
        this.hidden = false;
        this.infos = event.data;
    });
  }
}
