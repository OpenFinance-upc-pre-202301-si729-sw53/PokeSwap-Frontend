export interface Cryptos {
    id: number,
    balance: number,
    exchangeRate: number,
    isActive: boolean,
    name: string,
    symbol: string,
    user: {
        id: number;
      };
}