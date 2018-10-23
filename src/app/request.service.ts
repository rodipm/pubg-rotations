import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpHeaders = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiMzVmZjVjMC1iNmU2LTAxMzYtNTVhZS00OTdlYzljMDgyNDIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTQwMDc1MDcxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1Ymctcm90YXRpb25zIn0.wBqOY0Ue5OH707gxliuecP-aUrjIxi5l3gKuc7Y9b0A',
        'Accept': 'application/vnd.api+json'
    })
};

@Injectable()
export class RequestService {
    playerRegion;
    playerName;
    id;
    endpointUrl;
    results;
    filterArgs;
    filteredResults;

    constructor(private http: HttpClient) {
        this.playerRegion = 'pc-sa';
        this.playerName = 'TBS_ganjohan';
        this.id = '';
        this.endpointUrl = 'https://api.pubg.com/shards/' + this.playerRegion + '/players?filter[playerNames]=' + this.playerName;
        this.results = null;
        this.filterArgs = 'LogPlayerKill';
        this.filteredResults = null;
    }

    // returns observable for the endpoint http request for the last match ID
    doCall(region, name) {
        this.playerRegion = region;
        this.playerName = name;
        this.endpointUrl = 'https://api.pubg.com/shards/' + this.playerRegion + '/players?filter[playerNames]=' + this.playerName;
        return this.http.get(this.endpointUrl, httpHeaders);
    }

    // returns observable for the endpoint http request for actual match
    doIdCall(id) {
        return this.http.get('https://api.pubg.com/shards/' + this.playerRegion + '/matches/' + id, httpHeaders);
    }

    // returns observable for the endpoint http request for the telemetry data
    doTelemetryCall(telemetryURL) {
        return this.http.get(telemetryURL, httpHeaders);
    }

    // returns player name
    getPlayerName() {
        return this.playerName;
    }

    // returns player region
    getPlayerRegion() {
        return this.playerRegion;
    }

    // returns telemetry data
    getResults() {
        return this.results;
    }

    // returns filter args
    getFilterArgs() {
        return this.filterArgs;
    }

    // return filtered results
    getFilteredResults() {
        return this.filteredResults;
    }

    // sets telemetry data
    setResults(telemetryData) {
        this.results = telemetryData;
    }

    // filters the results by args
    filterResults(filterArgs) {
        if (this.results != null)
            this.results.find((element) => {
                if (element._T == filterArgs && element.victim.name == this.playerName) {
                    this.filteredResults = element;
                    return true;
                }
            });
    }
}