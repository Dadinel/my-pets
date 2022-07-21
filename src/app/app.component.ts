import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router
  ) {

  }
  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
    { label: 'Donos de Pet', action: this.goToOwners.bind(this) }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

  goToOwners(): void {
    this.router.navigate(['owners']);
  }

}
