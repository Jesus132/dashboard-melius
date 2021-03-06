import { Component, OnInit } from '@angular/core';

import { Widgets } from 'src/app/data/interfaces/Widgets.interface';
import { DashboardService } from 'src/app/data/service/Dashboard/Dashboard.service';

let dynamicWidgetId = 0;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public widgets: Widgets[] = [];

  txt = 0;
  text = "Dashboard";

  constructor(
    public dash: DashboardService
  ) {
    // console.log(JSON.parse(localStorage.getItem('Allwidgets')));

    if (localStorage.getItem('Allwidgets') === null) {
      this.dash.Allwidgets.push({
        id: 0,
        widgets: []
      });
    } else {
      // this.dash.Allwidgets = JSON.parse(localStorage.getItem('Allwidgets'));
      this.dash.Allwidgets.push(JSON.parse(localStorage.getItem('Allwidgets'))[0]);
      this.dash.Allwidgets[0].widgets.map((wid) => {
        this.dash.widgets.push(wid);
      });

      // console.log(this.dash.Allwidgets[0]);

    }
    // console.log(this.dash.Allwidgets);

  }

  ngOnInit(): void {
    this.write();
  }

  private write(): void {
    if (this.txt < this.text.length) {
      document.getElementById("text").innerHTML += this.text.charAt(this.txt);
      this.txt++;
      setTimeout(() => {
        this.write();
      }, 200);

    }

  }


  get(): void {
    this.dash.getTemp().subscribe(
      (resp) => {
        console.log(resp);

        // const data = resp.map(
        //   (res): any => ({
        //     state: res.state,
        //     positive: res.positive,
        //     hospitalizedCurrently: res.hospitalizedCurrently, // hospitalizados actualmente
        //     recovered: res.recovered, // recuperados
        //     death: res.deathConfirmed, // Muertes
        //     hospitalized: res.hospitalized, // Hospitalizados
        //   })
        // );
        // console.log(data);


      },
      (err) => {
        console.log(err);
      }
    );

  }

  AddWidget(): void {
    const Widget: Widgets = {
      x: 0,
      y: 0,
      width: 9,
      height: 7,
      i: dynamicWidgetId++,
      ChartBackend: `dataupdate${dynamicWidgetId}`,
      chartOptions: {
        series: [
          {
            name: "My-series",
            data: [0]
          }
        ],
        chart: {
          height: 350,
          type: 'line',
          stacked: true,
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 500
            }
          },
        },
        title: {
          text: `Angular Chart${dynamicWidgetId}`
        },
        xaxis: {
          // categories: ['0']
          type: "datetime",
          min: new Date("02/01/2021").getTime(),
          max: undefined,
          labels: {
            format: 'dd-MMM',
          }
        }
      }
    };

    this.dash.Allwidgets.forEach(widget => {// estoy recorriendo TODOS los widget y no los estoy borrando
      if (widget.id === this.dash.Indexwidgets) {
        widget.widgets.push(Widget);
        this.dash.widgets = widget.widgets;
        localStorage.setItem('Allwidgets', JSON.stringify(this.dash.Allwidgets));
      }
    });

  }

  public WidgetChange(evt: any, widget: Widgets) {
    console.log(widget, evt.x, evt.y, evt);

    widget.x = evt.x;
    widget.y = evt.y;
  }

  onWidgetGridChange(e): void {
    const index = this.dash.Allwidgets.findIndex(i => i.id === this.dash.Indexwidgets);
    console.log(e);

    if (e !== undefined) {
      e.forEach(changewidget => {
        this.dash.Allwidgets[index].widgets.forEach(widget => {
          if (widget.i === Number(changewidget.id)) {
            // debugger;
            widget.width = changewidget.width;
            widget.height = changewidget.height;
            widget.x = changewidget.x;
            widget.y = changewidget.y;
            // console.log( widget, changewidget );
          }
        });
      });
    }
    localStorage.setItem('Allwidgets', JSON.stringify(this.dash.Allwidgets));

  }

}
