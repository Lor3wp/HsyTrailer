import { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/CustomCalendar.css';
import PropTypes from 'prop-types';
import { useStepper } from '../hooks/useStepper';

const RentCalendar = ({ futureDates, setSelectedDate }) => {
  const { selectedDate } = useStepper();

  useEffect(() => {
    const calendar = document.querySelector('.react-calendar');
    if (calendar) {
      calendar.addEventListener('click', handleCalendarClick);
    }

    return () => {
      if (calendar) {
        calendar.removeEventListener('click', handleCalendarClick);
      }
    };
  }, []);

  const handleCalendarClick = (event) => {
    event.preventDefault();
  };

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const tileDisabled = ({ date }) => {
    return futureDates.some(
      (disabledDate) => date.toDateString() === disabledDate.toDateString(),
    );
  };

  const tileClassName = ({ date }) => {
    return tileDisabled({ date }) ? 'disabled-tile' : '';
  };

  return (
    <Calendar
      onChange={handleChange}
      value={selectedDate}
      minDate={new Date()}
      tileDisabled={tileDisabled}
      tileClassName={tileClassName}
    />
  );
};

RentCalendar.propTypes = {
  futureDates: PropTypes.array,
  setSelectedDate: PropTypes.func,
};

export default RentCalendar;
