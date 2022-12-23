import { Fragment, useEffect, useState } from 'react';

import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { TariffDTO } from '../../interfaces/tariff/tariffinterfaces';
import { FeesModelProxy } from '../../models/FeesModelProxy';

const BuySubscriptionView = () => {
  const [tariffList, setTariffList] = useState<TariffDTO[]>(new Array<TariffDTO>());
  const [selectedTariff, setSelectedTariff] = useState<TariffDTO | undefined>(undefined);

  const handleRoadSelected = (item: string | null) => {
    if (item !== null) {
      const tl = tariffList.find((tl) => tl.id!.toString() === item);

      console.log('Selected tariff:');
      console.log(tl);

      setSelectedTariff(tl);
    }
  };

  useEffect(() => {
    const proxy = new FeesModelProxy();

    async function fetchFromApi() {
      setTariffList(await proxy.getSubscriptionTariffList());
    }

    fetchFromApi();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>Wybierz drogę, aby kupić abonament zgodnie z jej taryfikatorem</h1>
      <DropdownButton
        style={{ marginTop: '20px' }}
        variant={'info'}
        title={'Droga'}
        onSelect={(item) => handleRoadSelected(item)}
      >
        {tariffList.map((tl) => {
          return (
            <Dropdown.Item key={tl.id} eventKey={tl.id}>
              {tl.roadIds.join(',')}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>

      {selectedTariff !== undefined && (
        <Form className='d-flex justify-content-center' style={{ margin: '30px' }}>
          <Fragment key={selectedTariff.id}>
            <table>
              <thead>
                <tr>
                  <th>Kategoria samochodu</th>
                  <th>Cena za kilometr</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <label>Motocykl</label>
                  </td>
                  <td>
                    <input
                      name='MOTORBIKE'
                      disabled={true}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('MOTORBIKE')}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Samochód osobowy</label>
                  </td>
                  <td>
                    <input
                      name='PASSENGER_CAR'
                      disabled={true}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('PASSENGER_CAR')}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Autobus</label>
                  </td>
                  <td>
                    <input
                      name='BUS'
                      disabled={true}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('BUS')}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Pojazd ciężarowy</label>
                  </td>
                  <td>
                    <input
                      name='TRUCK'
                      disabled={true}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('TRUCK')}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>Abonamenty</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Abonament: Motocykl</label>
                  </td>
                  <td>
                    <input
                      name='SUB-MOTORBIKE'
                      disabled={true}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('MOTORBIKE')}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Abonament: Samochód osobowy</label>
                  </td>
                  <td>
                    <input
                      name='SUB-PASSENGER_CAR'
                      disabled={true}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('PASSENGER_CAR')}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Abonament: Autobus</label>
                  </td>
                  <td>
                    <input
                      name='SUB-BUS'
                      disabled={true}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('BUS')}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Abonament: Pojazd ciężarowy</label>
                  </td>
                  <td>
                    <input
                      name='SUB-TRUCK'
                      disabled={true}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('TRUCK')}
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>
          </Fragment>
        </Form>
      )}

      <div className='d-flex justify-content-center'>
        <Form style={{ width: '50%' }}>
          <Form.Group controlId='months'>
            <Form.Label>Podaj liczbę miesięcy:</Form.Label>
            <Form.Control type='number' step={1} min={1} required />
          </Form.Group>
          <Button type='submit'>Kup Abonament</Button>
        </Form>
      </div>
    </div>
  );
};

export default BuySubscriptionView;
