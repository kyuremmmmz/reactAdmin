import React from 'react';
import './styles.css'; 
import Header from '../../panels/Header';
import image from '../../../assets/calendar.png';

const roomSchedules = [
  { id: 'A09863', title: 'Deluxe Suite', date: 'Monday, 16 Sept 2024, 09:42 am' },
  { id: 'A09864', title: 'Presidential Suite', date: 'Monday, 16 Sept 2024, 08:02 am' },
  { id: 'A09865', title: 'Premiere Suite', date: 'Monday, 16 Sept 2024, 06:52 am' },
  { id: 'A09866', title: 'Premiere Suite', date: 'Monday, 16 Sept 2024, 04:44 am' },
  { id: 'A09867', title: 'Luxury Suite', date: 'Monday, 16 Sept 2024, 10:42 am' },
  { id: 'A09868', title: 'Standard Room', date: 'Monday, 16 Sept 2024, 11:42 am' },
  { id: 'A09869', title: 'Economy Room', date: 'Monday, 16 Sept 2024, 12:42 pm' },
  { id: 'A09870', title: 'Family Suite', date: 'Monday, 16 Sept 2024, 01:42 pm' },
  { id: 'A09871', title: 'Penthouse Suite', date: 'Monday, 16 Sept 2024, 02:42 pm' },
  { id: 'A09872', title: 'Beachfront Room', date: 'Monday, 16 Sept 2024, 03:42 pm' },
  { id: 'A09873', title: 'Garden View Room', date: 'Monday, 16 Sept 2024, 04:42 pm' },
];



const getCurrentDateInfo = () => {
  const currentDate = new Date();
  return {
    day: currentDate.toLocaleString('default', { weekday: 'long' }),
    date: currentDate.getDate(),
    month: currentDate.toLocaleString('default', { month: 'long' }),
    year: currentDate.getFullYear(),
  };
};

const RoomSchedules = () => {
  const { day, date, month, year } = getCurrentDateInfo();

  return (
    <div>
      <Header />
      <main className="room-schedules">
        <div className="container">
          <section className="room-schedules-section">
            <h2 className="room-title">Scheduled Rooms</h2>
            <p className="room-date">
              {day}, <span style={{ color: '#3d3d3d' }}>{`${date} ${month} ${year}`}</span>
            </p>
            <div className="room-schedules-l">
              <div className="room-schedules-list">
                {roomSchedules.length > 0 ? (
                  roomSchedules.map((schedule, index) => (
                    <RoomScheduleItem key={index} schedule={schedule} />
                  ))
                ) : (
                  <p>No new schedules available.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const RoomScheduleItem = ({ schedule }) => {
  const formatRoomScheduleDate = (dateString) => {
    const parts = dateString.split(', ');
    const dayOfWeek = parts[0]; 
    const restOfDate = parts.slice(1).join(', ');

    return (
      <>
        <span style={{ color: '#0047fa' }}>{dayOfWeek}</span>, {restOfDate}
      </>
    );
  };

  return (
    <div className="room-schedule-item">
      <div className="room-schedule-icon">
        <img src={image} alt="Schedule Image" />
      </div>
      <div className="room-schedule-info">
        <p className="room-schedule-id">Room Schedule ID #{schedule.id}</p>
        <h2 className="room-schedule-title">{schedule.title} {schedule.id}</h2>
      </div>
      <div className="room-schedule-date-info">
        <p className="room-schedule-date-label">Schedule Date</p>
        <p className="room-schedule-date">{formatRoomScheduleDate(schedule.date)}</p>
      </div>
    </div>
  );
};

export default RoomSchedules;
