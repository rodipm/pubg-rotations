import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  requestId;
  @Input() playerName;
  @Input() playerRegion;
  telemetryId;
  telemetryURL;
  telemetryData;
  @Input() filterArgs;
  filteredResults;

  @Output() refreshInfos = new EventEmitter<any>();

  constructor(private bes: RequestService) { }

  ngOnInit() {
    // initialize data
    this.playerName = this.bes.getPlayerName();
    this.playerRegion = this.bes.getPlayerRegion();
    this.filterArgs = this.bes.getFilterArgs();
    this.filteredResults = this.bes.getFilteredResults();
    this.processRequest();
  }

  processRequest() {
    // subscribes to RequestService.doCall() method to get the requestID to reach the match ID
    this.bes.doCall(this.playerRegion, this.playerName)
      .subscribe((data: any) => {
        this.requestId = data.data[0].relationships.matches.data[this.filterArgs].id;

        // subscribes to ConfigSerice.doIdCall() method to get the telemetry ID to reach the telemetry URL
        this.bes.doIdCall(this.requestId)
          .subscribe((data: any) => {
            this.telemetryId = data.data.relationships.assets.data[0].id;

            // search the included array to get acces to telemetry data
            data.included.find((element) => {
              if (element.id == this.telemetryId) {
                this.telemetryURL = element.attributes.URL;

                // subscribes to RequestService.doTelemetryCall() method to retrieve telemetry data
                this.bes.doTelemetryCall(this.telemetryURL)
                  .subscribe((telemetryData: any) => {

                    // sets results to the RequestService
                    this.telemetryData = telemetryData;
                    this.bes.setResults(this.telemetryData);

                    //call RequestService method to filter the results
                    this.bes.filterResults(this.filterArgs);
                    this.filteredResults = this.bes.getFilteredResults();
                    console.log(this.filteredResults);
                    this.refreshInfos.emit(JSON.stringify(this.filteredResults));
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
