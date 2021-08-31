import { Component, OnInit } from '@angular/core';
import { ColorModel } from 'src/app/models/colorModel';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors: ColorModel[] = [];
  dataLoaded = false;
  currentColor: ColorModel;
  filterText: string = "";

  constructor(
    private colorService: ColorService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getAll().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }

  setCurrentColor(color: ColorModel) {
    this.currentColor = color;
  }

  getCurrentColorClass(color: ColorModel) {
    if (color == this.currentColor) {
      return "list-group-item list-group-item-action list-group-item-info active";
    } else {
      return "list-group-item list-group-item-action list-group-item-info";
    }
  }

  getAllColorClass() {
    if (!this.currentColor) {
      return "list-group-item list-group-item-action list-group-item-success active";
    } else {
      return "list-group-item list-group-item-action list-group-item-success";
    }
  }

}
