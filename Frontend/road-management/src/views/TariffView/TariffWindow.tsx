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
  const [addFormData, setAddFormData] = useState<TariffDTO | undefined>(undefined);
  const [editFormData, setEditFormData] = useState<TariffDTO | undefined>(undefined);
  const [infoMessage, setInfoMessage] = useState('');
  const [tariffList, setTariffList] = useState<TariffDTO[]>(new Array<TariffDTO>());
  const [selectedTariff, setSelectedTariff] = useState<TariffDTO | undefined>(undefined);
  const [newSelectedTariff, setNewSelectedTariff] = useState<TariffDTO | undefined>(undefined);

  useEffect(() => {
    const proxy = new TariffModelProxy();
    async function fetchFromApi() {
      setTariffList(await proxy.getTariffList());
    }
    fetchFromApi();
  }, []);

  class TariffDispatcher implements ITariffWindow {
    showStatusMessage(result: boolean): void {
      setInfoMessage(`${result ? `Udało się dodać taryfikator!` : 'Nie udało się dodać taryfikatora!'}`);
    }
  }

  const tariffDispatcher = new TariffDispatcher();

  class TariffPresenter implements ITariff {
    onAddFormChanged = (event: any) => {
      // event.preventDefault();
      // const fieldName = event.target.getAttribute('name');
      // const fieldValue = event.target.value;
      // const newFormData = { ...addFormData };
      // newFormData[fieldName] = fieldValue;
      // if (selectedTariff !== undefined) {
      //   new Map(Object.entries(selectedTariff!.rates)).set(fieldName, fieldValue);
      //   setNewSelectedTariff(selectedTariff);
      // }
    };

    sendTariffChangeDataToSave = async (event: any) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute('name');
      const fieldValue = event.target.value;

      if (selectedTariff !== undefined) {
        const tariffProxy = new TariffModelProxy();

        selectedTariff.rates = new Map(Object.entries(selectedTariff!.rates)).set(fieldName, +fieldValue);
        console.log(selectedTariff.rates);

        let proxyResponse = await tariffProxy.updateTariff(selectedTariff);
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

      const newtariff = {
        id: id,
        isValid: true,
        name: 'tarriff' + id,
        rates: rates,
        roadIds: event.target[8].value.split(',').map((el: string) => +el),
      };

      const tariffProxy = new TariffModelProxy();
      let proxyResponse = await tariffProxy.saveTariffdData(newtariff);
      tariffDispatcher.showStatusMessage(proxyResponse);

      const newtariffs = [...tariffList, newtariff];
      setTariffList(newtariffs);
    };

    onRoadIdSelected = (item: string | null) => {
      if (item !== null) {
        const tl = tariffList.find((tl) => tl.id!.toString() === item);
        console.log(tl);
        tl!.isValid = true;
        setSelectedTariff(tl);
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
          onClick={() => setEditing(!editing)}
        />

        <Form.Check
          reverse
          style={{ marginRight: '35px' }}
          type='checkbox'
          label={`Dodawaj`}
          onClick={() => setAdding((currentAdding) => !currentAdding)}
        />
      </Form>
      {editing && (
        <>
          <Button onClick={() => setEditingField(!editingField)}>Rozpocznij/Zakończ edycję</Button>
        </>
      )}
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
                    <input
                      disabled={true}
                      defaultValue='Motocykl'
                      onChange={tariffPresenter.sendTariffChangeDataToSave}
                    ></input>
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
                    <input
                      disabled={true}
                      defaultValue='Samochód osobowy'
                      onChange={tariffPresenter.sendTariffChangeDataToSave}
                    ></input>
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
                    <input
                      disabled={true}
                      defaultValue='Autobus'
                      onChange={tariffPresenter.sendTariffChangeDataToSave}
                    ></input>
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
                    <input
                      disabled={true}
                      defaultValue='Pojazd ciężarowy'
                      onChange={tariffPresenter.sendTariffChangeDataToSave}
                    ></input>
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
                    <input disabled={true} defaultValue='Motocykl'></input>
                  </td>
                  <td>
                    <input name='MOTORBIKE'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input disabled={true} defaultValue='Samochód osobowy'></input>
                  </td>
                  <td>
                    <input name='PASSENGER_CAR'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input disabled={true} defaultValue='Autobus'></input>
                  </td>
                  <td>
                    <input name='BUS'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input disabled={true} defaultValue='Pojazd ciężarowy'></input>
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
