const date = document.querySelector("input[name='date']");
const timeEnd = document.querySelector("input[name='endTime']");
const timeStart = document.querySelector("input[name='startTime']");
const timeValidation = () => {
  const dataArr = JSON.parse(localStorage.getItem("storage"));
  dataArr.find((dateObj) => {
    const dateInput = date.value;
    console.log(date.value);
    const { start, end } = dateObj;
    const currentTime = new Date(`${dateInput} ${timeStart.value}`);
    if (
      new Date(start).getTime() < currentTime.getTime() &&
      currentTime < new Date(end).getTime()
    ) {
      timeStart.setCustomValidity("Пересекается с другим событием");
      return true;
    } else {
      timeStart.setCustomValidity("");
    }
  });
};

export const InitValidation = () => {
  timeStart.addEventListener("input", timeValidation);
  timeEnd.addEventListener("input", timeValidation);
};
