import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:3000';

@Injectable()
export class ApiService {

  constructor(private readonly httpClient: HttpClient) {}

  public getIndicators(): Observable<any> {
    return this.httpClient.get(`${API_URL}/indicators`)
  }

  public getCountries(): Observable<any> {
    return this.httpClient.get(`${API_URL}/countries`)
  }

  public getData(indicator: string, countries: string[]): Observable<any> {
    return this.httpClient.get(`${API_URL}/indicators/${indicator}/data?countries=${countries.join(',')}`);
  }
}
