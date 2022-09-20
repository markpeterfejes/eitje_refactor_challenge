import { argv } from "process";

type DurationType = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

class Duration {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  
  constructor(second: number) {

  }
}

const MINUTE_SECONDS = 60;
const HOUR_SECONDS = MINUTE_SECONDS * 60;
const DAYS_SECONDS = HOUR_SECONDS * 24;
const YEAR_SECONDS = DAYS_SECONDS * 365;

function parseDuration(durationInSeconds: number): Duration {
  const years = Math.floor(durationInSeconds / YEAR_SECONDS);

  const days = Math.floor(
    (durationInSeconds - years * YEAR_SECONDS) / DAYS_SECONDS
  );

  const hours = Math.floor(
    (durationInSeconds - (years * YEAR_SECONDS + days * DAYS_SECONDS)) /
      HOUR_SECONDS
  );

  const minutes = Math.floor(
    (durationInSeconds -
      (years * YEAR_SECONDS + days * DAYS_SECONDS + hours * HOUR_SECONDS)) /
      MINUTE_SECONDS
  );

  const seconds = Math.floor(
    durationInSeconds -
      (years * YEAR_SECONDS +
        days * DAYS_SECONDS +
        hours * HOUR_SECONDS +
        minutes * MINUTE_SECONDS)
  );

  return {
    years,
    days,
    hours,
    minutes,
    seconds,
  };
}

function formatDuration(duration: number): string {
  return JSON.stringify(parseDuration(duration), undefined, 4);
}

const inputDuration = parseInt(argv[2]);

if (isNaN(inputDuration)) throw new TypeError("Please only provide numbers");

console.log(formatDuration(inputDuration));
