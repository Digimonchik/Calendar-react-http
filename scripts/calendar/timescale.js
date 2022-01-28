import { createNumbersArray } from "../common/createNumbersArray.js";

export const renderTimescale = () => {
  const sideArray = [];
  const timescale = document.querySelector(".calendar__time-scale");
  createNumbersArray(1, 12).map((number) => {
    sideArray.push(`<div class="time-slot">${number} AM</div>`);
  });
  createNumbersArray(1, 12).map((number) => {
    sideArray.push(`<div class="time-slot">${number} PM</div>`);
  });
  timescale.innerHTML = sideArray.join(" ");
};
