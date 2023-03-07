import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-expense-income-graph',
  templateUrl: './expense-income-graph.component.html',
  styleUrls: ['./expense-income-graph.component.css']
})
export class ExpenseIncomeGraphComponent implements OnInit {
 // Pie
 public pieChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },

  }
};
public pieChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
public pieChartDatasets = [{
  data: [180, 480, 770, 90, 1000, 270, 400, 300, 500, 100, 2000, 300]
}];
public pieChartLegend = true;
public pieChartPlugins = [];

// Line Chart
public lineChartData: ChartConfiguration['data'] = {
  datasets: [
    {
      data: [180, 480, 770, 90, 1000, 270, 400, 300, 500, 100, 2000, 300],
      label: 'Expense Income',
      yAxisID: 'y1',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: 'origin',
    }
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

public lineChartOptions: ChartConfiguration['options'] = {
  elements: {
    line: {
      tension: 0.5
    }
  },
  scales: {
    // We use this empty structure as a placeholder for dynamic theming.
    y:
    {
      position: 'left',
    },
    y1: {
      position: 'right',
      grid: {
        color: 'rgba(255,0,0,0.3)',
      },
      ticks: {
        color: 'red'
      }
    }
  },

  plugins: {
    legend: { display: true },

  }
};

public lineChartType: ChartType = 'line';



constructor() { }

ngOnInit(): void {
}

// events
public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  // console.log(event, active);
}

public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  // console.log(event, active);
}
}
