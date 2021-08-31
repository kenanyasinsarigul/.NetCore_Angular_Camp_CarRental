import { Pipe, PipeTransform } from '@angular/core';
import { BrandModel } from '../models/brandModel';

@Pipe({
  name: 'filterBrand'
})
export class FilterBrandPipe implements PipeTransform {

  transform(value: BrandModel[], filterText: string): BrandModel[] {
    filterText=filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((b:BrandModel)=>b.Name.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
