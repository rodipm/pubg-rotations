import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PUBG-Rotations';
  requestId;
  playerName;
  playerRegion;
  telemetryId;
  telemetryURL;
  telemetryData;

  constructor(private bes: ConfigService) { }

  onClick() {
    // subscribes to ConfigService.doCall() method to get the requestID to reach the match ID
    this.bes.doCall()
      .subscribe((data: any) => {
        this.requestId = data.data[0].relationships.matches.data[0].id;

        // subscribes to ConfigSerice.doIdCall() method to get the telemetry ID to reach the telemetry URL
        this.bes.doIdCall(this.requestId)
          .subscribe((data: any) => {
            this.telemetryId = data.data.relationships.assets.data[0].id;

            // search the included array to get acces to telemetry data
            data.included.find((element) => {
              if (element.id == this.telemetryId) {
                this.telemetryURL = element.attributes.URL;

                // subscribes to ConfigService.doTelemetryCall() method to retrieve telemetry data
                this.bes.doTelemetryCall(this.telemetryURL)
                  .subscribe((telemetryData: any) => {

                    // sets results to the ConfigService
                    this.telemetryData = telemetryData;
                    console.log(this.telemetryData);
                    this.bes.setResults(this.telemetryData);

                    //call ConfigService method to filter the results
                    this.bes.filterResults(filterArgs);
                  });
              }
            });
          },
            (err) => {
              console.log(err);
            });
      });
  }

  ngOnInit() {
    this.onClick();
    this.playerName = this.bes.getPlayerName();
    this.playerRegion = this.bes.getPlayerRegion();
  }

}
