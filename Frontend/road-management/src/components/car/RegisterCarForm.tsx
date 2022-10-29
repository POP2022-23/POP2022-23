import React, { useRef } from 'react';

const RegisterCarForm: React.FC<{ checkNewCar: (carId: string) => void }> = (props) => {
  const carIdRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const carId = carIdRef.current!.value;
    props.checkNewCar(carId);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor='carId'>Podaj identyfikator techniczny twojego pojazdu: </label>
      <input type='text' id='carId' ref={carIdRef} />
      <button>Zarejestruj nowy pojazd</button>
    </form>
  );
};

export default RegisterCarForm;
