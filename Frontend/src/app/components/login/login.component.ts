import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/common/globalConstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  isSuccess=false
  url:string
  token:any

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createLoginForm()
    this.url=this.activatedRoute.snapshot.queryParams["url"] || "/"
  }

  turnBack(){
    this.location.back()
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  get loginFormControls(){return this.loginForm.controls}

  login(){
    if (this.loginForm.valid) {
      let loginModel=this.loginForm.value
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success(GlobalConstants.Messages.loginSuccess)
        this.localStorageService.add("token",response.data.token)
        this.isSuccess=true
        setTimeout(()=>{this.router.navigateByUrl(this.url)},2500)
      },responseError=>{
        this.toastrService.error(GlobalConstants.Messages.loginError)
      })
    }else{
      if (this.loginForm.get("email")?.hasError("required") && this.loginForm.get("password")?.hasError("required")) {
        this.toastrService.error("Email ve şifre boş bırakılamaz!")
      }else if (this.loginForm.get("email")?.hasError("required")){
        this.toastrService.error("Email boş bırakılamaz!")
      }else{
        this.toastrService.error("Şifre boş bırakılamaz!")
      }
    }
  }

}
