import { getItem, setItem } from "../common/storage.js";
import { renderWeek } from "../calendar/calendar.js";
import { renderHeader } from "../calendar/header.js";
import { renderEvents } from "../events/events.js";
import { renderTimescale } from "../calendar/timescale.js";
import { getStartOfWeek, getDisplayedMonth } from "../common/time.utils.js";
import { stopInterval } from "../calendar/currentTime.js";

const navElem = document.querySelector(".navigation");
const displayedMonthElem = document.querySelector(
  ".navigation__displayed-month"
);

function renderCurrentMonth() {
  displayedMonthElem.textContent = getDisplayedMonth(
    getItem("displayedWeekStart")
  );
}

const onChangeWeek = (event) => {
  const getDayOfPreviousWeek = (date) => {
    const days = 86400000;
    return new Date(date - 7 * days);
  };
  const getDayOfNextWeek = (date) => {
    const nextDay = new Date(date);
    return new Date(nextDay.setDate(nextDay.getDate() + 7));
  };
  const renderCurrentWeek = () => {
    setItem("displayedWeekStart", getStartOfWeek(new Date()));
    stopInterval();
    renderWeek();
    renderTimescale();
    renderHeader();
    renderEvents();
    renderCurrentMonth();
  };
  const renderPreviousWeek = () => {
    setItem(
      "displayedWeekStart",
      getStartOfWeek(getDayOfPreviousWeek(getItem("displayedWeekStart")))
    );
    stopInterval();
    renderWeek();
    renderTimescale();
    renderHeader();
    renderEvents();
    renderCurrentMonth();
  };
  const renderNextWeek = () => {
    setItem(
      "displayedWeekStart",
      getStartOfWeek(getDayOfNextWeek(getItem("displayedWeekStart")))
    );
    stopInterval();
    renderWeek();
    renderTimescale();
    renderHeader();
    renderEvents();
    renderCurrentMonth();
  };
  if (event.target.dataset.direction === "next") {
    renderNextWeek();
  }
  if (event.target.dataset.direction === "prev") {
    renderPreviousWeek();
  }
  if (event.target.dataset.direction === "today") {
    renderCurrentWeek();
  }
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener("click", onChangeWeek);
};
