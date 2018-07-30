
import { HttpClient, HttpHeader } from '@angular/common/http';


import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { OnInit } from '@angular/core';
import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { Chart } from 'chart.js';



@Component({
    selector: 'ngx-chartjs',
    styleUrls: ['./chartjs.component.scss'],
    templateUrl: './chartjs.component.html',
})
export class ChartjsComponent implements OnInit {
    colors: any;
    chartjs: any;
    updateOptions: any;
    chart = []; // This will hold our chart info
    chart2 = [];
    city: any;
    currentData: any;
    model = {
        name: 'singapore',
        id: this.id
    };
    temp_max: any;
    temp_min: any;
    temp: any;
    humidity: any;
    wind: any;
    windKnots: any;
    rain = [];
    currentDate: any;

    id = 1880252;
    data = [10, 100];
    set = {
        name: 'Line 4',
        type: 'line',
        data: [5, 12, 16, 20]
    };


    data: any;
    options: any;
    themeSubscription: any;

    constructor(private _http: HttpClient,
        private theme: NbThemeService) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            this.colors = config.variables;
            this.chartjs = config.variables.chartjs;
        });

    }
    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
    }

    ngOnInit() {
        this.forecastGraph();
        this.todayGraph();
    }

    todayGraph() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            this.colors = config.variables;
            this.chartjs = config.variables.chartjs;
        });
        this.currentSingapura().subscribe(res => {
            this.currentData = res.valueOf();
            console.log(this.currentData);
        });
    }

    forecastGraph() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            this.colors = config.variables;
            this.chartjs = config.variables.chartjs;
        });
        let noRain = [];
        this.singapura().subscribe(res => {
            this.temp_max = res['list'].map(res => res.main.temp_max);

            this.temp_min = res['list'].map(res => res.main.temp_min);

            this.temp = res['list'].map(res => res.main.temp);

            this.humidity = res['list'].map(res => res.main.humidity);

            this.wind = res['list'].map(res => res.wind.speed);

            for (var i = 0; i < this.wind.length; i++) {
                if (typeof this.wind[i] === 'undefined') {
                    this.wind[i] = 0;
                }
                this.wind[i] = this.wind[i] * 1.94384;
            }
            console.log('wind', this.wind);

            let hujan = [];
            let rainCheck = res.valueOf();
            let check = rainCheck['list'];
            let pls: any;
            for (var i = 0; i < this.wind.length; i++) {
                let moreCheck = check[i];

                try {
                    pls = moreCheck.rain['3h'];
                } catch {
                    console.log('no rain');
                    hujan.push('0');
                }
                if (typeof pls === 'undefined') {
                    console.log('rain check failed', pls);
                    hujan.push('0');
                } else {
                    console.log('rain check', pls);
                    hujan.push(pls);
                } //  hujan[i] = pls;
            }
            console.log(hujan);
            //this.rain = res['list'].map(res => res.rain['3h']);

            let alldates = res['list'].map(res => res.dt);

            let weatherDates = [];
            alldates.forEach(res => {
                let jsdate = new Date(res * 1000);
                weatherDates.push(
                    jsdate.toLocaleTimeString('en', {
                        //year: 'numeric',
                        // month: 'short',
                        day: 'numeric'
                    })
                );
            });

            this.chart = new Chart('canvas', {
                type: 'bar',
                data: {
                    labels: weatherDates,

                    datasets: [
                        {
                            type: 'line',
                            label: 'temperature',
                            data: this.temp,
                            borderColor: 'rgb(255, 159, 64)'
                        },
                        {
                            type: 'line',
                            label: 'wind',
                            data: this.wind,
                            // backgroundColor: NbColorHelper.hexToRgbA(this.colors.lit, 0.5),
                            borderColor: 'rgb(54, 162, 235)'
                        },
                        {
                            label: 'rainfall',
                            data: hujan,
                            backgroundColor: NbColorHelper.hexToRgbA(this.colors.danger, 0.3),
                            borderColor: this.colors.danger
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: true
                    },
                    scales: {
                        xAxes: [
                            {
                                display: true
                            }
                        ],

                        yAxes: [
                            {
                                display: true
                            }
                        ]
                    },
                    layout: {
                        padding: {
                            left: -700,
                            right: -10,
                            top: -10,
                            bottom: -35
                        }
                    }
                }
            });
        });
    }

    search() {
        console.log(this.model.id);
        console.log(this.model.name);
        this.setID(this.model.id);

        this.forecastGraph();
        this.todayGraph();
        //console.log(input);
    }
    setID(input: number) {
        this.id = input;
        console.log(this.id);
    }

    singapura() {
        let url =
            'https://api.openweathermap.org/data/2.5/forecast?id=' +
            this.id +
            '&APPID=a9c83902666f86d7762933fce633fb47&units=metric';
        return this._http.get(url).map(result => result);
    }
    currentSingapura() {
        let url =
            'https://api.openweathermap.org/data/2.5/weather?id=' +
            this.id +
            '&APPID=a9c83902666f86d7762933fce633fb47&units=metric';

        return this._http.get(url).map(result => result);
    }


}



