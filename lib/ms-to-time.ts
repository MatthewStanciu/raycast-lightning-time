const msToTime = (millis: number) => {
  const ms = millis % 1000;
  millis = (millis - ms) / 1000;
  const secs = millis % 60;
  millis = (millis - secs) / 60;
  const mins = millis % 60;
  const hrs = (millis - mins) / 60;

  const date = new Date();
  date.setHours(hrs);
  date.setMinutes(mins);
  date.setSeconds(secs);

  return date.toLocaleTimeString();
};

export default msToTime;