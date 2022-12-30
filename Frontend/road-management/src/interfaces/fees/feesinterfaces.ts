export type DriverDataDTO = {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phoneNumber: string;
};

export interface IFeesWindow {
  launchFeeDetailsWindow: () => void;
  launchMenuWindow: () => void;
  launchPaidFeesListWindow: () => void;
  launchSubscriptionPayWindow: () => void;
  launchUnpaidFeesListWindow: () => void;

  openFeeDetailsWindow: (feeId: number) => void;

  showFailedWindow: () => void;
  showMessageAboutUncorrectData: () => void;
  showPaymentTypeWindow: () => void;
  showRedirectPaymentLoadingWindow: () => void;
  showSuccessfulWindow: () => void;
}

export interface IFees {
  openMenuWindow: () => void;
  openPaidFeesListWindow: () => void;

  openRedirectRidePaymentWindow: (feeId: number, driverData: DriverDataDTO) => void;

  openRedirectSubscriptionPaymentWindow: (paymentType: number) => void;
  openSubscriptionPaymentWindow: (subTariffId: number, monthAmount: number, driverId: string) => void;
  openSubscriptionPayWindow: () => void;
  openUnpaidFeesListWindow: () => void;
}
