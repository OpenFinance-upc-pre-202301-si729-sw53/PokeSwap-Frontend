import { Component } from '@angular/core';

interface Token {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent {
  tokens: Token[] = [
    { name: 'BTC', quantity: 10.10 },
    { name: 'ETH', quantity: 5.5 },
    { name: 'DOGE', quantity: 1000 },
    { name: 'XRP', quantity: 1200 },
    { name: 'LTC', quantity: 25 }
  ]; 
}
