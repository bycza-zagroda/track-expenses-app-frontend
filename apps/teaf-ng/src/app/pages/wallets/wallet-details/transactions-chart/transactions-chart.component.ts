import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'teaf-ng-transactions-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './transactions-chart.component.html',
  styleUrls: ['./transactions-chart.component.scss'],
})
export class TransactionsChartComponent implements OnInit {
  @Input() public incomesCount!: number;
  @Input() public expensesCount!: number;

  // TODO: improve types
  public chartData: any;
  public chartOptions: any

  public ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--teaf-text-color');

    this.chartOptions = {
      resizeDelay: 3000,
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };

    this.chartData = {
      labels: ['Incomes', 'Expenses'],
      datasets: [
        {
          data: [this.incomesCount, this.expensesCount],
          // TODO: use our colors here
          backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400')]
        }
      ]
    };
  }
}
