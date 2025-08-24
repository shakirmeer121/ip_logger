function getLocation() {
  const status = document.getElementById("status");
  const coords = document.getElementById("coords");

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  status.textContent = "Requesting location...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      status.textContent = "Location access granted ✅";
      coords.textContent = Latitude: ${latitude}, Longitude: ${longitude} (±${accuracy}m);

      // 🔹 Log to console (for your dev tools)
      console.log("Lat:", latitude, "Lng:", longitude, "Accuracy:", accuracy);

      // 🔹 OPTIONAL: send to your own database/server
      /*
      fetch("https://your-server.com/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude, accuracy, time: Date.now() })
      });
      */
    },
    (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          status.textContent = "Permission denied ❌";
          break;
        case error.POSITION_UNAVAILABLE:
          status.textContent = "Position unavailable.";
          break;
        case error.TIMEOUT:
          status.textContent = "Request timed out.";
          break;
        default:
          status.textContent = "An unknown error occurred.";
      }
    }
  );
}
