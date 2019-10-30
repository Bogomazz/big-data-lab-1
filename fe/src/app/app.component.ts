import {Component, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Label} from "ng2-charts";
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public countries: {id: string; name: string}[] = [];
  public indicators: {id: string; name: string}[] = [];

  public selectedCountries = [];
  public selectedIndicator;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },
  ];

  constructor(
    private readonly apiService: ApiService,
  ) {
    for (let i = 1980; i < 2019; i++) {
      this.barChartLabels.push(i.toString());
    }
  }

  ngOnInit() {
    this.apiService.getIndicators().subscribe(data => {
      this.indicators = data.map(i => ({id: i.id, name: i.name}));

    });
    this.apiService.getCountries().subscribe(data => {
      this.countries = data.map(i => ({id: i.id, name: i.name}));
    });
  }

  public countryToggle(i: number) {
    const selectedIndex = this.selectedCountries.indexOf(this.countries[i]);
    if (selectedIndex === -1) {
      this.selectedCountries.push(this.countries[i]);
    } else {
      this.selectedCountries.splice(selectedIndex, 1);
    }
  }

  public displayResult() {
    this.apiService.getData(this.selectedIndicator, this.selectedCountries.map(c => c.id))
      .subscribe((data) => {
        const groupedData = _.groupBy(data, 'countryId');
        this.barChartData = Object.keys(groupedData).reduce((acc, countryId)=> {
          const data = this.barChartLabels.map(year => {
            const inData = groupedData[countryId].find(d => d.date == year);
            return inData ? inData.value : 0;
          });

          return [
            ...acc,
            {data: data, label: countryId}
          ]
        }, [])
      })

  }

}
