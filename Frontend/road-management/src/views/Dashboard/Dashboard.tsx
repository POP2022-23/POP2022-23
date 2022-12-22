import DashboardWindow from './DashboardWindow';

interface IDashboardWindow {
  clickOnRegisterNewCarButton: () => void;
  clickOnRoadMapButton: () => void;
  showDashboardButton: () => void;
}

interface IDashboard {
  launchFees: () => void;
  launchMap: () => void;
  launchRegisterCar: () => void;
  launchTariffs: () => void;
  logOut: () => void;
}

const DashboardView = () => {
  class DashboardDispatcher implements IDashboardWindow {
    clickOnRegisterNewCarButton(): void {}
    clickOnRoadMapButton(): void {}
    showDashboardButton(): void {}

    clickOnLaunchTariffsButton(): void {}
    clickOnLogoutButton(): void {}
  }

  const dashboardDispatcher = new DashboardDispatcher();

  class DashboardPresenter implements IDashboard {
    async launchFees(): Promise<any> {}

    async launchRegisterCar(): Promise<any> {
      dashboardDispatcher.clickOnRegisterNewCarButton();
    }

    async launchMap(): Promise<any> {
      dashboardDispatcher.clickOnRoadMapButton();
    }

    async launchTariffs(): Promise<any> {
      dashboardDispatcher.clickOnLaunchTariffsButton();
    }

    async logOut(): Promise<any> {
      dashboardDispatcher.clickOnLogoutButton();
    }
  }

  const dashboardPresenter = new DashboardPresenter();

  return (
    <div>
      <DashboardWindow
        launchFees={dashboardPresenter.launchFees}
        launchMap={dashboardPresenter.launchMap}
        launchRegisterCar={dashboardPresenter.launchRegisterCar}
        launchTariffs={dashboardPresenter.launchTariffs}
        logOut={dashboardPresenter.logOut}
      />
    </div>
  );
};

export default DashboardView;
