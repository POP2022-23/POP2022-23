import React, { useState, useEffect, useCallback } from 'react';

const CarsList = () => {
  const [cars, setCars] = useState([]);

  const getUserCars = async () => {
    const userId = 2;
    const server = `http://localhost:8080/car/${userId}`;

    try {
      const response = await fetch(server);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      setCars(data);
      return data;
    } catch (error: any) {
      return null;
    }
  };

  useEffect(() => {
    getUserCars();
  }, []);

  return (
    <div>
      <button onClick={getUserCars}>Pokaż listę pojazdów</button>
      <br />
      {JSON.stringify(cars, null, 2)}
    </div>
  );
};

export default CarsList;
