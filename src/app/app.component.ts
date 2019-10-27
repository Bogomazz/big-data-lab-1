import {Component, OnInit} from '@angular/core';
import {ApiService} from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public countries: {id: string; name: string}[] = [];
  public indicators: {id: string; name: string}[] = [];

  constructor(
    private readonly apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getIndicators().subscribe(data => {
      this.indicators = data[1].map(i => ({id: i.id, name: i.name}));
    });
    this.apiService.getCountries().subscribe(data => {
      this.countries = data[1].map(i => ({id: i.id, name: i.name}));
    });
  }
}
