import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Operations } from 'src/app/models/operations.model';
import { OperationsService } from 'src/app/services/operations.service';

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
    'status',
    'platform',
  ];
  dataSource = new MatTableDataSource();

  constructor(private operationsService: OperationsService) { }

  ngOnInit(){
    // this.createOperation();
    // this.loadOperations();
    this.dataSource.data = RecordData;
    console.log(this.dataSource.data)
  }

  // loadOperations(): void {
  //   this.operationsService.get_AllOperations().subscribe((response: any) => {
  //     this.dataSource.data = response;
  //     console.log('Operations:', this.dataSource.data);
  //   });
  // }

  // operation: Operations = {
  //   user_id: 1,
  //   status: 'PENDING',
  //   type: 'CRYPTO_PURCHASE',
  //   from_crypto: 'BTC',
  //   from_amount: 0,
  //   to_crypto: 'ETH',
  //   to_amount: 0,
  //   platform: 'Some Platform'
  // };

  // createOperation(): void {
  //   this.operationsService.create_Operation(this.operation).subscribe((response: any) => {
  //     console.log('Operation created:', response);
  //   });
  // }
}
