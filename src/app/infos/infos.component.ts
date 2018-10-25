import { Component, OnInit, Input, Output, AfterViewInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit, AfterViewInit {
  @Input() infos;
  
  constructor(private bes: RequestService) { }
  
  ngAfterViewInit(){
    this.bes.requestEvent
    .subscribe((event) => {
      this.refreshInfos();
    });
  }

  ngOnInit() {
    this.refreshInfos();
  }

  refreshInfos() {
    if (this.bes.getFilteredResults())
      this.infos = JSON.stringify(this.bes.getFilteredResults(), null, '\t');
    else
      this.infos = "Waiting data...";
  }
}
