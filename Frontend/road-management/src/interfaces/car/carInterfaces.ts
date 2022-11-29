export type AddCarDTO = {
  ownerId: string;
  registrationNumber: string;
  vin: string;
};

export interface IRegisterCarWindow {
  showStatusMessage: (status: boolean) => void;
}

export interface ICarRegister {
  addNewCar: (data: AddCarDTO) => void;
}
