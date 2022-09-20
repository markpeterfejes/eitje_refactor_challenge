import { argv } from "process";

type Duration = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function formatDuration(duration: number | string): string {
  return duration.toString();
}

console.log(formatDuration(argv[2]));
