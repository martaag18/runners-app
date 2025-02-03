import { Component, OnInit } from "@angular/core";
import { BaseChartDirective } from "ng2-charts";
import { ChartData, ChartOptions } from "chart.js";
import { ChartService } from "../../../services/chart.service";
import { inject } from "@angular/core";

@Component({
  selector: "app-bar-chart",
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"],
})
export class BarChartComponent implements OnInit {
  private chartService = inject(ChartService);

  public barChartType: "bar" = "bar";

  public barChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Promedio de bestTime y totalDistance por rangos de edad",
      },
    },
  };

  public barChartData: ChartData<"bar"> = {
    labels: [],
    datasets: [],
  };

  ngOnInit(): void {
    this.chartService.getRunners().subscribe({
      next: (runners) => {
        const { labels, avgBestTimes, avgDistances } = this.chartService.calcAgeGroupStats(runners);
  
        this.barChartData = {
          labels,
          datasets: [
            {
              data: avgBestTimes,
              label: "Avg bestTime",
              backgroundColor: "#FF9800",
            },
            {
              data: avgDistances,
              label: "Avg totalDistance",
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