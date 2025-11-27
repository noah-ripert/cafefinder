async function getLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    console.log("Your position:", lat, lng);
    await useLocation(lat, lng);
  }, () => {
    alert("Failed to get location.");
  });
}

async function useLocation(lat, lng) {
  try {
    const response = await fetch(`http://localhost:3000/api/cafes?lat=${lat}&lng=${lng}`);
    const data = await response.json();

    console.log("Google Places result:", data);
    showCafes(data.results || []);
  } catch (err) {
    console.error("Error fetching cafes:", err);
  }
}

function showCafes(cafes) {
  const container = document.querySelector(".cards");
  container.innerHTML = "";

  if (cafes.length === 0) {
    container.innerHTML = "<p>No cafés found.</p>";
    return;
  }

  cafes.forEach(cafe => {
    const card = document.createElement("div");
    card.className = "card";

    const imgUrl = cafe.photos?.[0]?.photo_reference
      ? `http://localhost:3000/api/photo?photo_reference=${cafe.photos[0].photo_reference}`
      : "https://via.placeholder.com/250x150?text=No+Image";

    card.innerHTML = `
      <img src="${imgUrl}" alt="${cafe.name}" />
      <h3>${cafe.name}</h3>
      <p>${cafe.vicinity || cafe.formatted_address}</p>
      <p>Rating: ${cafe.rating ?? "N/A"} ⭐</p>
    `;

    container.appendChild(card);
  });
}
