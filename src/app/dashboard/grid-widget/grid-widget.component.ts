import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

// import { ApexCharts } from './Apexchart.chart';
import { Widgets } from 'src/app/data/interfaces/Widgets.interface';
import { DashboardService } from 'src/app/data/service/Dashboard/Dashboard.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-grid-widget',
  templateUrl: './grid-widget.component.html',
  styleUrls: ['./grid-widget.component.scss']
})
export class GridWidgetComponent implements OnInit {

  @ViewChild("chart", { static: false }) chart: ChartComponent;
  @Input() public ID: number | string;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  maxDate: Date = new Date("2021-3-20");
  minDate: Date = new Date("2021-1-19");

  chartOptions;
  Dragg = false;
  clickIcon = false;
  clickNavigation = false;
  ModalConfMax: string;

  indexwidgets: number;

  dataGraf;

  constructor(
    public dash: DashboardService
  ) { }

  ngAfterContentInit() {
    this.indexwidgets = this.dash.widgets.findIndex(jsonWidg => jsonWidg.i === Number(this.ID));
    console.log(this.dash.widgets[this.indexwidgets]);
    this.chartOptions = this.dash.widgets[this.indexwidgets].chartOptions;
  }

  ngOnInit(): void {
    this.get();
  }

  h() {
    console.log(this.indexwidgets);
  }

  private get(): void {
    this.dash.getTemp().subscribe(
      (resp) => {
        this.dataGraf = resp;
        let data = resp.map(res => [new Date(res.date).getTime(), res.monto]);
        // {
        // if (this.maxDate < new Date(res.date)) {
        //   this.maxDate = new Date(res.date)
        // }
        // if (this.minDate > new Date(res.date)) {
        //   this.minDate = new Date(res.date)
        // }
        //   return [new Date(res.date).getTime(), res.monto]
        // });

        this.chartOptions.series = [{
          name: 'Monto de ventas',
          data
        }];


      },
      (err) => {
        console.log(err);
      }
    );

  }

  calend() {
    console.log(this.range.value);
  }

  filtre() {
    console.log(this.range.value);

    const filtDate = new Date(this.range.value.start);
    const filtDateM = new Date(this.range.value.end);

    const dateFilter = this.dataGraf.filter(x => new Date(x.date) > filtDate && new Date(x.date) < filtDateM);
    console.log(dateFilter);

    this.chart.updateOptions({
      min: new Date(this.range.value.start).getTime(),
      max: new Date(this.range.value.end).getTime()
    }, false, true, true);

    const data = dateFilter.map(x => [new Date(x.date).getTime(), x.monto]);
    this.chartOptions.series = [{
      name: 'Monto de ventas',
      data
    }];

    setTimeout(() => {
      // this.chartOptions.xaxis.categories.shift();
      console.log(this.chartOptions);
      localStorage.setItem('Allwidgets', this.dash.Allwidgets.toString());
      // this.chartOptions.series.shift();
    }, 1000);

  }

  public WidgetDelet(): void {
    Swal.fire({
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      text: '¿Seguro en que quiere borrar la grafica?',
      preConfirm: () => {
        this.RemoveArrayforID(this.ID, this.dash.Indexwidgets, this.dash.widgets); // mirar si puedo migrarlo al service ya que son sus variables
      }
    });
    // Swal.showLoading();

  }

  private RemoveArrayforID(id: number | string, idAll: number | string, JsonWidget: Widgets[],): void {
    const Widget = JsonWidget.filter(jsonWidg => jsonWidg['i'] !== Number(id));

    this.dash.Allwidgets[0].widgets = Widget;
    this.dash.widgets = Widget;
    localStorage.setItem('Allwidgets', JSON.stringify(this.dash.Allwidgets));
    // return ArrayLocal;const ArrayLocal: object[] , typeof (id), typeof (JsonObject[0]['i']), JsonObject[0]['id'] === id
  }

  public ConfChart(type: string): void {
    if (type === 'line-rot') {
      this.dash.widgets[this.indexwidgets].chartOptions.chart.type = 'line';
      this.chart.updateOptions({
        chart: {
          type: 'line'
        },
        stroke: {
          curve: "stepline"
        },
      });
    }
    else if (type === 'area') {
      this.dash.widgets[this.indexwidgets].chartOptions.chart.type = type;
      this.chart.updateOptions({
        chart: {
          type
        },
        stroke: {
          curve: 'smooth'
        },
      });
    }
    else {
      this.dash.widgets[this.indexwidgets].chartOptions.chart.type = type;
      this.chart.updateOptions({
        chart: {
          type
        },
        stroke: {
          curve: 'straight' // smooth
        },
      });
    }
    console.log(this.dash.widgets);
    console.log(this.dash.Allwidgets[0]);


    this.dash.Allwidgets[0].widgets = this.dash.widgets;
    localStorage.setItem('Allwidgets', JSON.stringify(this.dash.Allwidgets));

  }

}
