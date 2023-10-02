import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrencyService } from '../services/currency.service';
import { History } from '../core/history';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  exchangeRate: number = 1.1;
  conversionForm!: FormGroup;
  convertedAmount: number | null = null;
  conversionHistory: History[] = [];

  options = [
    { value: 'EUR', devise: 'EUR' },
    { value: 'USD', devise: 'USD' },
  ];

  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.conversionForm = this.fb.group({
      amount: 0,
      currency: 'EUR',
      fixedRate: null,
    });

    this.conversionForm.get('amount')?.valueChanges.subscribe((value) => {
      this.convert();
    });

    this.currencyService.getExchangeRate().subscribe((rate) => {
      this.exchangeRate = rate;
    });

    this.currencyService.getExchangeRateUpdatedEvent().subscribe((rate) => {
      this.exchangeRate = rate;
      this.convert();
    });

    this.currencyService.getConversionHistory().subscribe((history) => {
      this.conversionHistory = history;
    });

    this.conversionForm.get('fixedRate')?.valueChanges.subscribe((value) => {
      if (value !== null && Math.abs(value - this.exchangeRate) > 0.02) {
        this.currencyService.setFixedExchangeRate(null);
      }
    });
  }

  Options = [];

  onChange(event: any) {
    if (event) {
      this.Options = [];
      let amount = this.conversionForm.get('amount')?.value;
      this.convertedAmount = this.currencyService.convertUsdToEur(amount);
      amount = this.convertedAmount;
      let formattedNumber = amount.toFixed(2);
      this.conversionForm.get('amount')?.setValue(formattedNumber);
      console.log(amount);
      this.options.map((res) => {
        if (res.value == event) {
          this.Options = event;
        }
      });
    }
  }

  convert() {
    const amount = this.conversionForm.get('amount')?.value;
    const currency = this.conversionForm.get('currency')?.value;
    const fixedRate = this.conversionForm.get('fixedRate')?.value;

    if (fixedRate !== null) {
      this.currencyService.setFixedExchangeRate(fixedRate);
    }

    if (currency === 'EUR') {
      this.convertedAmount = this.currencyService.convertEurToUsd(amount);
    } else if (currency === 'USD') {
      const lastConvertedAmount = this.currencyService.getLastConvertedAmount();
      if (lastConvertedAmount !== null) {
        this.convertedAmount = this.currencyService.convertUsdToEur(amount);
      }
    }

    const conversionItem: History = {
      realRate: this.exchangeRate,
      fixedRate: fixedRate !== null ? fixedRate : null,
      initialAmount: amount,
      initialCurrency: currency,
      convertedAmount: this.convertedAmount !== null ? this.convertedAmount : 0,
      convertedCurrency: currency === 'EUR' ? 'USD' : 'EUR',
    };

    this.currencyService.addConversionToHistory(conversionItem);
  }
}
