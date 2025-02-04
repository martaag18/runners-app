import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from '../../../services/chart.service';

@Component({
  selector: 'app-line-chart',
  imports: [BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {

  private chartService = inject(ChartService);

  public lineChartType: "line" = "line";

  public lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Promedio de bestTime y totalDistance por rangos de edad",
      },
    },
  };

  public lineChartData: ChartData<"line"> = {
    labels: [],
    datasets: [],
  };

  ngOnInit(): void {
    this.chartService.getRunners().subscribe({
      next: (runners) => {
        const { labels, avgBestTimes, avgDistances } = this.chartService.calcAgeGroupStats(runners);
  
        this.lineChartData = {
          labels,
          datasets: [
            {
              data: avgBestTimes,
              label: "Avg bestTime (min/km)",
              backgroundColor: "#FF9800",
            },
            {
              data: avgDistances,
              label: "Avg totalDistance (km)",
              backgroundColor: "#fb7185",
            },
          ],
        };
      },
      error: (err) => {
        console.error("Error al obtener runners:", err);
      },
    });
  }
}
