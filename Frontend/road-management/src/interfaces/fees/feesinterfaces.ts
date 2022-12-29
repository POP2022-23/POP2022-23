export interface IFeesWindow {
  showMessageAboutUncorrectData: () => void;
  launchFeeDetailsWindow: () => void;
  launchMenuWindow: () => void;
  launchPaidFeesListWindow: () => void;
  launchSubscriptionPayWindow: () => void;
  launchUnpaidFeesListWindow: () => void;
  openFeeDetailsWindow: () => void;
  showFailedWindow: () => void;
  showPaymentTypeWindow: () => void;
  showRedirectPaymentLoadingWindow: () => void;
  showSuccessfulWindow: () => void;
}

export interface IFees {
  openMenuWindow: () => void;
  openPaidFeesListWindow: () => void;
  openRedirectRidePaymentWindow: () => void;
  openRedirectSubscriptionPaymentWindow: (paymentType: number) => void;
  openSubscriptionPaymentWindow: (subTariffId: number, monthAmount: number, driverId: string) => void;
  openUnpaidFeesListWindow: () => void;
}
