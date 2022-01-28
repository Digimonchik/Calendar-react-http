import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";
import { createTask } from "../common/taskfetch.js";

const eventFormElem = document.querySelector(".event-form");

function clearEventForm() {
  eventFormElem.reset();
}

function onCloseEventForm() {
  closeModal();
  clearEventForm();
}

const onCreateEvent = async (event) => {
  event.preventDefault();
  const myData = new FormData(eventFormElem);
  const eventObj = {
    id: Math.random(),
    title: myData.get("title"),
    description: myData.get("description"),
    start: getDateTime(myData.get("date"), myData.get("startTime")),
    end: getDateTime(myData.get("date"), myData.get("endTime")),
  };
  await createTask(eventObj);
  onCloseEventForm();
  renderEvents();
};

export function initEventForm() {
  eventFormElem.addEventListener("submit", onCreateEvent);
}
