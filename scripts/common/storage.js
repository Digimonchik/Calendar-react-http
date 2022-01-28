export let storage = {
  eventIdToDelete: null,
  displayedWeekStart: null,
};

export const setItem = (key, value) => {
  storage[key] = value;
};

export const getItem = (key) => {
  return storage[key];
};

export const getStorage = () => {
  return storage;
};
