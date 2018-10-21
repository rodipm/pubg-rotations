import { Component } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpResponse } from '@angular/common/http';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PUBG-Rotations';
  requestId;

  constructor(private bes: ConfigService) {
    this.onClick();
  }

  onClick() {
    this.bes.doCall()
      .subscribe((data: any) => {
        this.requestId = data.data[0].id;
        console.log(data.data[0].id);
        console.log(this.requestId.slice(8));
        this.bes.doIdCall(this.requestId)
          .subscribe((data: any) => {
            console.log(data);
          },
            (err) => {
              console.log(err);
            });
      });
  }

}
