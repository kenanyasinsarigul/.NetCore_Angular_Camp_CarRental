import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorModel } from 'src/app/models/colorModel';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-update-color',
  templateUrl: './update-color.component.html',
  styleUrls: ['./update-color.component.css']
})
export class UpdateColorComponent implements OnInit {

  color: ColorModel;
  colorUpdateForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["colorId"]) {
        this.createColorUpdateForm();
        this.getCurrentColor(params["colorId"]);
      }
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: ["", Validators.required],
      colorName: ["", Validators.required]
    });
  }

  getCurrentColor(colorId: number) {
    this.colorService.getById(colorId).subscribe(response => {
      this.color = response.data;
      this.colorUpdateForm.get('colorId')?.setValue(this.color.Id);
      this.colorUpdateForm.get('colorName')?.setValue(this.color.Name);
    })
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(response => {
        this.toastrService.success("Renk başarıyla güncellendi.");
        this.router.navigate(['/']);
        this.toastrService.info("Ana sayfaya yönlendiriliyorsunuz.");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(element.ErrorMessage, "Renk güncellenemedi!");
          }
        }
      });
    } else {
      this.toastrService.warning("Formu eksiksiz doldurmalısınız.");
    }
  }

}
