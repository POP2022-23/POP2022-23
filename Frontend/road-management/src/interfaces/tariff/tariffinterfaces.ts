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

export interface ITariffView {
  showStatusMessage: (status: boolean) => void;
}

export interface ITariffPresenter {
  handleAddFormDataSubmit: (event: any) => void;
  handleUpdateFormChange: (event: any) => void;
  handleRoadSelected: (item: string) => void;
}
