import { Component, OnInit, Input, Output } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {
  @Input() infos;

  constructor(private bes: RequestService) { }

  ngOnInit() {
    this.refreshInfos();
  }

  refreshInfos() {
    if (this.bes.getFilteredResults())
      this.infos = this.bes.getFilteredResults();
    else
      this.infos = "Waiting data...";
  }
}
