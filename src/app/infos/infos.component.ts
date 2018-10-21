import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {
  infos;

  constructor(private bes: ConfigService) { }

  ngOnInit() {
    this.refreshInfos();
  }

  refreshInfos() {
    this.infos = this.bes.getFilteredResults() || "Waiting...";
  }
}
