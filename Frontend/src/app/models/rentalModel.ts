export interface RentalModel {
    id?: number;
    carId: number;
    customerId: number;
    rentDate?: any;
    returnDate?: any | null;
}