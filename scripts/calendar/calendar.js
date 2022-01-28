import { getItem } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";
import { renderEvents } from "../events/events.js";
import { createNumbersArray } from "../common/createNumbersArray.js";
import { runInterval } from "../calendar/currentTime.js";
const calendarWeek = document.querySelector(".calendar__week");

export const generateDay = () =>
  createNumbersArray(1, 24)
    .map(
      (number) =>
        `<div class ="calendar__time-slot" data-time = "${number}"></div>`
    )
    .join("");

export const renderWeek = () => {
  calendarWeek.innerHTML = generateWeekRange(
    new Date(getItem("displayedWeekStart"))
  )
    .map((element) => {
      return `<div class ="calendar__day" data-month = "${element.getMonth()}" data-day = "${element.getDate()}">${generateDay()}</div>`;
    })
    .join("");
  renderEvents();
  runInterval();
};
