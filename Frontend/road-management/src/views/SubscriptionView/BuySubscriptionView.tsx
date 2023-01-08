import { Fragment, useEffect, useRef, useState } from 'react';

import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { DriverDataDTO, IFees, IFeesWindow } from '../../interfaces/fees/feesinterfaces';
import { TariffDTO } from '../../interfaces/tariff/tariffinterfaces';
import { FeesModelProxy, SubscriptionPaymentRequest } from '../../models/FeesModelProxy';

const BuySubscriptionView = () => {
  const [tariffList, setTariffList] = useState<TariffDTO[]>(new Array<TariffDTO>());
  const [selectedTariff, setSelectedTariff] = useState<TariffDTO | undefined>(undefined);

  const [payment, setPayment] = useState<SubscriptionPaymentRequest | null>(null);

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

    launchSubscriptionPayWindow(): void {
      setWindowToShow('subscription');
      setInfoMessage('');
    }

    launchUnpaidFeesListWindow(): void {}

    openFeeDetailsWindow(feeId: number): void {}

    showFailedWindow(): void {
      setInfoMessage('Nie udało się zakupić abonamentu.');
    }

    showPaymentTypeWindow(): void {
      setWindowToShow('choosePayment');
      setInfoMessage('');
    }

    showRedirectPaymentLoadingWindow(): void {
      setWindowToShow('paymentResult');
      setInfoMessage('');
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

    openRedirectRidePaymentWindow(feeId: number, driverData: DriverDataDTO): void {}

    openRedirectSubscriptionPaymentWindow(paymentType: number): void {
      setPayment((prevState: any) => {
        return {
          ...prevState,
          paymentType,
        };
      });
      this.feesDispatcher.showRedirectPaymentLoadingWindow();
    }

    openSubscriptionPayWindow(): void {
      this.feesDispatcher.launchSubscriptionPayWindow();
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

    if (!selectedTariff || !payment?.vehicleType) {
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
      <div style={{ textAlign: 'center' }}>
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
        <Button onClick={handleSubmit}>Zapłać</Button>
      </div>
    );
  };

  const SubscriptionPaymentWindow = () => {
    const makePayment = async () => {
      const proxy = new FeesModelProxy();
      const feesDispatcher = new FeesDispatcher();
      const feesPresenter = new FeesPresenter(feesDispatcher);

      console.log(payment);

      const result = await proxy.redirectToSubscriptionPayment({
        subTariffId: +payment!.subTariffId,
        monthAmount: +payment!.monthAmount,
        driverId: +payment!.driverId,
        paymentType: +payment!.paymentType,
        vehicleType: payment!.vehicleType,
      });

      console.log(result);

      if (result) {
        feesDispatcher.showSuccessfulWindow();
      } else {
        feesDispatcher.showFailedWindow();
      }
    };

    useEffect(() => {
      makePayment();
    }, []);

    const handleGoBack = () => {
      const feesDispatcher = new FeesDispatcher();
      const feesPresenter = new FeesPresenter(feesDispatcher);

      feesPresenter.openSubscriptionPayWindow();
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <p>Płatność...</p>
        <Button onClick={handleGoBack}>Powrót do zakupu abonamentu</Button>
      </div>
    );
  };

  return (
    <div style={{ marginTop: '24px' }}>
      {infoMessage && <p style={{ textAlign: 'center' }}>{infoMessage}</p>}

      {windowToShow === 'subscription' && (
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
            <Fragment>
              <h2>Abonamenty - cena za miesiąc:</h2>
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
                          <label>Abonament: Motocykl</label>
                        </td>
                        <td>
                          <input
                            name='SUB-MOTORBIKE'
                            disabled={true}
                            defaultValue={new Map(Object.entries(selectedTariff!.roadPassRates)).get('MOTORBIKE')}
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
                            defaultValue={new Map(Object.entries(selectedTariff!.roadPassRates)).get('PASSENGER_CAR')}
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
                            defaultValue={new Map(Object.entries(selectedTariff!.roadPassRates)).get('BUS')}
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
                            defaultValue={new Map(Object.entries(selectedTariff!.roadPassRates)).get('TRUCK')}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Fragment>
              </Form>

              <DropdownButton
                style={{ marginTop: '20px' }}
                variant={'info'}
                title={'Rodzaj pojazdu'}
                onSelect={(item) => {
                  setPayment((prevState: any) => {
                    return {
                      ...prevState,
                      vehicleType: item,
                    };
                  });
                }}
              >
                {['MOTORBIKE', 'PASSENGER_CAR', 'TRUCK', 'BUS'].map((item) => {
                  return (
                    <Dropdown.Item key={item} eventKey={item}>
                      {item}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Fragment>
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
    </div>
  );
};

export default BuySubscriptionView;
