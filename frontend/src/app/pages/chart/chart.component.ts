import { Component } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@Component({
  selector: 'app-chart',
  imports: [BarChartComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

}
