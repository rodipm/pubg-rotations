import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpHeaders = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiMzVmZjVjMC1iNmU2LTAxMzYtNTVhZS00OTdlYzljMDgyNDIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTQwMDc1MDcxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1Ymctcm90YXRpb25zIn0.wBqOY0Ue5OH707gxliuecP-aUrjIxi5l3gKuc7Y9b0A',
        'Accept': 'application/vnd.api+json',
        'Accept-Encoding': 'gzip'
    })
};

const platformRegionShard = 'pc-sa';
const playerName = 'TBS_ganjohan';
const id = '';


const endpointUrl = 'https://api.pubg.com/shards/' + platformRegionShard + '/players?filter[playerNames]=' + playerName;


@Injectable()
export class ConfigService {
    results;

    constructor(private http: HttpClient) {
        this.results = null;
    }

    // returns observable for the endpoint http request for the last match ID
    doCall() {
        return this.http.get(endpointUrl, httpHeaders);
    }

    // returns observable for the endpoint http request for actual match
    doIdCall(id) {
        return this.http.get('https://api.pubg.com/shards/' + platformRegionShard + '/matches/' + id, httpHeaders);
    }

    // returns observable for the endpoint http request for the telemetry data
    doTelemetryCall(telemetryURL) {
        return this.http.get(telemetryURL, httpHeaders);
    }

    // returns player name
    getPlayerName() {
        return playerName;
    }

    // returns player region
    getPlayerRegion() {
        return platformRegionShard;
    }

    // returns telemetry data
    getResults() {
        return this.results;
    }

    // sets telemetry data
    setResults(telemetryData) {
        this.results = telemetryData;
    }

    // filters the results by args
    filterResults(filterFunc) {
        if (this.results != null)
            this.results.find(filterFunc);
    }
}