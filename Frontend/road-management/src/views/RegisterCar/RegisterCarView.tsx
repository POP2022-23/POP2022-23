import React, { useState } from 'react';
import CarsList from './CarsList';
import RegisterCarForm from './RegisterCarForm';
import { IRegisterCarWindow, ICarRegister, AddCarDTO } from '../../interfaces/car/carInterfaces';
import { CarModel } from '../../models/CarModel';

const RegisterCarView = () => {
  const carModel = new CarModel();
  const [infoMessage, setInfoMessage] = useState('');

  class RegisterCarDispatcher implements IRegisterCarWindow {
    clickOnAddNewCarButton(result: boolean): void {
      setInfoMessage(`${result ? `Udało się zarejestrować pojazd!` : 'Nie udało się zarejestrować pojazdu!'}`);
    }
  }

  const registerCarDispatcher = new RegisterCarDispatcher();

  class RegisterCarPresenter implements ICarRegister {
    async checkNewCar(carData: AddCarDTO): Promise<any> {
      const result = await carModel.saveCar(carData);
      console.log(result);
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
