import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface IRecords{
  coin: string;
  type: string;
  amount: number;
  price: number;
  date: string;
  platform: string;
}

const RecordData : IRecords[] = [
  { coin: 'Bitcoin', type: 'Compra', amount: 0.5, price: 150.50, date: '2022-01-01', platform: 'Coinbase' },
  { coin: 'Ethereum', type: 'Intercambio', amount: 2, price: 120, date: '2022-02-15', platform: 'Binance' },
  { coin: 'Litecoin', type: 'Compra', amount: 5, price: 60, date: '2022-03-10', platform: 'Huobi' },
];



@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent {
  displayedColumns: string[] = [
    'coin',
    'type',
    'amount',
    'price',
    'date',
    'platform',
  ];
  dataSource = new MatTableDataSource();

  ngOnInit(){
    this.dataSource.data = RecordData;
    console.log(this.dataSource.data)
  }
  
}
