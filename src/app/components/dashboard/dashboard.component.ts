import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataConfigService } from 'src/app/services/data-config.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @ViewChild('exchangeForm', { static: false }) userForm!: NgForm;
  
  selectedFromOption: string = '../assets/img/btc.png';
  selectedToOption: string = '../assets/img/pen.png';
  configFrom: string | undefined = undefined;
  configTo: string | undefined = undefined;

  fromOptions = [
    { value: 'btc', label: 'Bitcoin', img: '../assets/img/btc.png' },
    { value: 'eth', label: 'Ethereum', img: '../assets/img/eth.png' }
  ];
  
  toOptions = [
    { value: 'usd', label: 'US Dollar', img: '../assets/img/pen.png' },
    { value: 'pen', label: 'Soles', img: '../assets/img/usd.png' },
  ];
  
  constructor(private router: Router, private dataconfigService: DataConfigService, private formBuilder: FormBuilder) { }

  onConfig(): void {
    this.dataconfigService.setSelectedOptionFrom(this.configFrom);
    this.dataconfigService.setSelectedOptionTo(this.configTo);
    this.router.navigate(['/dashboard/exchange']);
  }

  onSelectionChange_From(event: any) {
    this.selectedFromOption = event.value;
    this.configFrom = this.fromOptions.find(option => option.img === event.value)?.label;
  }
    
  onSelectionChange_To(event: any) {
    this.selectedToOption = event.value;
    this.configTo = this.toOptions.find(option => option.img === event.value)?.label;
  }
}
