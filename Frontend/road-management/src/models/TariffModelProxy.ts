import { TariffDTO } from '../interfaces/tariff/tariffinterfaces';

interface ITariffModel {
  getTariffList: () => Promise<Array<TariffDTO>>;
  saveTariffData: (tariff: TariffDTO) => Promise<boolean>;
  updateTariff: (tariff: TariffDTO) => Promise<boolean>;
}

export class TariffModelProxy implements ITariffModel {
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
      console.log(jsonResponse); // valid instead of isValid?
      return jsonResponse as Array<TariffDTO>;
    } catch (error: any) {
      return null;
    }
  }

  async getTariffList(): Promise<Array<TariffDTO>> {
    const tariffList = await this.getTariffListFromServer();

    if (tariffList === null) {
      return new Array<TariffDTO>();
    }

    return tariffList.map((item) => {
      const tariffDTO = {
        id: item.id,
        isValid: item.isValid,
        name: item.name,
        transitRates: item.transitRates,
        roadPassRates: item.roadPassRates, // road_pass_rates - abonament
        roadIds: item.roadIds,
      };
      return tariffDTO;
    });
  }

  async saveTariffData(tariff: TariffDTO) {
    const requestUrl = 'http://localhost:8080/tariff';

    const tariffTransformed = {
      ...tariff,
      transitRates: Object.fromEntries(tariff.transitRates),
      roadPassRates: Object.fromEntries(tariff.roadPassRates),
    };

    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tariffTransformed),
      });

      console.log(response);
      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      return false;
    }
  }

  async updateTariff(tariff: TariffDTO): Promise<boolean> {
    const requestUrl = 'http://localhost:8080/tariff';

    const tariffTransformed = {
      ...tariff,
      transitRates: Object.fromEntries(tariff.transitRates),
      roadPassRates: Object.fromEntries(tariff.roadPassRates),
    };

    console.log(JSON.stringify(tariffTransformed));

    try {
      const response = await fetch(requestUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tariffTransformed),
      });

      console.log(response);

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      return false;
    }
  }
}
