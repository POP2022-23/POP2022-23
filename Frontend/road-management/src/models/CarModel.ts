import { AddCarDTO } from '../interfaces/car/carInterfaces';

interface IMapModel {
  saveCar: (data: AddCarDTO) => Promise<boolean>;
}

export class CarModel implements IMapModel {
  async saveCar(carData: AddCarDTO) {
    const server = 'http://localhost:8080/car';
    const registerNumberExample = 'ZS 844WV';
    const vinExample = '3VWLL7AJ9BM053541';

    try {
      const response = await fetch(server, {
        method: 'POST',
        body: JSON.stringify({
          ownerId: carData.ownerId,
          registrationNumber: carData.registrationNumber,
          vin: carData.vin,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return null;
    }
  }
}
