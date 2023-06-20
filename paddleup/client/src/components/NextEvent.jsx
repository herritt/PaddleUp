import React, { useEffect, useState } from "react";

const NextEvent = () => {
  const [nextEvent, setNextEvent] = useState(null);

  useEffect(() => {
    fetch("api/events/next") // Adjust this URL to match your route
      .then((response) => response.json())
      .then((data) => {
        // create a new date object with the date string
        const eventDate = new Date(data.Date); // Notice 'Date' is capitalized here

        // format the date
        const formattedDate = `${
          eventDate.getMonth() + 1
        }/${eventDate.getDate()}/${eventDate.getFullYear()}`;

        // Add the formatted date to the data object
        data.formattedDate = formattedDate;

        // Update the state with the modified data object
        setNextEvent(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!nextEvent) {
    return <div>Loading Next Event...</div>;
  }

  return (
    <div>
      <h1>Next Event</h1>
      <p>Date: {nextEvent.formattedDate}</p>
      <p>Event: {nextEvent.Event}</p>
      <p>Location: {nextEvent.Location}</p>
    </div>
  );
};

export default NextEvent;
