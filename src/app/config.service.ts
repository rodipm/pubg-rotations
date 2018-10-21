import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpHeaders = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiMzVmZjVjMC1iNmU2LTAxMzYtNTVhZS00OTdlYzljMDgyNDIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTQwMDc1MDcxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1Ymctcm90YXRpb25zIn0.wBqOY0Ue5OH707gxliuecP-aUrjIxi5l3gKuc7Y9b0A',
        'Accept': 'application/vnd.api+json'
    })
};

const platformRegionShard = 'pc-sa';
const playerName = 'ganjohan';
const id = '';

const endpointUrl = 'https://api.pubg.com/shards/' + platformRegionShard + '/players?filter[playerNames]=' + playerName;


@Injectable()
export class ConfigService {

    constructor(private http: HttpClient) { }

    doCall() {
        return this.http.get(endpointUrl, httpHeaders);
    }

    doIdCall(id) {

        return this.http
            .get('https://api.pubg.com/shards/' + platformRegionShard + '/players/' + id);
    }
}