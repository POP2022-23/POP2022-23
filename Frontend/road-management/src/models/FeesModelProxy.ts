import {TariffDTO} from '../interfaces/tariff/tariffinterfaces';
import {FeesDTO} from "../interfaces/fees/feesinterfaces";

export interface IFeesModel {
  getPaidFeesList: (userId: string) => Promise<Array<FeesDTO> | null>;
  getSubscriptionTariffList: () => Promise<Array<TariffDTO> | null>;

  getUnpaidFeesList: (userId: string) => void;

  redirectToRidePayment: () => void;

  redirectToSubscriptionPayment: (
    subTariffId: number,
    monthAmount: number,
    driverId: string,
    paymentType: number
  ) => Promise<Boolean>;
}

export class FeesModelProxy implements IFeesModel {
  private serverUrl = "http://localhost:8080/";

  async getPaidFeesList(userId: string): Promise<Array<FeesDTO> | null> {
    const requestUrl = this.serverUrl + `fees/${userId}/paid`;

    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return null;
      }

      const jsonResponse = await response.json();
      return jsonResponse as Array<FeesDTO>;
    } catch (error: any) {
      return null;
    }
  }

  private async getTariffListFromServer(): Promise<Array<TariffDTO> | null> {
    const requestUrl = 'http://localhost:8080/tariff';

    try {
      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse as Array<TariffDTO>;
    } catch (error: any) {
      return null;
    }
  }

  async getSubscriptionTariffList(): Promise<Array<TariffDTO>> {
    const tariffList = await this.getTariffListFromServer();

    if (tariffList === null) {
      return new Array<TariffDTO>();
    }

    return tariffList.map((item) => {
      const tariffDTO = {
        id: item.id,
        isValid: item.isValid,
        name: item.name,
        rates: item.rates,
        roadIds: item.roadIds,
      };
      return tariffDTO;
    });
  }

  getUnpaidFeesList(userId: string) {
  }

  redirectToRidePayment() {
  }

  // to do
  async redirectToSubscriptionPayment(subTariffId: number, monthAmount: number, driverId: string, paymentType: number) {
    console.log('redirectToSubscriptionPayment');
    console.log(subTariffId, monthAmount, driverId, paymentType);
    if (paymentType === 0) {
      return true;
    } else {
      return false;
    }
  }
}
