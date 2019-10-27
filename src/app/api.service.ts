import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:3000';
const JSON_FORMAT_PARAM = 'format=json';
const THOUSAND_PER_PAGE_PARAM = 'per_page=1000';
const DEFAULT_PARAMS = `?${JSON_FORMAT_PARAM}&${THOUSAND_PER_PAGE_PARAM}`;

@Injectable()
export class ApiService {

  constructor(private readonly httpClient: HttpClient) {}

  public getIndicators(): Observable<any> {
    return this.httpClient.get(`${API_URL}/indicators?${JSON_FORMAT_PARAM}`)
  }

  public getCountries() {
    return this.httpClient.get(`${API_URL}/countries${DEFAULT_PARAMS}`)
  }
}
