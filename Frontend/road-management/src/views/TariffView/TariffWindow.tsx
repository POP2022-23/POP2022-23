import { Fragment, useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { ITariff, ITariffWindow, TariffDTO } from '../../interfaces/tariff/tariffinterfaces';
import { TariffModelProxy } from '../../models/TariffModelProxy';

const TariffWindow = () => {
  const [editing, setEditing] = useState(false);

  const [adding, setAdding] = useState(false);

  const [editingField, setEditingField] = useState(false);

  const [infoMessage, setInfoMessage] = useState('');

  const [tariffList, setTariffList] = useState<TariffDTO[]>(new Array<TariffDTO>());

  const [selectedTariff, setSelectedTariff] = useState<TariffDTO | undefined>(undefined);

  useEffect(() => {
    const proxy = new TariffModelProxy();

    async function fetchFromApi() {
      setTariffList(await proxy.getTariffList());
    }

    fetchFromApi();
  }, []);

  class TariffDispatcher implements ITariffWindow {
    showStatusMessage(result: boolean): void {
      setInfoMessage(`${result ? `Udała się akcja!` : 'Nie udała się akcja!'}`);
    }
  }

  const tariffDispatcher = new TariffDispatcher();

  class TariffPresenter implements ITariff {
    sendTariffChangeDataToSave = async (event: any) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute('name');
      const fieldValue = event.target.value;

      if (selectedTariff !== undefined) {
        const tariffProxy = new TariffModelProxy();

        const updatedTariff: TariffDTO = { ...selectedTariff };
        const rates = new Map(Object.entries(updatedTariff!.rates)).set(fieldName, +fieldValue);
        updatedTariff.rates = rates;

        console.log('updatedTariff');
        console.log(updatedTariff);
        let proxyResponse = await tariffProxy.updateTariff(updatedTariff);
        tariffDispatcher.showStatusMessage(proxyResponse);
      }
    };

    sendNewTariffDataToSave = async (event: any) => {
      event.preventDefault();
      console.log(event);
      const id = Math.floor(Math.random() * (1000 - 0 + 1) + 0);

      // Better would be using refs/useState
      const rates = new Map([
        [event.target[1].getAttribute('name'), +event.target[1].value],
        [event.target[3].getAttribute('name'), +event.target[3].value],
        [event.target[5].getAttribute('name'), +event.target[5].value],
        [event.target[7].getAttribute('name'), +event.target[7].value],
      ]);

      const newTariff = {
        id: id,
        isValid: true,
        name: 'tarriff' + id,
        rates: rates,
        roadIds: event.target[8].value.split(',').map((el: string) => +el),
      };

      console.log('newTariff');
      console.log(newTariff);

      const tariffProxy = new TariffModelProxy();
      let proxyResponse = await tariffProxy.saveTariffData(newTariff);
      tariffDispatcher.showStatusMessage(proxyResponse);

      const newTariffs = [...tariffList, newTariff];
      setTariffList(newTariffs);
    };

    onRoadIdSelected = (item: string | null) => {
      if (item !== null) {
        const tl = tariffList.find((tl) => tl.id!.toString() === item);

        console.log('Selected tariff:');
        console.log(tl);

        setSelectedTariff(tl);
        setEditing(false);
        setAdding(false);
      }
    };
  }

  const tariffPresenter = new TariffPresenter();

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>Taryfikator</h1>
      <DropdownButton
        style={{ marginTop: '20px' }}
        variant={'info'}
        title={'Droga'}
        onSelect={tariffPresenter.onRoadIdSelected}
      >
        {tariffList.map((tl) => {
          return (
            <Dropdown.Item key={tl.id} eventKey={tl.id}>
              {tl.roadIds.join(',')}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
      <Form>
        <Form.Check
          reverse
          style={{ marginRight: '35px' }}
          type='checkbox'
          label={`Edytuj`}
          onClick={() => {
            setEditing((currentEditing) => !currentEditing);
            setAdding(false);
          }}
        />

        <Form.Check
          reverse
          style={{ marginRight: '35px' }}
          type='checkbox'
          label={`Dodawaj`}
          onClick={() => {
            setAdding((currentAdding) => !currentAdding);
            setEditing(false);
          }}
        />
      </Form>
      {editing && (
        <>
          <Button onClick={() => setEditingField((currEditingField) => !currEditingField)}>
            Rozpocznij/Zakończ edycję
          </Button>
        </>
      )}

      <p>{infoMessage}</p>

      {selectedTariff !== undefined && !adding && (
        <Form className='d-flex justify-content-center' style={{ margin: '30px' }}>
          <table>
            <thead>
              <tr>
                <th>Kategoria samochodu</th>
                <th>Cena za kilometr</th>
              </tr>
            </thead>
            <tbody>
              <Fragment key={selectedTariff.id}>
                <tr>
                  <td>
                    <label>Motocykl</label>
                  </td>
                  <td>
                    <input
                      name='MOTORBIKE'
                      disabled={!editingField}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('MOTORBIKE')}
                      onChange={tariffPresenter.sendTariffChangeDataToSave}
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
                      disabled={!editingField}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('PASSENGER_CAR')}
                      onChange={tariffPresenter.sendTariffChangeDataToSave}
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
                      disabled={!editingField}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('BUS')}
                      onChange={tariffPresenter.sendTariffChangeDataToSave}
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
                      disabled={!editingField}
                      defaultValue={new Map(Object.entries(selectedTariff!.rates)).get('TRUCK')}
                      onChange={tariffPresenter.sendTariffChangeDataToSave}
                    ></input>
                  </td>
                </tr>
              </Fragment>
            </tbody>
          </table>
        </Form>
      )}

      {adding && (
        <Form
          className='d-flex justify-content-center'
          style={{ margin: '30px' }}
          onSubmit={tariffPresenter.sendNewTariffDataToSave}
        >
          <table>
            <thead>
              <tr>
                <th>Kategoria samochodu</th>
                <th>Cena za kilometr</th>
              </tr>
            </thead>
            <tbody>
              <Fragment>
                <tr>
                  <td>
                    <label>Motocykl</label>
                  </td>
                  <td>
                    <input name='MOTORBIKE'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Samochód osobowy</label>
                  </td>
                  <td>
                    <input name='PASSENGER_CAR'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Autobus</label>
                  </td>
                  <td>
                    <input name='BUS'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Pojazd ciężarowy</label>
                  </td>
                  <td>
                    <input name='TRUCK'></input>
                  </td>
                </tr>
              </Fragment>
            </tbody>
          </table>
          <input type='text' placeholder='Podaj id dróg po przecinku' />
          <button>Dodaj</button>
        </Form>
      )}
    </div>
  );
};

export default TariffWindow;
