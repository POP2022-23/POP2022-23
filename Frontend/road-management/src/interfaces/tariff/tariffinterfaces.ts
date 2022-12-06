export type TariffDTO = {
    id: number;
    category: string;
    price: number;
  };
  
  export interface ITariffWindow {
    showStatusMessage: (status: boolean) => void;
  }
  
  export interface ITariff {
    onAddFormChanged: (data: TariffDTO) => void;
    sendNewTariffDataToSave: (data: TariffDTO) => void;
    sendTariffChangeDataToSave: (data: TariffDTO) => void;
    onDeleteClicked: (data: TariffDTO) => void;
  }
  