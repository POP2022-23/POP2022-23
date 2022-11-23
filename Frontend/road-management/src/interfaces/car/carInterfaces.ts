export type AddCarDTO = {
  ownerId: string;
  registrationNumber: string;
  vin: string;
};

export interface IRegisterCarWindow {
  clickOnAddNewCarButton: (status: boolean) => void;
}

export interface ICarRegister {
  checkNewCar: (data: AddCarDTO) => void;
}
