import { Component } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@Component({
  selector: 'app-chart',
  imports: [BarChartComponent, LineChartComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

}
