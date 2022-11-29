import React, { useState } from 'react';
import CarsList from './CarsList';
import RegisterCarForm from './RegisterCarForm';
import { IRegisterCarWindow, ICarRegister, AddCarDTO } from '../../interfaces/car/carInterfaces';
import { CarModelProxy } from '../../models/CarModelProxy';

const RegisterCarView = () => {
  const [infoMessage, setInfoMessage] = useState('');

  class RegisterCarDispatcher implements IRegisterCarWindow {
    showStatusMessage(result: boolean): void {
      setInfoMessage(`${result ? `Udało się zarejestrować pojazd!` : 'Nie udało się zarejestrować pojazdu!'}`);
    }
  }

  const registerCarDispatcher = new RegisterCarDispatcher();
  const carModel = new CarModelProxy();

  class RegisterCarPresenter implements ICarRegister {
    async addNewCar(carData: AddCarDTO): Promise<any> {
      const result = await carModel.saveCar(carData);
      console.log(result);
      registerCarDispatcher.showStatusMessage(result);
    }
  }

  const registerCarPresenter = new RegisterCarPresenter();

  return (
    <div>
      <RegisterCarForm checkNewCar={registerCarPresenter.addNewCar} />
      <p>{infoMessage}</p>
      <CarsList />
    </div>
  );
};

export default RegisterCarView;
