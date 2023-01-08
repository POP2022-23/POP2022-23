import { Fragment, useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { ITariffPresenter, ITariffView, TariffDTO } from '../../interfaces/tariff/tariffinterfaces';
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

  class TariffDispatcher implements ITariffView {
    showStatusMessage(result: boolean): void {
      setInfoMessage(`${result ? `Udała się akcja!` : 'Nie udała się akcja!'}`);
    }
  }

  const tariffDispatcher = new TariffDispatcher();

  class TariffPresenter implements ITariffPresenter {
    handleUpdateFormChange = async (event: any) => {
      event.preventDefault();

      const fieldName: string = event.target.getAttribute('name');
      const fieldValue = event.target.value;

      if (selectedTariff !== undefined) {
        const tariffProxy = new TariffModelProxy();

        const updatedTariff: TariffDTO = { ...selectedTariff };

        if (fieldName.includes('SUB')) {
          const roadPassRates = updatedTariff!.roadPassRates;
          roadPassRates[fieldName.slice(4)] = +fieldValue;
          updatedTariff.roadPassRates = new Map(Object.entries(roadPassRates));

          updatedTariff.transitRates = new Map(Object.entries(selectedTariff.transitRates));
        } else {
          const transitRates = updatedTariff!.transitRates;
          transitRates[fieldName] = +fieldValue;
          updatedTariff.transitRates = new Map(Object.entries(transitRates));

          updatedTariff.roadPassRates = new Map(Object.entries(selectedTariff.roadPassRates));
        }

        console.log('updatedTariff');
        console.log(updatedTariff);

        let proxyResponse = await tariffProxy.updateTariff(updatedTariff);
        tariffDispatcher.showStatusMessage(proxyResponse);
      }
    };

    handleAddFormDataSubmit = async (event: any) => {
      event.preventDefault();
      console.log(event);
      const id = Math.floor(Math.random() * (1000 - 0 + 1) + 0);

      const transitRates = new Map([
        ['BUS', +event.target[0].value],
        ['MOTORBIKE', +event.target[1].value],
        ['PASSENGER_CAR', +event.target[2].value],
        ['TRUCK', +event.target[3].value],
      ]);

      const roadPassRates = new Map([
        ['BUS', +event.target[4].value],
        ['MOTORBIKE', +event.target[5].value],
        ['PASSENGER_CAR', +event.target[6].value],
        ['TRUCK', +event.target[7].value],
      ]);

      const newTariff = {
        id: id,
        isValid: true,
        name: 'tarriff' + id,
        transitRates: transitRates,
        roadPassRates: roadPassRates,
        roadIds: event.target[8].value.split(',').map((el: string) => +el),
      };

      console.log('newTariff');
      console.log(newTariff);

      const tariffProxy = new TariffModelProxy();

      let proxyResponse = await tariffProxy.saveTariffData(newTariff);

      tariffDispatcher.showStatusMessage(proxyResponse);

      // const newTariffs = [...tariffList, newTariff];
      // setTariffList(newTariffs);
    };

    handleRoadSelected = (item: string | null) => {
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
        onSelect={tariffPresenter.handleRoadSelected}
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
          checked={editing}
          style={{ marginRight: '35px' }}
          type='checkbox'
          label={`Edytuj`}
          onChange={() => {
            setEditing((currentEditing) => !currentEditing);
            setAdding(false);
          }}
        />

        <Form.Check
          reverse
          checked={adding}
          style={{ marginRight: '35px' }}
          type='checkbox'
          label={`Dodawaj`}
          onChange={() => {
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
                      defaultValue={new Map(Object.entries(selectedTariff!.transitRates)).get('MOTORBIKE')}
                      onChange={tariffPresenter.handleUpdateFormChange}
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
                      defaultValue={new Map(Object.entries(selectedTariff!.transitRates)).get('PASSENGER_CAR')}
                      onChange={tariffPresenter.handleUpdateFormChange}
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
                      defaultValue={new Map(Object.entries(selectedTariff!.transitRates)).get('BUS')}
                      onChange={tariffPresenter.handleUpdateFormChange}
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
                      defaultValue={new Map(Object.entries(selectedTariff!.transitRates)).get('TRUCK')}
                      onChange={tariffPresenter.handleUpdateFormChange}
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
                      disabled={!editingField}
                      defaultValue={new Map(Object.entries(selectedTariff!.roadPassRates)).get('MOTORBIKE')}
                      onChange={tariffPresenter.handleUpdateFormChange}
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
                      disabled={!editingField}
                      defaultValue={new Map(Object.entries(selectedTariff!.roadPassRates)).get('PASSENGER_CAR')}
                      onChange={tariffPresenter.handleUpdateFormChange}
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
                      disabled={!editingField}
                      defaultValue={new Map(Object.entries(selectedTariff!.roadPassRates)).get('BUS')}
                      onChange={tariffPresenter.handleUpdateFormChange}
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
                      disabled={!editingField}
                      defaultValue={new Map(Object.entries(selectedTariff!.roadPassRates)).get('TRUCK')}
                      onChange={tariffPresenter.handleUpdateFormChange}
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
          onSubmit={tariffPresenter.handleAddFormDataSubmit}
        >
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
                  <input name='SUB-MOTORBIKE'></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Abonament: Samochód osobowy</label>
                </td>
                <td>
                  <input name='SUB-PASSENGER_CAR'></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Abonament: Autobus</label>
                </td>
                <td>
                  <input name='BUS'></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Abonament: Pojazd ciężarowy</label>
                </td>
                <td>
                  <input name='TRUCK'></input>
                </td>
              </tr>
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
