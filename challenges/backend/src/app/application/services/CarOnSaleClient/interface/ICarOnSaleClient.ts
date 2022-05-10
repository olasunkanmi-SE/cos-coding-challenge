import { AxiosResponse } from "axios";
import { IAuctionResponseDTO } from "../../../dtos/auction.dto";
/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {
  getRunningAuctions(): Promise<AxiosResponse<IAuctionResponseDTO, any>>;
}
