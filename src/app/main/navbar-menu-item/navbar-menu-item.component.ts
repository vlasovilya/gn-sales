import {Component, HostBinding, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NavbarService } from '../navbar.service';
import { MenuItem } from '../main.component';

@Component({
  selector: 'gn-navbar-menu-item',
  templateUrl: './navbar-menu-item.component.html',
  styleUrls: ['./navbar-menu-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
    trigger('indicatorShowHide', [
      state('collapsed', style({opacity: '0', display:'none', height: 0})),
      state('expanded', style({opacity: '1', display:'block', height: 'auto'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class NavbarMenuItemComponent implements OnInit, OnChanges {
  @Input() @HostBinding('class.expanded') public expanded: boolean;
  @Output() public onItemClick: EventEmitter<any> = new EventEmitter<any>();
  @HostBinding('attr.aria-expanded') ariaExpanded;
  @Input() item: any;
  @Input() depth: number;

  constructor(
    public navService: NavbarService,
    public router: Router
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  setExpanded(url){
    if (this.item.path && url && !this.expanded) {
        //console.log(`Checking '/${this.item.route.paths.join('/')}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.path}`) === 0;
        //console.log(this.expanded);
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
        console.log(url);
        this.setExpanded(url);
    });
  }

  ngOnChanges() {
    //this.setExpanded(window.location.pathname);
  }

  onItemSelected(item: MenuItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.path]);
      this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  getPaddingVal(){
    return this.depth * 12+(this.item.icon ? 0 : 12);
  }
}
