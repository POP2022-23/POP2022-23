export type TariffDTO = {
  id: number;
  isValid: boolean;
  name: string;
  rates: Map<string, number>;
  roadIds: Array<number>;
};

export type TariffDTO2 = {
  id: number;
  valid: boolean;
  name: string;
  rates: Map<string, number>;
  roadIds: Array<number>;
};

export interface ITariffWindow {
  showStatusMessage: (status: boolean) => void;
}

export interface ITariff {
  sendNewTariffDataToSave: (data: TariffDTO) => void;
  sendTariffChangeDataToSave: (data: TariffDTO) => void;
  onRoadIdSelected: (data: string) => void;
}
