export interface PaymentModel{
    id?:number;
    userId:number;
    carId:number;
    processDate?:Date;
    totalAmount:number;
}