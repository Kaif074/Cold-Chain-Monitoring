import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tracking from './pages/Tracking';
import DeviceDetail from './pages/DeviceDetail';
import DataUpload from './pages/DataUpload';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <Dashboard />,
    visible: true
  },
  {
    name: 'Live Tracking',
    path: '/tracking',
    element: <Tracking />,
    visible: true
  },
  {
    name: 'Data Upload',
    path: '/data-upload',
    element: <DataUpload />,
    visible: true
  },
  {
    name: 'Device Detail',
    path: '/device/:deviceId',
    element: <DeviceDetail />,
    visible: false
  }
];

export default routes;
