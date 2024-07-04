import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { ErrorHandlerService } from '../service/error-handler.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup
  submitted = false;
  errorMessage: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private authService: AuthenticationService,
    private errorHandler: ErrorHandlerService,
  ) {
    // this.toastr.success('Hello world!', 'Toastr fun!');
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 5000);

  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    localStorage.removeItem('currentUser');
  }

  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    this.spinner.show();
    if (this.loginForm.valid) {
      this.authService.login(this.f['userName'].value, this.f['password'].value).subscribe(res => {
        if (res.isSuccess) {
          this.router.navigate([`./employee/dashboard`]);
        }
        else {
          this.toastr.error(res.message)
          this.spinner.hide();
        }
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
          this.toastr.error('There was some error. Please re-try or contact web admin', 'Error');
          this.spinner.hide();
        }))
    }
    else {
      this.validateAllFormFields(this.loginForm);
      this.spinner.hide();
    }
  }
  public validateControl(formGroup: FormGroup, controlName: string) {
    if (formGroup.controls[controlName].invalid && formGroup.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(formGroup: FormGroup, controlName: string, errorName: string) {
    if (formGroup.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
