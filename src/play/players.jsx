import React from 'react';
import { gameNotifier } from './gameNotifier';

export function Players() {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    const handleGameEvent = (event) => {
      let newEvents = [event, ...events];
      if (newEvents.length > 10) newEvents = newEvents.slice(0, 10);
      setEvents(newEvents);
    };

    gameNotifier.addHandler(handleGameEvent);
    return () => gameNotifier.removeHandler(handleGameEvent);
  }, [events]);

  return (
    <div className="players bg-light text-dark p-2">
      <h3>Recent Player Events</h3>
      <ul>
        {events.map((e, i) => (
          <li key={i}>{`${e.value.name} scored ${e.value.score} on ${e.value.date}`}</li>
        ))}
      </ul>
    </div>
  );
}
