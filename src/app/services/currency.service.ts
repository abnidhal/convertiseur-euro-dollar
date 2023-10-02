import { Injectable, EventEmitter } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { History } from '../core/history';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private exchangeRate: number = 1.1;
  private fixedExchangeRate: number | null = null;
  private exchangeRateUpdated = new EventEmitter<number>();
  private lastConvertedAmount: number | null = null;
  private conversionHistory: History[] = [];

  getExchangeRate(): Observable<number> {
    return interval(3000).pipe(
      map(() => {
        if (this.fixedExchangeRate === null) {
          const randomChange = this.generateRandomChange();
          this.exchangeRate += randomChange;
          this.exchangeRateUpdated.emit(this.exchangeRate);

          if (this.lastConvertedAmount !== null) {
            this.lastConvertedAmount = this.convertEurToUsd(
              this.lastConvertedAmount
            );
          }
        } else {
          this.exchangeRate = this.fixedExchangeRate;
          this.exchangeRateUpdated.emit(this.exchangeRate);
        }

        return this.exchangeRate;
      })
    );
  }

  setFixedExchangeRate(rate: number | null): void {
    this.fixedExchangeRate = rate;
  }

  convertEurToUsd(amountEur: number): number {
    this.lastConvertedAmount = amountEur;
    return amountEur * this.exchangeRate;
  }

  convertUsdToEur(amountUsd: number): number {
    this.lastConvertedAmount = amountUsd;
    return amountUsd / this.exchangeRate;
  }

  getLastConvertedAmount(): number | null {
    return this.lastConvertedAmount;
  }

  getExchangeRateUpdatedEvent(): EventEmitter<number> {
    return this.exchangeRateUpdated;
  }

  getConversionHistory(): Observable<History[]> {
    return interval(3000).pipe(map(() => this.conversionHistory.slice(0, 5)));
  }

  public addConversionToHistory(item: History): void {
    this.conversionHistory.unshift(item);
    if (this.conversionHistory.length > 5) {
      this.conversionHistory.pop();
    }
  }

  public generateRandomChange(): number {
    return (Math.random() - 0.5) * 0.1;
  }
}
