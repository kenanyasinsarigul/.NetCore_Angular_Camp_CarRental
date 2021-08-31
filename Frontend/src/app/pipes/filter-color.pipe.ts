import { Pipe, PipeTransform } from '@angular/core';
import { ColorModel } from '../models/colorModel';

@Pipe({
  name: 'filterColor'
})
export class FilterColorPipe implements PipeTransform {

  transform(value: ColorModel[], filterText: string): ColorModel[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((c: ColorModel) => c.Name.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
