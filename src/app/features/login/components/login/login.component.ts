import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {LoginService} from '../../services/login.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ConstantService} from '../../../../core/constant/constant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  constructor(private loginService: LoginService ,
              private fb: FormBuilder,
              private toaster: ToastrService,
              private router: Router,
              private constant: ConstantService) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(this.constant.regex.email)]],
      password: [null, Validators.required]
    });
  }
  onSubmit(): void{
    this.loginService.signIn(this.login.value).pipe(take(1)).subscribe( res => {
      if (res.result.user.role === this.constant.role.ADMIN){
        localStorage.setItem(this.constant.localStorageVariables.TOKEN, res.result.authToken);
        localStorage.setItem(this.constant.localStorageVariables.USER, JSON.stringify(res.result.user));
        this.toaster.success(`${this.constant.toasterBellIconHTML} Successfully logged in`, '',
          this.constant.toasterConfiguration.success);
        this.router.navigateByUrl(this.constant.appRoutePaths.userManagement).then();
      } else{
        this.toaster.error(`${this.constant.toasterBellIconHTML} Failed to login`, '',
          this.constant.toasterConfiguration.error);
      }
    }, error => {
      if (this.constant.RESPONSE_ERRORS[error.error.result.CODE]){
        this.toaster.error( this.constant.toasterBellIconHTML + ' ' +
          (error.error.result.details ? error.error.result.details.MESSAGE : error.error.result.details.MESSAGE), '',
          this.constant.toasterConfiguration.error);
      } else{
        this.toaster.error(`${this.constant.toasterBellIconHTML} Failed to login`, '',
          this.constant.toasterConfiguration.error);
      }
    });
  }
}
