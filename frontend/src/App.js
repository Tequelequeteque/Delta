import React from 'react';
import './styles/global.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

toast.configure({
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

function App() {
  return <Routes />;
}

export default App;
