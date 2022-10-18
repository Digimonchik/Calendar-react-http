import { getItem, setItem } from "../common/storage.js";
import { openPopup, closePopup } from "../common/popup.js";
import { renderWeek } from "../calendar/calendar.js";
import { deleteTask, getTasksList } from "../common/taskfetch.js";

const weekElem = document.querySelector(".calendar__week");
let delete_buttons = document.querySelectorAll('event__delete-btn')
// const deleteEventBtn = document.querySelector(".delete-event-btn");

function handleEventClick(event) {
  if (event.target.classList.contains("event")) {
    setItem("eventIdToDelete", event.target.id);
    // openPopup(event.x, event.y - 140);
  }
}

function removeEventsFromCalendar() {
  const eventsOnPage = document.querySelectorAll(".event");
  [...eventsOnPage].map((element) => {
    element.parentNode.removeChild(element);
  });
}

const createEventElement = (event) => {
  const startTime = new Date(event.start).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(event.end).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeDif =
    new Date(event.end).getTime() - new Date(event.start).getTime();
  const eventElem = document.createElement("div");
  const topHour = new Date(event.start).getHours() * 60;
  eventElem.classList.add("event");
  const button = document.createElement('button');
  console.log(button);
  eventElem.appendChild(button);
  eventElem.style.top = `${topHour + new Date(event.start).getMinutes()}px`;
  eventElem.id = event.id;
  eventElem.textContent = ` ${event.title} ${startTime} - ${endTime}`;
  eventElem.style.height = `${Math.round(timeDif / 60000)}px`;
  return eventElem;
};

export const renderEvents = async () => {
  removeEventsFromCalendar();
  const eventsRange = await getTasksList();
  const weeksArray = document.querySelectorAll(".calendar__day");
  eventsRange.map((eventObj) => {
    [...weeksArray].map((element) => {
      if (
        new Date(eventObj.start).getDate() == element.dataset.day &&
        new Date(eventObj.start).getMonth() == element.dataset.month
      ) {
        [...element.childNodes].map((child) => {
          if (child.dataset.time == new Date(eventObj.start).getHours()) {
            child.append(createEventElement(eventObj));
            const deleteBtn = document.createElement('button')
            deleteBtn.classList.add('event__delete-btn');
            deleteBtn.addEventListener('click', onDeleteEvent);
            const events = document.querySelectorAll('.event');
            [...events].map(child => child.append(deleteBtn))
            delete_buttons = document.querySelectorAll('event__delete-btn')
    
          }
        });
      }
    });
  });

};

const onDeleteEvent = async () => {
  console.log('delete')
  const eventToDelete = getItem("eventIdToDelete");
  await deleteTask(eventToDelete);
  renderWeek();
  renderEvents();
  closePopup();
};

// deleteEventBtn.addEventListener("click", onDeleteEvent);
weekElem.addEventListener("click", handleEventClick);

