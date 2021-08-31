export interface CarDetailModel {
    Id: number;
    description: string;
    brandName: string;
    brandId: number;
    colorName: string;
    colorId: number;
    dailyPrice: number;
    modelYear: number;
    imagePath: string;
    findexScore?: number;
}