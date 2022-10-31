import React, { useState } from 'react';
import RegisterCarForm from './RegisterCarForm';

interface IRegisterCarWindow {
  clickOnAddNewCarButton: (result: boolean) => void;
}

interface ICarRegister {
  checkNewCar: (id: string) => void;
}

const RegisterCarView = () => {
  const [infoMessage, setInfoMessage] = useState('');

  // Kontrola danego widoku
  class RegisterCarDispatcher implements IRegisterCarWindow {
    clickOnAddNewCarButton(result: boolean): void {
      console.log('Kliknięto na zarejestruj nowy pojazd - zmień dany widok w zależności.');

      setInfoMessage(`${result ? 'Udało się!' : 'Nie udało się!'}`);
    }
  }

  const registerCarDispatcher = new RegisterCarDispatcher();

  // Logika
  class RegisterCarPresenter implements ICarRegister {
    checkNewCar(id: string): void {
      console.log('checkNewCar: ', id);

      // Kontakt z API
      const result = true;

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
