import {TariffDTO} from '../interfaces/tariff/tariffinterfaces';
import {FeesDTO, VehicleType} from "../interfaces/fees/feesinterfaces";

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
    const mockedResponse: Array<FeesDTO> = [
      {id: 1, vehicleType: VehicleType.PASSENGER_CAR, isPaid: true, amount: 100.00, date: new Date(2022, 12, 16), roadIds: [
        1, 2
        ], tariff: {
        id: 1,
          name: "Opłata za przejazd autostradą A1 oraz A4",
          isValid: true,
          roadIds: [1,2],
          rates: new Map([["PASSENGER_CAR", 1], ["BUS", 2]])
        }},
      {id: 2, vehicleType: VehicleType.BUS, isPaid: true, amount: 50.00, date: new Date(2022, 12, 23), roadIds: [
          1
        ], tariff: {
          id: 1,
          name: "Opłata za przejazd autostradą A1 oraz A4",
          isValid: true,
          roadIds: [1,2],
          rates: new Map([["PASSENGER_CAR", 1], ["BUS", 2]])
        }},
      {id: 3, vehicleType: VehicleType.PASSENGER_CAR, isPaid: true, amount: 150.00, date: new Date(2022, 12, 8), roadIds: [
          1, 2
        ], tariff: {
          id: 1,
          name: "Opłata za przejazd autostradą A1 oraz A4",
          isValid: true,
          roadIds: [1,2],
          rates: new Map([["PASSENGER_CAR", 1], ["BUS", 2]])
        }}
    ]
    
    return mockedResponse;
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
