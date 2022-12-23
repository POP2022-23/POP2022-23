import { useState } from 'react';

import { Dropdown, DropdownButton } from 'react-bootstrap';
import { TariffDTO } from '../../interfaces/tariff/tariffinterfaces';

const BuySubscriptionView = () => {
  const [tariffList, setTariffList] = useState<TariffDTO[]>(new Array<TariffDTO>());

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>Taryfikator</h1>
      <DropdownButton
        style={{ marginTop: '20px' }}
        variant={'info'}
        title={'Droga'}
        onSelect={() => console.log('test')}
      >
        {tariffList.map((tl) => {
          return (
            <Dropdown.Item key={tl.id} eventKey={tl.id}>
              {tl.roadIds.join(',')}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
};

export default BuySubscriptionView;
