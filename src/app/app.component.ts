import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PUBG-Rotations';
  infos = null;

  constructor(private bes: ConfigService) { }

  ngOnInit() { }

  onRefreshInfos(infos) {
    this.infos = infos;
  }

}
