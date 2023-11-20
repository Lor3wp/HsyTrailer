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
import PopUpWarningModal from '../components/PopUpWarningModal';

const RentProcessPage = () => {
  const countdownDuration = 20 * 60 * 1000;
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 820);
  const [showWarningModal, setShowWarningModal] = useState(false);

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

  const handleWarningModal = () => {
    setShowWarningModal(true);
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

  // Warns the user from leaving the page
  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const renderPaymentComponents = () => {
    return (
      <div className={styles.bankContainer}>
        <BankType
          gridName={styles.mobileGrid}
          title="Mobiilimaksutavat"
          arrayName={mobileBanks}
          paymentName={styles.mobilePayment}
        />
        <BankType
          gridName={styles.cardGrid}
          title="Korttimaksutavat"
          arrayName={cardPayments}
          paymentName={styles.cardPayment}
        />
        <BankType
          gridName={styles.bankGrid}
          title="Pankkimaksutavat"
          arrayName={bankPayments}
          paymentName={styles.bankPayment}
        />
        <BankType
          gridName={styles.irlGrid}
          title="Maksu paikan päällä"
          arrayName={irlPayments}
          paymentName={styles.irlPayment}
        />
      </div>
    );
  };

  const renderSectionComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <StationList
            handleWarningModal={handleWarningModal}
            onStationSelected={handleStationSelected}
          />
        );

      case 1:
        return (
          <ProductAndTime
            handleWarningModal={handleWarningModal}
            onProductAndTimeSelected={handleProductAndTimeSelected}
            onPrevStep={handlePrevStep}
          />
        );
      case 2:
        return (
          <UserForm
            handleWarningModal={handleWarningModal}
            onSubmit={handleFormSubmit}
            onPrevStep={handlePrevStep}
          />
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

  const popUpWarningBody = () => {
    switch (activeStep) {
      case 0:
        return 'Valitse vähintään yksi asema ennen kuin jatkat.';
      case 1:
        return 'Valitse tuote, ajankohta ja asema ennen kuin jatkat.';
      default:
        return '';
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
          <PopUpWarningModal
            show={showWarningModal}
            onHide={() => setShowWarningModal(false)}
            body={popUpWarningBody()}
            acceptButton="Takaisin"
            acceptButtonVariant="primary"
            onPrimaryButtonClick={() => setShowWarningModal(false)}
          />
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
