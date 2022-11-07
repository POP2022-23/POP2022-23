import React, { useState } from 'react';
import RegisterCarForm from './RegisterCarForm';

type CarData = {
  registrationNumber: string;
  vin: string;
  engineCapacity: number;
  height: number;
  length: number;
  make: string;
  model: string;
  productionYear: number;
  carType: string;
  weight: number;
  width: number;
};

interface IRegisterCarWindow {
  clickOnAddNewCarButton: (result: boolean, carData: CarData) => void;
}

interface ICarRegister {
  checkNewCar: (registrationNumber: string, vin: string) => void;
}

const RegisterCarView = () => {
  const [infoMessage, setInfoMessage] = useState('');

  const getCarFromCEPIK = async (registrationNumber: string, vin: string) => {
    const server = 'http://localhost:8080/cepik';
    const registerNumberExample = 'NEL 98AM';
    const vinExample = '2HGES267X5H581074';

    try {
      const response = await fetch(`${server}?registration=${registrationNumber}&vin=${vin}`);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return null;
    }
  };

  // Kontrola danego widoku
  class RegisterCarDispatcher implements IRegisterCarWindow {
    clickOnAddNewCarButton(result: boolean, carData: CarData): void {
      setInfoMessage(
        `${
          result
            ? `Udało się zarejestrować pojazd o wadze: ${carData.weight} kg!`
            : 'Nie udało się zarejestrować pojazdu!'
        }`
      );
    }
  }

  const registerCarDispatcher = new RegisterCarDispatcher();

  // Logika
  class RegisterCarPresenter implements ICarRegister {
    async checkNewCar(registrationNumber: string, vin: string): Promise<any> {
      // Kontakt z Cepikiem
      const carData = await getCarFromCEPIK(registrationNumber, vin);

      // Kontakt z bazą danych
      let savedToDataBase;
      if (carData) {
        // fetch(POST, carData) - save car to our database
        savedToDataBase = true;
      } else {
        savedToDataBase = false;
      }

      registerCarDispatcher.clickOnAddNewCarButton(savedToDataBase, carData);
    }
  }

  const registerCarPresenter = new RegisterCarPresenter();

  return (
    <div>
      <RegisterCarForm checkNewCar={registerCarPresenter.checkNewCar} />
      <p>{infoMessage}</p>
    </div>
  );
};

export default RegisterCarView;
