import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MenuItem } from '../main.component';

@Component({
  selector: 'gn-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent {
  @Input() sidebarCollapsed: boolean = false;
  @Input() menuHeight: number;
  @Input() allItemsExpanded: boolean;
  @Input() appVersion: string;

  @Input() menuItems: MenuItem[];

  @Output() expandMenu = new EventEmitter<any>();
  @Output() public onItemClick: EventEmitter<any> = new EventEmitter<any>();
}
