import { Component, OnInit, Input } from '@angular/core';
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
    this.infos = this.bes.getFilteredResults() || "Waiting...";
    console.log('a');
  }
}
