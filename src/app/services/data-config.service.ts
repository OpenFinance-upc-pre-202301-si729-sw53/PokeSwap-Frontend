import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataConfigService {

  constructor() { }

  private selectedOptionFrom: string = '';
  private selectedOptionTo: string = '';

  setSelectedOptionFrom(option: any) {
    this.selectedOptionFrom = option;
  }

  getSelectedOptionFrom() {
    return this.selectedOptionFrom;
  }

  setSelectedOptionTo(option: any) {
    this.selectedOptionTo = option;
  }

  getSelectedOptionTo() {
    return this.selectedOptionTo;
  }
}
