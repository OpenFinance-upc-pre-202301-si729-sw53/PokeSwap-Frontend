export interface Operations {
    id: number,
    fromAmount: number,
    fromCrypto: string,
    isActive: boolean,
    operationDate: Date,
    platform: string,
    status: string,
    toAmount: number,
    toCrypto: string,
    type: string,
    user: {
        id: number;
      };
}