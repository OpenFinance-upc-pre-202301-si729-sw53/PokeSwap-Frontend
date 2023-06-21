import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  visible: boolean = false;

  showMenu(show: boolean): void {
    this.visible = show;
  }
}
