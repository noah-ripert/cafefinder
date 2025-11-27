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

  cafes.forEach((cafe, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "swipe-wrapper";
    wrapper.style.zIndex = 200 - i;

    const card = document.createElement("div");
    card.className = "location-card";

    const imgUrl = cafe.photos?.[0]?.photo_reference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${cafe.photos[0].photo_reference}&key=TA_CLE_NODE`
      : "https://via.placeholder.com/250x150?text=No+Image";

    const cafeData = {
      name: cafe.name,
      place_id: cafe.place_id,
      photo: imgUrl,
      rating: cafe.rating || "N/A",
      address: cafe.vicinity || cafe.formatted_address
    };

    card.innerHTML = `
      <img src="${imgUrl}" alt="${cafe.name}" />
      <h3>${cafe.name}</h3>
      <p>${cafeData.address}</p>
      <p>⭐️ Rating: ${cafeData.rating}</p>
      <p><small>Swipe right to save 💖</small></p>
    `;

    wrapper.appendChild(card);
    container.appendChild(wrapper);

    // Swipe handling
    const hammertime = new Hammer(wrapper);

    hammertime.on("swipeleft", () => {
      wrapper.style.transform = "translateX(-150%) rotate(-15deg)";
      wrapper.style.opacity = 0;
      setTimeout(() => wrapper.remove(), 100);
    });

    hammertime.on("swiperight", () => {
      saveCafe(JSON.stringify(cafeData));
      wrapper.style.transform = "translateX(150%) rotate(15deg)";
      wrapper.style.opacity = 0;
      setTimeout(() => wrapper.remove(), 100);
    });
  });
}

function saveCafe(cafeJSON) {
  const cafe = JSON.parse(cafeJSON);
  let saved = JSON.parse(localStorage.getItem('savedCafes') || '[]');

  if (!saved.find((c) => c.place_id === cafe.place_id)) {
    saved.push(cafe);
    localStorage.setItem("savedCafes", JSON.stringify(saved));
    alert(`${cafe.name} saved!`);
  } else {
    alert(`${cafe.name} is already saved.`);
  }
}

function showSaved() {
  const container = document.querySelector(".cards");
  container.innerHTML = '';

  const saved = JSON.parse(localStorage.getItem("savedCafes") || "[]");

  if (saved.length === 0) {
    container.innerHTML = "<p>No saved cafes yet 😢</p>";
    return;
  }

  saved.forEach(cafe => {
    const card = document.createElement('div');
    card.className = 'location-card';
    card.innerHTML = `
      <img src="${cafe.photo}" alt="${cafe.name}" />
      <h3>${cafe.name}</h3>
      <p>${cafe.address}</p>
      <p>⭐️ Rating: ${cafe.rating}</p>
    `;
    container.appendChild(card);
  });
}
