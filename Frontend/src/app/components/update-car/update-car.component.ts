import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandModel } from 'src/app/models/brandModel';
import { CarModel } from 'src/app/models/carModel';
import { ColorModel } from 'src/app/models/colorModel';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  car: CarModel;
  carUpdateForm: FormGroup;
  colors: ColorModel[] = [];
  brands: BrandModel[] = [];
  selectedColor: number;
  selectedBrand: number;
  modelYearList: number[] = [];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private brandService: BrandService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.createUpdateForm();
        this.getCurrentCar(params["carId"]);
        this.getColors();
        this.getBrands();
        this.createModelYearArray();
      }
    });
  }

  get carFormControls() { return this.carUpdateForm.controls; }

  createUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: ["", Validators.required],
      colorId: ["", Validators.required],
      brandId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      findexScore: ["", Validators.required]
    });
  }

  createModelYearArray() {
    let currentYear: number = new Date().getFullYear();
    for (let i = currentYear + 1; i >= 1950; i--) {
      this.modelYearList.push(i);
    }
  }

  getColors() {
    this.colorService.getAll().subscribe(response => {
      this.colors = response.data;
    });
  }

  getBrands() {
    this.brandService.getAll().subscribe(response => {
      this.brands = response.data;
    });
  }

  getCurrentCar(carId: number) {
    this.carService.getById(carId).subscribe(response => {
      this.car = response.data;
      this.selectedBrand = this.car.brandId;
      this.selectedColor = this.car.colorId;
      this.carUpdateForm.get('colorId')?.setValue(this.selectedColor);
      this.carUpdateForm.get('brandId')?.setValue(this.selectedBrand);
      this.carUpdateForm.get('carId')?.setValue(this.car.Id);
      this.carUpdateForm.get('dailyPrice')?.setValue(this.car.dailyPrice);
      this.carUpdateForm.get('description')?.setValue(this.car.description);
      this.carUpdateForm.get('modelYear')?.setValue(this.car.modelYear);
      this.carUpdateForm.get('findexScore')?.setValue(this.car.findexScore);
    });
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      carModel.brandId = parseInt(carModel.brandId);
      carModel.colorId = parseInt(carModel.colorId);
      carModel.modelYear = parseInt(carModel.modelYear);
      this.carService.update(carModel).subscribe(response => {
        this.toastrService.success("Araba başarıyla güncellendi.");
        this.router.navigate(['/cars/']);
        this.toastrService.info("Arabalar sayfasına yönlendiriliyorsunuz.");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(element.ErrorMessage, "Araç Güncellenemedi");
          }
        }
      });
    } else {
      this.toastrService.warning("Formu eksiksiz doldurmalısınız.");
    }

  }

}
