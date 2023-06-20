import React, { useEffect, useState } from "react";

function Root() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("/")
      .then((response) => response.text()) // We expect a text response in this case
      .then((data) => setMessage(data))
      .catch((err) => console.error(err));
  }, []); // The empty array makes this run only on the first render

  return <div>{message ? `Server says: ${message}` : "Loading..."}</div>;
}

export default Root;
