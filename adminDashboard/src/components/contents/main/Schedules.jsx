import './hotel.css';
import lock from "../../../assets/lock.png";
import PropTypes from 'prop-types';
function Schedules(props) {
    const schedule = props.schedule;;
    const formatBookingDate = (dateString) => {
        const date = new Date(dateString);

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        const formattedDate = date.toLocaleString('default', options)
            .replace(',', '') 
            .replace('AM', 'am')
            .replace('PM', 'pm');

        const parts = formattedDate.split(", ");
        const dayOfWeek = parts[0];
        const restOfDate = parts.slice(1).join(", ");

        return (
            <>
                <span style={{ color: "#0047fa" }}>{dayOfWeek}</span>, {restOfDate}
            </>
        );
    };
  return (
      <div className="booking-item" >
          <div className="booking-icon">
              <img src={lock} alt="Booking Image" />
          </div>
          <div className="booking-info">
              <p className="booking-id">Booking ID #{schedule.booking_id}</p>
              <h2 className="booking-title">{schedule.hotel}</h2>
              <h2 className="booking-title">Room Type: {schedule.room_type}</h2>
          </div>
          <div className="booking-date-info">
              <p className="booking-date-label">Booking Date</p>
              <p className="booking-date">{formatBookingDate(schedule.date_of_booking)}</p>
          </div>
      </div>
  )
}

Schedules.propTypes = {
    schedule: PropTypes.shape({
        booking_id: PropTypes.string.isRequired,
        hotel: PropTypes.string.isRequired,
        room_type: PropTypes.string.isRequired,
        date_of_booking: PropTypes.string.isRequired,
    }).isRequired,
};

export default Schedules
