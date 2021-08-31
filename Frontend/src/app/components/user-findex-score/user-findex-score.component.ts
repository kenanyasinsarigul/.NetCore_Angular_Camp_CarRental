import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FindexModel } from 'src/app/models/findexModel';
import { AuthService } from 'src/app/services/auth.service';
import { FindexService } from 'src/app/services/findex.service';

@Component({
  selector: 'app-user-findex-score',
  templateUrl: './user-findex-score.component.html',
  styleUrls: ['./user-findex-score.component.css']
})
export class UserFindexScoreComponent implements OnInit {

  isHasFindexScore: boolean = false;
  findexModel: FindexModel;
  findexForm: FormGroup;
  spinner = false;

  constructor(
    private authService: AuthService,
    private findexService: FindexService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.userDetailFromToken();
    this.getUserFindexScore();
    this.createFindexForm();
  }

  get findexFormControls() { return this.findexForm.controls; }

  createFindexForm() {
    let currentYear: number = new Date().getFullYear();
    this.findexForm = this.formBuilder.group({
      year: ["", [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1920), Validators.max(currentYear)]],
      month: ["", [Validators.required, Validators.maxLength(2), Validators.minLength(2), Validators.max(12), Validators.min(1)]],
      day: ["", [Validators.required, Validators.maxLength(2), Validators.minLength(2), Validators.max(31), Validators.min(1)]],
      nationalIdentity: ["", [Validators.required, Validators.minLength(11)]],
    })
  }

  getUserFindexScore() {
    this.findexService.getByUserId(this.authService.userId).subscribe(response => {
      if (response.data == null || response.data == undefined) {
        this.isHasFindexScore = false;
        console.log(this.isHasFindexScore);
      } else {
        this.findexModel = response.data;
        this.isHasFindexScore = true;
        console.log(response.data);
      }
    })
  }

  postFindexForm() {
    if (this.findexForm.valid) {
      let findexModel: FindexModel = Object.assign({}, this.findexForm.value);
      findexModel.day = findexModel.day.toString();
      findexModel.nationalIdentity = findexModel.nationalIdentity.toString();
      findexModel.year = findexModel.year.toString();
      findexModel.month = findexModel.month.toString();
      findexModel.userId = parseInt(this.authService.userId.toString());
      this.spinner = true;
      this.findexService.add(findexModel).subscribe(response => {
        this.toastrService.info("Findex skorunuz başarıyla hesaplandı.");
      }, responseError => {
        this.toastrService.error(responseError.Errors);
      })
      this.onRefresh();
    } else {
      this.toastrService.error("Formu eksiksiz ve doğru doldurunuz!");
    }
  }

  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }

}
