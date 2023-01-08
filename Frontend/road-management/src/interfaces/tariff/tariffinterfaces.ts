export type TariffDTO = {
  id: number;
  isValid: boolean;
  name: string;
  transitRates: Map<string, number>;
  roadPassRates: Map<string, number>;
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
