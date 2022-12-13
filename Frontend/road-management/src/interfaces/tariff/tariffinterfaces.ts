export type TariffDTO = {
    id: number;
    isValid: boolean;
    name: string;
    rates: Map<string, number>
    roadIds: Array<number>
  };
  
  export interface ITariffWindow {
    showStatusMessage: (status: boolean) => void;
  }
  
  export interface ITariff {
    onAddFormChanged: (data: TariffDTO) => void;
    sendNewTariffDataToSave: (data: TariffDTO) => void;
    sendTariffChangeDataToSave: (data: TariffDTO) => void;
    onRoadIdSelected: (data: string) => void;

  }
  