import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandModel } from 'src/app/models/brandModel';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit {

  brandUpdateForm: FormGroup;
  brand: BrandModel;

  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["Id"]) {
        this.createBrandUpdateForm();
        this.getCurrentBrand(params["Id"]);
      }
    });
  }

  getCurrentBrand(brandId: number){
    this.brandService.getById(brandId).subscribe(response =>{
      this.brand = response.data;
      this.brandUpdateForm.get('Id')?.setValue(this.brand.Id);
      this.brandUpdateForm.get('Name')?.setValue(this.brand.Name);
    });
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      Id: ["", Validators.required],
      Name: ["", Validators.required]
    });
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(response => {
        this.toastrService.success("Marka başarıyla güncellendi.");
        this.router.navigate(['/']);
        this.toastrService.info("Ana sayfaya yönlendiriliyorsunuz.");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(element.ErrorMessage, "Marka güncellenemedi!");
          }
        }
      });
    } else {
      this.toastrService.warning("Formu eksiksiz doldurmalısınız!");
    }
  }


}
