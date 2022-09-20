import { argv } from "process";

const MINUTE_SECONDS = 60;
const HOUR_SECONDS = MINUTE_SECONDS * 60;
const DAYS_SECONDS = HOUR_SECONDS * 24;
const YEAR_SECONDS = DAYS_SECONDS * 365;

/**
 * TODO: create setters to prevent setting units higher than they should be and to recalculate the second duration
 * TODO: localization and different method of pluralization
 */
class Duration {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  private readonly printOrder = [
    "years",
    "days",
    "hours",
    "minutes",
    "seconds",
  ] as const;

  private readonly dateComponentLabels = {
    years: "year",
    days: "day",
    hours: "hour",
    minutes: "minute",
    seconds: "second",
  } as const;

  constructor(public durationInSeconds: number) {
    if (isNaN(durationInSeconds) || durationInSeconds < 0)
      throw new TypeError("Please only provide positive integers");

    this.years = Math.floor(durationInSeconds / YEAR_SECONDS);

    this.days = Math.floor(
      (durationInSeconds - this.years * YEAR_SECONDS) / DAYS_SECONDS
    );

    this.hours = Math.floor(
      (durationInSeconds -
        (this.years * YEAR_SECONDS + this.days * DAYS_SECONDS)) /
        HOUR_SECONDS
    );

    this.minutes = Math.floor(
      (durationInSeconds -
        (this.years * YEAR_SECONDS +
          this.days * DAYS_SECONDS +
          this.hours * HOUR_SECONDS)) /
        MINUTE_SECONDS
    );

    this.seconds = Math.floor(
      durationInSeconds -
        (this.years * YEAR_SECONDS +
          this.days * DAYS_SECONDS +
          this.hours * HOUR_SECONDS +
          this.minutes * MINUTE_SECONDS)
    );
  }

  /** This could be of course further complexioned and injected in the class depending on the locale  */
  pluralize(toPluralize: string, count: number) {
    if (count > 1) {
      return toPluralize + "s";
    } else {
      return toPluralize;
    }
  }

  isNow() {
    return this.durationInSeconds === 0;
  }

  getSeparator(
    numberOfComponentsToPrint: number,
    currentPositionIndex: number
  ) {
    if (currentPositionIndex === 0) {
      return "";
    } else if (currentPositionIndex === numberOfComponentsToPrint - 1) {
      return " and ";
    } else {
      return ", ";
    }
  }

  toString() {
    if (this.isNow()) {
      return "now";
    }

    return this.printOrder
      .filter((dateComponent) => this[dateComponent] > 0)
      .reduce((acc, currentDateComponent, index, originalArray) => {
        return (
          acc +
          this.getSeparator(originalArray.length, index) +
          this[currentDateComponent] +
          " " +
          this.pluralize(
            this.dateComponentLabels[currentDateComponent],
            this[currentDateComponent]
          )
        );
      }, "");
  }
}

const inputDuration = parseInt(argv[2]);

console.log(new Duration(inputDuration).toString());
