import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailModel } from 'src/app/models/carDetailModel';
import { CarImageModel } from 'src/app/models/carImageModel';
import { FindexModel } from 'src/app/models/findexModel';
import { RentalDetailModel } from 'src/app/models/rentalDetailModel';
import { AuthService } from 'src/app/services/auth.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { FindexService } from 'src/app/services/findex.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-detail-car',
  templateUrl: './detail-car.component.html',
  styleUrls: ['./detail-car.component.css']
})
export class DetailCarComponent implements OnInit {

  cars: CarDetailModel[] = [];
  images: CarImageModel[] = [];
  rentalCar: RentalDetailModel;
  isRentBefore: Boolean = false;
  userFindexPoint: FindexModel;
  isLoggedIn: boolean = false;
  findexScoreLoaded: boolean = false;
  userFindexScoreNull: boolean = false;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private findexService: FindexService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.activatedRoute.params.subscribe(params => {
      if (this.isLoggedIn == true) {
        if (params["carId"]) {
          this.authService.userDetailFromToken();
          this.getCarByIdDetail(params["carId"]);
          this.getImagesByCarId(params["carId"]);
          this.getRentalByCarId(params["carId"]);
          this.findexScoreCheck();
        }
      } else {
        this.getCarByIdDetail(params["carId"]);
        this.getImagesByCarId(params["carId"]);
        this.getRentalByCarId(params["carId"]);
      }
    })
  }

  getCarByIdDetail(id: number) {
    this.carService.getByIdDetail(id).subscribe(response => {
      this.cars = response.data;
    })
  }

  getImagesByCarId(id: number) {
    this.carImageService.getByCarId(id).subscribe(response => {
      this.images = response.data;

    })
  }

  getRentalByCarId(id: number) {
    this.rentalService.getByCarId(id).subscribe(response => {
      if (response.data == null) {
        this.isRentBefore = false;
      } else {
        this.rentalCar = response.data;
        this.isRentBefore = true;
      }
    })
  }

  checkAvailability() {
    if (!this.isRentBefore) {
      this.toastrService.success("araç kiralanabilir", "Araç Boşta");
      return true;
    } else {
      return this.rentedBeforeCarCheck();
    }
  }

  rentedBeforeCarCheck() {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    let today = formatDate(now, 'yyyy/MM/dd', 'en');
    let oldDate = formatDate(this.rentalCar.returnDate, 'yyyy/MM/dd', 'en');

    if (this.rentalCar.returnDate == null) {
      this.toastrService.warning("Araç kullanımdadır ve dönüş tarihi henüz belli değildir.", "Hata");
      return false;
    } else if (oldDate > today) {
      this.toastrService.warning("Bu araç kullanımdadır. Tahmini dönüş zamanı " + oldDate, "Hata");
      return false;
    }
    else {
      this.toastrService.success("araç kiralanabilir", "Araç Boşta");
      return true;
    }
  }

  findexScoreCheck() {
    this.findexService.getByUserId(this.authService.userId).subscribe(response => {
      this.findexScoreLoaded = true;
      if (response.data === null || response.data === undefined) {
        this.userFindexScoreNull = true;
      } else {
        this.userFindexScoreNull = false;
        this.userFindexPoint = response.data;
      }
    })
  }

}
