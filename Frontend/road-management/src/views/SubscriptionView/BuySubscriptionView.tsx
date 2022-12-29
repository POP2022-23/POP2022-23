import { Fragment, useEffect, useRef, useState } from 'react';

import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { IFees, IFeesWindow } from '../../interfaces/fees/feesinterfaces';
import { TariffDTO } from '../../interfaces/tariff/tariffinterfaces';
import { FeesModelProxy } from '../../models/FeesModelProxy';

const BuySubscriptionView = () => {
  const [tariffList, setTariffList] = useState<TariffDTO[]>(new Array<TariffDTO>());
  const [selectedTariff, setSelectedTariff] = useState<TariffDTO | undefined>(undefined);

  const [payment, setPayment] = useState<{
    subTariffId: number;
    monthAmount: number;
    driverId: string;
    paymentType: string;
  } | null>(null);

  const monthsRef = useRef<any>(null);

  const [infoMessage, setInfoMessage] = useState('');

  const [windowToShow, setWindowToShow] = useState<'subscription' | 'choosePayment' | 'paymentResult'>('subscription');

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

  class FeesDispatcher implements IFeesWindow {
    showMessageAboutUncorrectData(): void {
      setInfoMessage('Dane są niepoprawne.');
    }

    launchFeeDetailsWindow(): void {}

    launchMenuWindow(): void {}

    launchPaidFeesListWindow(): void {}

    launchSubscriptionPayWindow(): void {}

    launchUnpaidFeesListWindow(): void {}

    openFeeDetailsWindow(): void {}

    showFailedWindow(): void {
      setInfoMessage('Nie udało się zakupić abonamentu.');
    }

    showPaymentTypeWindow(): void {
      setWindowToShow('choosePayment');
    }

    showRedirectPaymentLoadingWindow(): void {
      setWindowToShow('paymentResult');
    }

    showSuccessfulWindow(): void {
      setInfoMessage('Abonament został poprawnie zakupiony');
    }
  }

  class FeesPresenter implements IFees {
    feesDispatcher;

    constructor(feesDispatcher: FeesDispatcher) {
      this.feesDispatcher = feesDispatcher;
    }

    openMenuWindow(): void {}
    openPaidFeesListWindow(): void {}

    openRedirectRidePaymentWindow(): void {}

    openRedirectSubscriptionPaymentWindow(paymentType: number): void {
      setPayment((prevState: any) => {
        return {
          ...prevState,
          paymentType,
        };
      });
      this.feesDispatcher.showRedirectPaymentLoadingWindow();
    }

    openSubscriptionPaymentWindow(subTariffId: number, monthAmount: number, driverId: string): void {
      setPayment((prevState: any) => {
        return {
          ...prevState,
          subTariffId,
          monthAmount,
          driverId,
        };
      });
      this.feesDispatcher.showPaymentTypeWindow();
    }

    openUnpaidFeesListWindow(): void {}
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const feesDispatcher = new FeesDispatcher();

    if (!selectedTariff) {
      feesDispatcher.showMessageAboutUncorrectData();
      return;
    }

    const feesPresenter = new FeesPresenter(feesDispatcher);

    feesPresenter.openSubscriptionPaymentWindow(selectedTariff!.id || 0, monthsRef.current.value, '2');
  };

  // "Okienka" - dałem je tutaj aby łatwiej było zarządzać stanem
  const PaymentTypeWindow = () => {
    const [paymentOption, setPaymentOption] = useState(0);

    const paymentOptions = [
      { id: 0, name: 'karta' },
      { id: 1, name: 'blik' },
    ];

    const onPaymentSelect = (item: any) => {
      setPaymentOption(item);
    };

    const handleSubmit = () => {
      const feesDispatcher = new FeesDispatcher();
      const feesPresenter = new FeesPresenter(feesDispatcher);

      feesPresenter.openRedirectSubscriptionPaymentWindow(paymentOption);
    };

    return (
      <div>
        <DropdownButton
          id={'road-dropdown'}
          variant={'info'}
          title={'Wybierz opcję płatności'}
          onSelect={onPaymentSelect}
        >
          {paymentOptions.map((payment) => {
            return (
              <Dropdown.Item key={payment.id} eventKey={payment.id}>
                {payment.name}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <button onClick={handleSubmit}>Zapłać</button>
      </div>
    );
  };

  const SubscriptionPaymentWindow = () => {
    const makePayment = async () => {
      const proxy = new FeesModelProxy();

      const paymentData = payment;
      console.log(payment);

      const result = await proxy.redirectToSubscriptionPayment('...');
      setTimeout(() => {
        setWindowToShow('subscription');
      }, 1000);
    };

    useEffect(() => {
      makePayment();
    }, []);

    return <div>Udała się płatność / Nie udała się płatność</div>;
  };

  return (
    <>
      {windowToShow === 'subscription' && (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ textAlign: 'center' }}>Wybierz drogę, aby kupić abonament zgodnie z jej taryfikatorem</h1>

          {infoMessage && <p>{infoMessage}</p>}

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
            <Form style={{ width: '50%' }} onSubmit={handleSubmit}>
              <Form.Group controlId='months'>
                <Form.Label>Podaj liczbę miesięcy:</Form.Label>
                <Form.Control type='number' step={1} min={1} required ref={monthsRef} />
              </Form.Group>
              <Button type='submit'>Kup Abonament</Button>
            </Form>
          </div>
        </div>
      )}

      {windowToShow === 'choosePayment' && <PaymentTypeWindow />}
      {windowToShow === 'paymentResult' && <SubscriptionPaymentWindow />}
    </>
  );
};

export default BuySubscriptionView;
