import React from 'react';
import EventCard from './EventCard.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <EventCard />
    );
  }
}

export default Dashboard;
