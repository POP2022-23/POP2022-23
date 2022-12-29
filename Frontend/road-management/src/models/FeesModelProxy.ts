import { TariffDTO } from '../interfaces/tariff/tariffinterfaces';

export interface IFeesModel {
  getPaidFeesList: () => void;
  getSubscriptionTariffList: () => void;
  getUnpaidFeesList: () => void;

  redirectToRidePayment: () => void;

  redirectToSubscriptionPayment: (test: string) => void;
}

export class FeesModelProxy implements IFeesModel {
  getPaidFeesList() {}

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

  getUnpaidFeesList() {}

  redirectToRidePayment() {}

  // to do
  redirectToSubscriptionPayment(test: string) {
    console.log('redirectToSubscriptionPayment');
    console.log(test);
  }
}
