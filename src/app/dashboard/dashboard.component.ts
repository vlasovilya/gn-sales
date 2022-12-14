import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'gn-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public worksheets:any[];

  constructor(
    private apiService: ApiService,
  ){

  }

  async ngOnInit() {
      this.worksheets=await firstValueFrom(this.apiService.get('worksheet/11/17/202'));
      console.log(this.worksheets);
  }
}
