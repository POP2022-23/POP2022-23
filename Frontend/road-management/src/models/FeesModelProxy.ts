import {FeesDetailsDTO, FeesDTO} from '../interfaces/fees/feesinterfaces';
import {TariffDTO} from '../interfaces/tariff/tariffinterfaces';

export type SubscriptionPaymentRequest = {
    subTariffId: number;
    monthAmount: number;
    driverId: number;
    paymentType: number;
    vehicleType: string;
};

export interface IFeesModel {
    getPaidFeesList: (userId: string) => Promise<Array<FeesDTO> | null>;
    getFeeDetails: (feeId: number) => Promise<FeesDetailsDTO | null>;
    getSubscriptionTariffList: () => Promise<Array<TariffDTO> | null>;

    getUnpaidFeesList: (userId: string) => void;

    redirectToRidePayment: () => void;

    redirectToSubscriptionPayment: (payment: SubscriptionPaymentRequest) => Promise<Boolean>;
}

export class FeesModelProxy implements IFeesModel {
    private serverUrl = 'http://localhost:8080/';

    async getPaidFeesList(userId: string): Promise<Array<FeesDTO> | null> {
        const requestUrl = this.serverUrl + `fees/${userId}/paid`;

        try {
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return null;
            }

            const jsonResponse = await response.json();
            return jsonResponse as Array<FeesDTO>;
        } catch (error: any) {
            return null;
        }
    }

    async getFeeDetails(feeId: number): Promise<FeesDetailsDTO | null> {
        const requestUrl = this.serverUrl + `fees/${feeId}`;

        try {
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return null;
            }

            const jsonResponse = await response.json();
            return jsonResponse as FeesDetailsDTO;
        } catch (error: any) {
            return null;
        }
    }

    private async getTariffListFromServer(): Promise<Array<TariffDTO> | null> {
        const requestUrl = 'http://localhost:8080/tariff'; // should be fees

        try {
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return null;
            }

            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse as Array<TariffDTO>;
        } catch (error: any) {
            return null;
        }
    }

    async getSubscriptionTariffList(): Promise<Array<TariffDTO>> {
        const tariffList = await this.getTariffListFromServer();

        if (tariffList === null) {
            return new Array<TariffDTO>();
        }

        return tariffList.map((item) => {
            const tariffDTO = {
                id: item.id,
                isValid: item.isValid,
                name: item.name,
                roadPassRates: item.roadPassRates,
                transitRates: item.transitRates,
                roadIds: item.roadIds,
            };
            return tariffDTO;
        });
    }

    getUnpaidFeesList(userId: string) {
    }

    redirectToRidePayment() {
    }

    async redirectToSubscriptionPayment(payment: SubscriptionPaymentRequest): Promise<boolean> {
        const requestUrl = 'http://localhost:8080/fees/roadpass';

        try {
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payment),
            });

            if (!response.ok) {
                return false;
            }

            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        } catch (error: any) {
            return false;
        }
    }
}
