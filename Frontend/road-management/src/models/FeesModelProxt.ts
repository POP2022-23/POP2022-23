export interface IFeesModel {
  getPaidFeesList: () => void;
  getSubscriptionTariffList: () => void;
  getUnpaidFeesList: () => void;
  redirectToRidePayment: () => void;
  redirectToSubscriptionPayment: () => void;
}
