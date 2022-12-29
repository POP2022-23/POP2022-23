import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import AddRoadPresenter from './presenters/AddRoadPresenter/AddRoadPresenter';
import EditRoadPresenter from './presenters/EditRoadPresenter/EditRoadPresenter';
import MapPresenter from './presenters/MapPresenter/MapPresenter';
import DashboardView from './views/Dashboard/Dashboard';
import FeesMenu from './views/Fees/FeesMenu';
import RegisterCarView from './views/RegisterCar/RegisterCarView';
import BuySubscriptionView from './views/SubscriptionView/BuySubscriptionView';
import TariffWindow from './views/TariffView/TariffWindow';

const router = createBrowserRouter([
  { path: '/', element: <DashboardView /> },
  { path: '/registerCar', element: <RegisterCarView /> },
  { path: '/map', element: <MapPresenter /> },
  { path: '/addRoad', element: <AddRoadPresenter /> },
  { path: '/editRoad/:id', element: <EditRoadPresenter /> },
  { path: '/tariffs', element: <TariffWindow /> },
  { path: '/subscription', element: <BuySubscriptionView /> },
  { path: '/fees', element: <FeesMenu /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <div className='App'>
    <RouterProvider router={router} />
  </div>
);
