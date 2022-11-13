import React, { useRef } from 'react';

const RegisterCarForm: React.FC<{ checkNewCar: (registrationNumber: string, vin: string) => void }> = (props) => {
  const registrationNumberRef = useRef<HTMLInputElement>(null);
  const vinRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const registrationNumber = registrationNumberRef.current!.value;
    const vin = vinRef.current!.value;
    props.checkNewCar(registrationNumber, vin);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor='registrationNumber'>Podaj numer rejestracji: </label>
      <input type='text' id='registrationNumber' required ref={registrationNumberRef} />

      <label htmlFor='vin'>Podaj numer VIN: </label>
      <input type='text' id='vin' required ref={vinRef} />
      <button>Zarejestruj nowy pojazd</button>
    </form>
  );
};

export default RegisterCarForm;
