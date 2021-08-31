import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailModel } from 'src/app/models/carDetailModel';
import { CarImageModel } from 'src/app/models/carImageModel';
import { AuthService } from 'src/app/services/auth.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: CarDetailModel[] = [];
  carImages: CarImageModel[] = [];
  dataLoaded = false;
  currentCar: CarDetailModel;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private toastrService: ToastrService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsByColorAndBrand(params['brandId'], params['colorId']);
      }
      else if (params['colorId']) {
        this.getCarsByColor(params["colorId"]);
      } else if (params['brandId']) {
        this.getCarsByBrand(params["brandId"]);
      }
      else {
        this.getCars();
      }
    })
  }

  setCoverImage(carList: CarDetailModel[]) {
    carList.forEach(item => {
      this.carImageService.getByCarId(item.Id).subscribe(response => {
        item.imagePath = "http://localhost:4200/" + response.data[0].imagePath;
      })
    })
  }

  getCars() {
    this.carService.getAllDetail().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.setCoverImage(this.cars);
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getByBrandId(brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.setCoverImage(this.cars);
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getByColor(colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.setCoverImage(this.cars);
    })
  }

  getCarImages() {
    this.carImageService.getAll().subscribe(response => {
      this.carImages = response.data;
    })
  }

  getCarsByColorAndBrand(brandId: number, colorId: number) {
    this.carService.getByColorAndBrand(brandId, colorId).subscribe(response => {
      this.cars = response.data;
      this.setCoverImage(this.cars);
      this.dataLoaded = true;
      if (this.cars.length == 0) {
        this.toastrService.warning("Bu değerlere sahip bir araç bulunmuyor.", "Hata");
      }
    })
  }

  setCurrentCar(car: CarDetailModel) {
    this.currentCar = car;
  }

}
