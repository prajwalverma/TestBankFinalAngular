// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { AccumulationChart, AccumulationLegend, PieSeries, AccumulationDataLabel } from '@syncfusion/ej2-charts';
import { EmiStatuses } from 'src/app/Models/EmiStatus';
import { PriorityCustomer } from 'src/app/Models/PriorityCustomer';
import { LoanAccountService } from 'src/app/services/loanAccount.service';
import { SavingAccountService } from 'src/app/services/savingAccount.service';

AccumulationChart.Inject(AccumulationChart, AccumulationLegend, PieSeries, AccumulationDataLabel);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalLoanAcc!: number;
  totalSBAcc!: number;

  defaultView=false;

  NoOfCustomersPaidLastMonth!: number;
  NoOfCustomersPendingLastMonth!: number;
  NoOfCustomersPaidCurrentMonth!: number;
  NoOfCustomersPendingCurrentMonth!: number;

  priorityCustomers!:PriorityCustomer[];

  constructor(private loanAccService: LoanAccountService, private savingAccService: SavingAccountService) {

  }

  changeView(){
    this.ngOnInit();
    this.defaultView=!this.defaultView;
  }

  ngOnInit(): void {
    this.loanAccService.getAllLoanAccounts().subscribe(totalLoanAcc => this.totalLoanAcc = totalLoanAcc.length)
    this.savingAccService.getAllSavingAccounts().subscribe(totalSavingAcc => this.totalSBAcc = totalSavingAcc.length)
    this.loanAccService.getEMIStatus().subscribe(emistatus=>{this.NoOfCustomersPaidCurrentMonth=emistatus.NoOfCustomersPaidCurrentMonth;
      this.NoOfCustomersPaidLastMonth=emistatus.NoOfCustomersPaidLastMonth;
      this.NoOfCustomersPendingCurrentMonth=emistatus.NoOfCustomersPendingCurrentMonth;
      this.NoOfCustomersPendingLastMonth=emistatus.NoOfCustomersPendingLastMonth;
    })

    this.savingAccService.getPriorityCustomers(1000000).subscribe(pCustomers=>{this.priorityCustomers=pCustomers;console.log(this.priorityCustomers)});

    setTimeout(() => this.createPie(), 500)
    setTimeout(() => this.createPieForDefaulters(), 500)
    setTimeout(() => this.createPieForEMIPresent(), 500)

  }

  createPie() {
    var piechart: AccumulationChart = new AccumulationChart({
      series: [
        {
          dataSource: [
            { x: 'Loan Accounts: ' + this.totalLoanAcc, y: this.totalLoanAcc, r: '50' },
            { x: 'Saving Accounts: ' + this.totalSBAcc, y: this.totalSBAcc, r: '60' },
          ],
          dataLabel: {
            visible: true, position: 'Outside',
            name: 'x'
          },
          radius: 'r', xName: 'x',
          yName: 'y', innerRadius: '40%'
        },
      ],
      enableSmartLabels: true,
      legendSettings: {
        visible: true,
        position:'Bottom',
      },
      enableAnimation: true,
      title: 'Total Accounts Data'
    }, '#element');

  }
  createPieForDefaulters() {
    var piechart: AccumulationChart = new AccumulationChart({
      series: [
        {
          dataSource: [
            { x: 'Paid Customers: '+this.NoOfCustomersPaidLastMonth,y: this.NoOfCustomersPaidLastMonth, r: '50' },
            { x: 'Pending Customers: '+this.NoOfCustomersPendingLastMonth, y: this.NoOfCustomersPendingLastMonth, r: '60' }
          ],
          dataLabel: {
            visible: true, position: 'Outside',
            name: 'x'
          },
          radius: 'r', xName: 'x',
          yName: 'y', innerRadius: '40%'
        },
      ],
      enableSmartLabels: true,
      legendSettings: {
        visible: true,
        position:'Bottom',
      },
      enableAnimation: true,
      title: 'Last month EMI Data'
    }, '#element1');
  }

  createPieForEMIPresent() {
    var piechart: AccumulationChart = new AccumulationChart({
      series: [
        {
          dataSource: [
            { x: 'Paid Customers: '+ this.NoOfCustomersPaidCurrentMonth,y: this.NoOfCustomersPaidCurrentMonth, r: '50' },
            { x: 'Pending Customers: '+this.NoOfCustomersPendingCurrentMonth, y: this.NoOfCustomersPendingCurrentMonth, r: '60' }
          ],
          dataLabel: {
            visible: true, position: 'Outside',
            name: 'x'
          },
          radius: 'r', xName: 'x',
          yName: 'y', innerRadius: '40%'
        },
      ],
      enableSmartLabels: true,
      legendSettings: {
        visible: true,
        position:'Bottom',
      },
      enableAnimation: true,
      title: 'Current month EMI Data'
    }, '#element2');
  }
}






// { x: 'Loan Accounts-' + this.totalLoanAcc, y: this.totalLoanAcc, r: '160' },
// { x: 'Saving Accounts-' + this.totalSBAcc, y: this.totalSBAcc, r: '160' },
