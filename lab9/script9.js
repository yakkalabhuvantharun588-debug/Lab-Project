const btn = document.getElementById("fetchBtn");
const container = document.getElementById("places");

// ✅ Travel image links (free Unsplash images)
const travelImages = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
  "https://images.unsplash.com/photo-1494526585095-c41746248156",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1548013146-72479768bada"
];

// ------------------------------
// ASYNC FUNCTION USING AWAIT
// (Simulating API call)
// ------------------------------
async function getPlaces() {
  return new Promise(resolve => {
    setTimeout(() => resolve(travelImages), 500); // fake API delay
  });
}

// ------------------------------
// PROMISE CHAINING
// ------------------------------
function refineData(data) {
  return new Promise(resolve => {
    const refined = data.map((img, index) => ({
      title: `Destination ${index + 1}`,
      image: img
    }));
    resolve(refined);
  });
}

// ------------------------------
// DOM UPDATE FUNCTION
// ------------------------------
function renderPlaces(list) {
  container.innerHTML = "";

  list.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${place.image}" alt="${place.title}">
      <h3>${place.title}</h3>
      <p>Perfect spot for your next adventure!</p>
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// BUTTON EVENT → LOAD DATA
// ------------------------------
btn.addEventListener("click", async () => {
  try {
    const raw = await getPlaces();     // async/await
    refineData(raw)                    // promise chaining
      .then(final => renderPlaces(final));
  } catch (err) {
    console.error("Failed to load places:", err);
  }
});
