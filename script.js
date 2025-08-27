const statusEl = document.getElementById("status");
const coordsEl = document.getElementById("coords");

// Replace with your Google Apps Script Web App URL
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbx16X3FaYYMT8B4ThuMdH-8VH7H7OZgTBPaABpndHMCpvTltixg2JLbh1TJV65pxv2nfQ/exec";

function logLocation(lat, lon, acc) {
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
}

function getLocation() {
  if ("geolocation" in navigator) {
    statusEl.textContent = "📍 Requesting your location...";

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        // If already granted → get location directly
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            logLocation(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy);
          }
        );
      } else {
        // Ask for permission if not granted
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            logLocation(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy);
          },
          (err) => {
            statusEl.textContent = "❌ Error: " + err.message;
          }
        );
      }
    });
  } else {
    statusEl.textContent = "⚠️ Geolocation not supported.";
  }
}

// 🚀 Auto-run on page load
window.onload = getLocation;
