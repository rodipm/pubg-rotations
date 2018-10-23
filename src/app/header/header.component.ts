import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  requestId;
  playerName;
  playerRegion;
  telemetryId;
  telemetryURL;
  telemetryData;
  filterArgs;
  filteredResults;

  @Output() refreshInfos = new EventEmitter<any>();

  constructor(private bes: ConfigService) { }

  ngOnInit() {
    // initialize data
    this.playerName = this.bes.getPlayerName();
    this.playerRegion = this.bes.getPlayerRegion();
    this.filterArgs = this.bes.getFilterArgs();
    this.filteredResults = this.bes.getFilteredResults();
    this.processRequest();
  }

  processRequest() {
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
                    this.bes.setResults(this.telemetryData);

                    //call ConfigService method to filter the results
                    this.bes.filterResults(this.filterArgs);
                    this.filteredResults = this.bes.filteredResults;
                    // console.log(this.filteredResults);
                    this.refreshInfos.emit(this.filteredResults);
                  });
              }
            });
          },
            (err) => {
              console.log(err);
            });
      });
  }

  onClick() {
    this.processRequest();
  }
}
