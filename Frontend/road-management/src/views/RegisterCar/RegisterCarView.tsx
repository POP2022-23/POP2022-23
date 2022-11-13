import React, { useState } from 'react';
import CarsList from './CarsList';
import RegisterCarForm from './RegisterCarForm';

interface IRegisterCarWindow {
  clickOnAddNewCarButton: (result: boolean) => void;
}

interface ICarRegister {
  checkNewCar: (registrationNumber: string, vin: string) => void;
}

const RegisterCarView = () => {
  const [infoMessage, setInfoMessage] = useState('');

  const getCarFromCEPIK = async (registrationNumber: string, vin: string) => {
    const server = 'http://localhost:8080/car';
    const registerNumberExample = 'ZS 844WV';
    const vinExample = '3VWLL7AJ9BM053541';

    try {
      const response = await fetch(server, {
        method: 'POST',
        body: JSON.stringify({
          ownerId: '2',
          registrationNumber: registrationNumber,
          vin: vin,
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
  };

  // Kontrola danego widoku
  class RegisterCarDispatcher implements IRegisterCarWindow {
    clickOnAddNewCarButton(result: boolean): void {
      setInfoMessage(`${result ? `Udało się zarejestrować pojazd!` : 'Nie udało się zarejestrować pojazdu!'}`);
    }
  }

  const registerCarDispatcher = new RegisterCarDispatcher();

  // Logika
  class RegisterCarPresenter implements ICarRegister {
    async checkNewCar(registrationNumber: string, vin: string): Promise<any> {
      const result = await getCarFromCEPIK(registrationNumber, vin);
      registerCarDispatcher.clickOnAddNewCarButton(result);
    }
  }

  const registerCarPresenter = new RegisterCarPresenter();

  return (
    <div>
      <RegisterCarForm checkNewCar={registerCarPresenter.checkNewCar} />
      <p>{infoMessage}</p>
      <CarsList />
    </div>
  );
};

export default RegisterCarView;
