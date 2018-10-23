import { Component, OnInit, Input, Output } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {
  @Input() infos;

  constructor(private bes: ConfigService) { }

  ngOnInit() {
    this.refreshInfos();
  }

  refreshInfos() {
    if (this.bes.getFilteredResults())
      this.infos = JSON.stringify(this.bes.getFilteredResults);
    else
      this.infos = "Waiting data...";

    console.log(this.infos);
  }
}
