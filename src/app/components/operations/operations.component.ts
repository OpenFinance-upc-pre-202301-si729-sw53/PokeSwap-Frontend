import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Operation } from 'src/app/models/operations.model';
import { OperationService } from 'src/app/services/operation.service';

interface IRecords{
  to_crypto: string;
  type: string;
  to_amount: number;
  from_amount: number;
  operation_date: string;
  platform: string;
}

const RecordData : IRecords[] = [
  { to_crypto: 'Bitcoin', type: 'Compra', to_amount: 0.5, from_amount: 150.50, operation_date: '2022-01-01', platform: 'Coinbase' },
  { to_crypto: 'Ethereum', type: 'Intercambio', to_amount: 2, from_amount: 120, operation_date: '2022-02-15', platform: 'Binance' },
  { to_crypto: 'Litecoin', type: 'Compra', to_amount: 5, from_amount: 60, operation_date: '2022-03-10', platform: 'Huobi' },
];



@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent {
  displayedColumns: string[] = [
    'to_crypto',
    'type',
    'to_amount',
    'from_amount',
    'operation_date',
    'platform',
  ];

  operationsData!: Operation;

  constructor(private operationService: OperationService) { 
    this.operationsData = {} as Operation;
  }

  dataSource = new MatTableDataSource();

  ngOnInit(){
    this.dataSource.data = RecordData;
    console.log(this.dataSource.data)
    this.operationService.get_Operations().subscribe((data: Operation) => {
      this.operationsData = data;
      console.log('asdfasdf', this.operationsData);
      /*this.dataSource.data = this.operationsData;*/
    });
  }
  
}
