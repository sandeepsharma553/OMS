import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../service/authentication.service';
import { ErrorHandlerService } from '../service/error-handler.service';
import { RepositoryService } from '../service/repository.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @ViewChild(MatSidenav)sidenav!: MatSidenav;
 
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private authenticationService: AuthenticationService,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
  ) {

  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  logout(){
    this.router.navigateByUrl('/');
  }
}
