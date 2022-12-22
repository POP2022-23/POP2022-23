import { useState } from 'react';
import { AddCarDTO, ICarRegister, IRegisterCarWindow } from '../../interfaces/car/carInterfaces';
import { CarModelProxy } from '../../models/CarModelProxy';
import RegisterCarForm from './RegisterCarForm';

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
      {/* <CarsList /> */}
    </div>
  );
};

export default RegisterCarView;
