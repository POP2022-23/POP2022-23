import React, { useState } from 'react';
import RegisterCarForm from './RegisterCarForm';

const RegisterCarView = () => {
  const [infoMessage, setInfoMessage] = useState('');

  // Kontrola danego widoku
  interface IRegisterCarWindow {
    clickOnAddNewCarButton: (result: boolean) => void;
  }

  class RegisterCarDispatcher implements IRegisterCarWindow {
    clickOnAddNewCarButton(result: boolean): void {
      console.log('Kliknięto na zarejestruj nowy pojazd - zmień dany widok w zależności.');

      setInfoMessage(`${result ? 'Udało się!' : 'Nie udało się!'}`);
    }
  }

  const registerCarDispatcher = new RegisterCarDispatcher();

  // Logika
  interface ICarRegister {
    checkNewCar: (id: string) => void;
  }

  class RegisterCarPresenter implements ICarRegister {
    checkNewCar(id: string): void {
      console.log('checkNewCar: ', id);

      const result = true; // Udało się zarejestrować pojazd

      registerCarDispatcher.clickOnAddNewCarButton(result);
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
