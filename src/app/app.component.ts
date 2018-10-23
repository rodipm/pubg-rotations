import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RequestService } from './request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PUBG-Rotations';
  infos = null;

  constructor(private bes: RequestService) { }

  ngOnInit() { }

  onRefreshInfos(infos) {
    this.infos = infos;
  }

}
