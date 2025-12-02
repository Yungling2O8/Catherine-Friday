//caspers work
const form = document.getElementById("eventForm");
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const eventsList = document.getElementById("eventsList");
const emptyState = document.getElementById("emptyState");
const addButton = form.querySelector('button[type="submit"]');

const titleError = document.getElementById("titleError");
const dateError = document.getElementById("dateError");

let nekoActive = false;

const NEKO_IMAGE_URL = "https://as1.ftcdn.net/v2/jpg/15/61/79/58/1000_F_1561795812_ebd83H7TJICvGCTWy7dL2izcXSbZiHGA.jpg";

function applyNekoBackground() {
  document.body.style.backgroundImage = `url("${NEKO_IMAGE_URL}")`;
  document.body.style.backgroundSize = "fit";
  document.body.style.backgroundRepeat = "no-repeat";
}

function clearNekoBackground() {
  document.body.style.backgroundImage = "";
  currentNekoImage = null;
}


addButton.addEventListener("dblclick", function (e) {
  e.preventDefault();

  nekoActive = !nekoActive;
  if (nekoActive) {
    applyNekoBackground();
  } else {
    clearNekoBackground();
  }
});

function formatDateForDisplay(rawDate) {
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return rawDate;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function addEvent(title, date) {
  if (emptyState.style.display !== "none") {
    emptyState.style.display = "none";
  }

  const li = document.createElement("li");
  li.className = "event-item";

  const titleSpan = document.createElement("span");
  titleSpan.className = "event-title";
  titleSpan.textContent = title;

  const dateSpan = document.createElement("span");
  dateSpan.className = "event-date";
  dateSpan.textContent = formatDateForDisplay(date);

  li.appendChild(titleSpan);
  li.appendChild(dateSpan);

  eventsList.appendChild(li);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const date = dateInput.value;

  let valid = true;

  titleError.style.display = "none";
  dateError.style.display = "none";

  if (!title) {
    titleError.style.display = "block";
    valid = false;
  }

  if (!date) {
    dateError.textContent = "Please select a date.";
    dateError.style.display = "block";
    valid = false;
  } else {
    const selected = new Date(date);
    if (Number.isNaN(selected.getTime())) {
      dateError.textContent = "Please select a valid date.";
      dateError.style.display = "block";
      valid = false;
    }
  }

  if (!valid) return;

  addEvent(title, date);

  titleInput.value = "";
  dateInput.value = "";

  titleInput.focus();
});


