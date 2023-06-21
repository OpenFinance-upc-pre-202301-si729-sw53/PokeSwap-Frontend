import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  visible: boolean = false;

  showMenu(show: boolean): void {
    this.visible = show;
  }
}
