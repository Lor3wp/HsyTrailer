import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import RentInfoPage from './pages/RentInfo';
import NotFoundPage from './pages/NotFound';
import SuccessfulRentalPage from './pages/SuccessfulRental';
import RateItemPage from './pages/RateItem';
import RentProcessPage from './pages/RentProcess';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './theme.css';
import { StepperProvider } from './context/StepperContext';
import { useTranslation } from 'react-i18next';

function App() {
  // TODO: Set to false when backend is ready
  const [rentSuccessful, setRentSuccessful] = useState(true);
  const [itemReturned, setItemReturned] = useState(true);

  const { t } = useTranslation();

  // TODO: Pass this down when the backend is ready
  const handleSuccessfulRent = () => {
    setRentSuccessful(true);
  };

  const handleItemReturned = () => {
    setItemReturned(true);
  };

  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route
        path="/rent-process"
        element={
          <>
            <StepperProvider>
              <Header title={t('Peräkärryn vuokraus')} />
              <RentProcessPage />
            </StepperProvider>
          </>
        }
      />
      {rentSuccessful ? (
        <Route
          path="/rent-successful"
          element={
            <>
              <Header title={t('Peräkärryn vuokraus')} />
              <SuccessfulRentalPage />
            </>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
      {itemReturned ? (
        <Route
          path="/rent-info"
          element={
            <>
              <Header title={t('Varauksen tiedot')} />
              <RentInfoPage handleItemReturned={handleItemReturned} />
            </>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
      {itemReturned ? (
        <Route
          path="/rate-item"
          element={
            <>
              <Header title={t('Palaute')} />
              <RateItemPage />
            </>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
