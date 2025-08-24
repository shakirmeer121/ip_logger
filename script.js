const statusEl = document.getElementById("status");
const coordsEl = document.getElementById("coords");

// Replace with your Google Apps Script Web App URL
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzX9DtT2OY5YuQDF5MlRI7faIKc_vQ--1qyBAU87PhZKOBnfxgj13Lc_-LjxtipZmkUgA/exec";

function getLocation() {
  if ("geolocation" in navigator) {
    statusEl.textContent = "📍 Requesting your fucking location...";

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const acc = pos.coords.accuracy;

        statusEl.textContent = "✅ Location access granted";
        coordsEl.textContent = `Lat: ${lat}, Lon: ${lon}, Accuracy: ±${acc}m`;

        // Send to Google Sheets
        fetch(WEBHOOK_URL, {
          method: "POST",
          body: JSON.stringify({
            latitude: lat,
            longitude: lon,
            accuracy: acc
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((res) => res.text())
          .then((data) => console.log("Logged:", data))
          .catch((err) => console.error("Error:", err));
      },
      (err) => {
        statusEl.textContent = "❌ Error: " + err.message;
      }
    );
  } else {
    statusEl.textContent = "⚠️ Geolocation not supported.";
  }
}
