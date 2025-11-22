function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

const demoBuses = [
  { id: 1, name: "MSRTC Express", from: "Bengaluru", to: "Mysuru", fare: "₹450", seats: 6 },
  { id: 2, name: "Karnataka Travels", from: "Bengaluru", to: "Mysuru", fare: "₹520", seats: 4 },
  { id: 3, name: "InterCity Volvo", from: "Bengaluru", to: "Mysuru", fare: "₹620", seats: 2 }
];

function searchBuses() {
  const from = document.getElementById("from").value.toLowerCase();
  const to = document.getElementById("to").value.toLowerCase();

  const filtered = demoBuses.filter(b => {
    return (!from || b.from.toLowerCase().includes(from))
      && (!to || b.to.toLowerCase().includes(to));
  });

  renderBuses(filtered);
}

function renderBuses(list) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  list.forEach(b => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${b.name}</h3>
      <p>${b.from} → ${b.to}</p>
      <p>Fare: ${b.fare}</p>
      <p>Seats left: ${b.seats}</p>
      <button onclick="track(${b.id})">Track / Book</button>
    `;
    container.appendChild(card);
  });

  if (list.length === 0) {
    container.innerHTML = "<p>No buses found for these route details.</p>";
  }
}

function track(id) {
  const bus = demoBuses.find(b => b.id === id);
  if (!bus) return;
  localStorage.setItem("selectedBus", JSON.stringify(bus));
  window.location.href = "live.html";
}

// initial render
renderBuses(demoBuses);
