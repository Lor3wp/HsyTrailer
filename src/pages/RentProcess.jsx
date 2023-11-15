// RentProcessPage.jsx
import { useEffect, useState } from 'react';
import { CustomStepper } from '../components/CustomStepper';
import ProductAndTime from '../components/TimeForm';
import StationList from '../components/StationList';
import ReservationTimer from '../components/ReservationTimer';
import Button from 'react-bootstrap/Button';
import UserForm from '../components/UserForm';
import PageStyles from '../css/RentProcess.module.css';
import MobilePay from '../assets/mobilepay.png';
import VisaBlue from '../assets/visablue.png';
import VisaBlack from '../assets/visablack.png';
import MasterCard from '../assets/mastercard.png';
import Aktia from '../assets/aktia.png';
import Danske from '../assets/danske.png';
import Nordea from '../assets/nordea.png';
import Handels from '../assets/handels.png';
import Olands from '../assets/olands.png';
import Omasp from '../assets/omasp.png';
import Poppankki from '../assets/poppankki.png';
import Saastopankki from '../assets/saastopankki.png';
import Spankki from '../assets/spankki.png';
import OsuusPankki from '../assets/op.png';
import HSY from '../assets/hsy_logo.png';
import styles from '../css/BankButton.module.css';
import BankType from '../components/BankType';

/* Rent process page */
/* eslint-disable no-unused-vars */
const RentProcessPage = () => {
  const countdownDuration = 20 * 60 * 1000;
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 820);
  const [reservationDeadline, setReservationDeadline] = useState(
    calculateReservationDeadline(),
  );

  function calculateReservationDeadline() {
    return new Date().getTime() + countdownDuration;
  }

  const handleStationSelected = () => {
    setActiveStep(1);
  };

  const handleProductAndTimeSelected = () => {
    setActiveStep(2);
  };

  const handleFormSubmit = (data) => {
    console.log(data);
    setActiveStep(3);
  };

  const handlePrevStep = () => {
    setActiveStep(activeStep - 1);
  };

  // when window gets smaller than 820, setIsMobile is set
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 820);
    }
    // listening the window size
    window.addEventListener('resize', handleResize);
    return () => {
      // removing event listener when size gets back
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const steps = [
    {
      label: isMobile ? '' : 'Valitse asemat',
      onClick: () => setActiveStep(0),
    },
    {
      label: isMobile ? '' : 'Tuotevalinta & Päivämäärä',
      onClick: () => setActiveStep(1),
    },
    {
      label: isMobile ? '' : 'Käyttäjän tiedot',
      onClick: () => setActiveStep(2),
    },
    { label: isMobile ? '' : 'Maksaminen', onClick: () => setActiveStep(3) },
  ];

  const mobileBanks = [{ logo: MobilePay, bankName: 'mobilepay' }];
  const cardPayments = [
    { logo: VisaBlue, bankName: 'visablue' },
    { logo: VisaBlack, bankName: 'visablack' },
    { logo: MasterCard, bankName: 'mastercard' },
  ];
  const bankPayments = [
    { logo: OsuusPankki, bankName: 'osuuspankki' },
    { logo: Aktia, bankName: 'aktia' },
    { logo: Danske, bankName: 'danske' },
    { logo: Nordea, bankName: 'nordea' },
    { logo: Handels, bankName: 'handels' },
    { logo: Olands, bankName: 'olands' },
    { logo: Omasp, bankName: 'omasp' },
    { logo: Poppankki, bankName: 'poppankki' },
    { logo: Saastopankki, bankName: 'saastopankki' },
    { logo: Spankki, bankName: 'spankki' },
  ];
  const irlPayments = [{ logo: HSY, bankName: 'HSY' }];

  const renderPaymentComponents = () => {
    return (
      <div className={styles.bankContainer}>
        <BankType
          gridName={styles.mobileGrid}
          title="Mobiilimaksutavat"
          arrayName={mobileBanks}
          paymentName={styles.mobilePayment}
        ></BankType>
        <BankType
          gridName={styles.cardGrid}
          title="Korttimaksutavat"
          arrayName={cardPayments}
          paymentName={styles.cardPayment}
        ></BankType>
        <BankType
          gridName={styles.bankGrid}
          title="Pankkimaksutavat"
          arrayName={bankPayments}
          paymentName={styles.bankPayment}
        ></BankType>
        <BankType
          gridName={styles.irlGrid}
          title="Maksu paikan päällä"
          arrayName={irlPayments}
          paymentName={styles.irlPayment}
        ></BankType>
      </div>
    );
  };

  const renderSectionComponent = () => {
    switch (activeStep) {
      case 0:
        return <StationList onStationSelected={handleStationSelected} />;
      case 1:
        return (
          <ProductAndTime
            onProductAndTimeSelected={handleProductAndTimeSelected}
            onPrevStep={handlePrevStep}
          />
        );
      case 2:
        return (
          <UserForm onSubmit={handleFormSubmit} onPrevStep={handlePrevStep} />
        );
      case 3:
        return (
          <>
            {renderPaymentComponents()}
            <Button className={styles.cancelButton} onClick={handlePrevStep}>
              Peruuta maksu
            </Button>
            <ReservationTimer reservationDeadline={reservationDeadline} />{' '}
          </>
        );
      default:
        return null;
    }
  };

  // TODO: Minor bug: when the form errors are shown, the images change size
  return (
    <>
      <div className={PageStyles.rentProcessContainer}>
        <div
          className={
            activeStep === 3 ? PageStyles.colorBg : PageStyles.bgImage1
          }
        />
        <div
          className={
            activeStep === 3
              ? PageStyles.contentContainerLastStep
              : PageStyles.contentContainer
          }
        >
          <CustomStepper steps={steps} activeStep={activeStep} />
          {renderSectionComponent()}
          {activeStep === 2 && (
            <ReservationTimer reservationDeadline={reservationDeadline} />
          )}
        </div>
        <div
          className={
            activeStep === 3 ? PageStyles.colorBg : PageStyles.bgImage2
          }
        />
      </div>
    </>
  );
};

export default RentProcessPage;
