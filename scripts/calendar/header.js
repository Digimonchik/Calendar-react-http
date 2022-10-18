import { getItem } from "../common/storage.js";
import { getStartOfWeek } from "../common/time.utils.js";
import { generateWeekRange } from "../common/time.utils.js";
import { closeModal, openModal } from "../common/modal.js";
import { getTime } from "../common/time.utils.js";
import { getTasksList } from "../common/taskfetch.js";

export const renderHeader = () => {
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const startOfWeek = getItem("displayedWeekStart");
  const headerContainer = document.querySelector(".calendar__header");
  headerContainer.innerHTML = generateWeekRange(getStartOfWeek(startOfWeek))
    .map((element) => {
      return `<div class ="calendar__day-label">
        <div class="calendar__day-label__day-name">${
          dayOfWeek[new Date(element).getDay()]
        }</div>
        <div class="calendar__day-label__day-number">${new Date(element).getDate()}</div>
        </div>`;
    })
    .join(" ");
  const getDaysRange = document.querySelectorAll(".calendar__day-label__day-number");
  [...getDaysRange].map((element) => {
    if (
      new Date(getItem("displayedWeekStart")).getMonth() ==
        new Date(getStartOfWeek(new Date())).getMonth() &&
      element.textContent == new Date().getDate()
    )
      element.classList.add("today");
  });
};

const eventFormElem = document.querySelector(".event-form");
const createButton = document.querySelector(".create-event-btn");

const removeListener = (event) => {
  if (event.target.classList.contains("overlay")) {
    closeModal();
    document.removeEventListener("click", removeListener);
  }
};
const createDateValue = (date) => {
  return `${new Date(date).getFullYear()}-${
    new Date(date).getMonth() + 1
  }-${new Date(date).getDate()}`;
};

const setLocalStorage = async () => {
  const newArr = await getTasksList();
  localStorage.setItem("storage", JSON.stringify(newArr));
};
createButton.addEventListener("click", () => {
  setLocalStorage();
  openModal();
  eventFormElem.date.value = createDateValue(new Date());
  eventFormElem.startTime.value = getTime(new Date());
  document.addEventListener("click", removeListener);
});
