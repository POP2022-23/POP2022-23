export interface IFeesWindow {
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
  openRedirectSubscriptionPaymentWindow: () => void;
  openSubscriptionPaymentWindow: () => void;
  openUnpaidFeesListWindow: () => void;
}
