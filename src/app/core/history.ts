export interface History {
  realRate: number;
  fixedRate: number | null;
  initialAmount: number;
  initialCurrency: string;
  convertedAmount: number;
  convertedCurrency: string;
}
