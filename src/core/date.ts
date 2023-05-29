export const getTimeLabel = (time: number): string => {
  if (time < 1) {
    return `${time} second${time === 1 ? "" : "s"}`;
  } else if (time < 60) {
    return `${time} minute${time === 1 ? "" : "s"}`;
  } else {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const hoursLabel = `${hours} hour${hours === 1 ? "" : "s"}`;
    const minutesLabel =
      minutes > 0 ? ` ${minutes} minute${minutes === 1 ? "" : "s"}` : "";
    return `${hoursLabel}${minutesLabel}`;
  }
};
