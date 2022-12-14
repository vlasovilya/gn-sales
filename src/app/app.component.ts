import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ResolveEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  public title:string = 'GreenNinjaFrontend';
  @HostBinding('class.is-loaded') isFontsLoaded:boolean=false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ){

    this.router.events.subscribe((event: ResolveEnd) => {
      //console.log(event);
    });
  }



  ngOnInit(): void {
    const sizes={
      sm: '(max-width: 630px)',
      md: '(min-width: 631px)',
      lg: '(min-width: 915px)',
      xl: '(min-width: 1100px)',
    }
    this.breakpointObserver.observe(Object.values(sizes)).subscribe( (state: BreakpointState) => {
      let size='lg';
      //console.log(state);
      Object.keys(sizes).forEach(key=>{
        if (state.breakpoints[sizes[key]]) {
          size=key;
        }
      })
      this.appService.screenSize.next(size);
      this.appService.currentScreenSize=size;
    });

    document.fonts.ready.then(() => this.isFontsLoaded = true);
    if (document.fonts.status==="loaded"){
      this.isFontsLoaded = true;
    }
  }

  ngAfterViewInit(): void {


  }
}
