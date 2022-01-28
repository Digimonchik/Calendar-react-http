import { getStartOfWeek } from "../common/time.utils.js";
import { getItem } from "../common/storage.js";
import { setItem } from "../common/storage.js";

export const getCurrentTime = () => {
  const redLine = document.createElement("div");
  redLine.classList.add("red-line");
  const topHour = new Date().getHours() * 60;
  redLine.style.top = `${topHour + new Date().getMinutes()}px`;
  const daysRange = document.querySelectorAll(".calendar__day");
  [...daysRange].map((element) => {
    if (
      new Date(getItem("displayedWeekStart")).getMonth() ==
        new Date(getStartOfWeek(new Date())).getMonth() &&
      element.dataset.day == new Date().getDate()
    ) {
      element.append(redLine);
    }
  });
};

export const updateCurrentTime = () => {
  const daysRange = document.querySelectorAll(".calendar__day");
  [...daysRange].map((element) => {
    [...element.childNodes].map((child) => {
      if (child.classList.contains("red-line")) {
        const newRedLine = document.querySelector(".red-line");
        newRedLine.parentNode.removeChild(newRedLine);
      }
    });
  });
  getCurrentTime();
};
export const runInterval = () => {
  clearInterval(getItem("intervalId"));
  getCurrentTime();
  const intervalId = setInterval(updateCurrentTime, 1000);
  setItem("intervalId", intervalId);
};
export const stopInterval = () => {
  clearInterval(getItem("intervalId"));
};
