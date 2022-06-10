export interface CreateProductOfInterestBody{
  productId:string;
  startPrice:number;
  endPrice:number;
  activateForThirdUsers:boolean;
}