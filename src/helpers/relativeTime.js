// A helper function to convert a Date object to a Unix timestamp in seconds
const getTimestamp = date => Math.floor(date.getTime() / 1000);

// A helper function to get the difference in seconds between two timestamps
const getDifference = (t1, t2) => t1 - t2;

// A helper function to get the unit and value for the relative time format
const getUnitAndValue = diff => {
  const units = [
    { type: 'year', seconds: 365 * 24 * 60 * 60 },
    { type: 'month', seconds: 30 * 24 * 60 * 60 },
    { type: 'week', seconds: 7 * 24 * 60 * 60 },
    { type: 'day', seconds: 24 * 60 * 60 },
    { type: 'hour', seconds: 60 * 60 },
    { type: 'minute', seconds: 60 },
    { type: 'second', seconds: 1 },
  ];

  for (const { type, seconds } of units) {
    const value = Math.round(diff / seconds);
    if (Math.abs(value) >= 1) {
      return { unit: type, value };
    }
  }
};

// The main function to get the relative time
export const getRelativeTime = date => {
  // Get the current timestamp and the given timestamp in seconds
  const now = getTimestamp(new Date());
  const time = getTimestamp(date);

  // Get the difference in seconds between the two timestamps
  const diff = getDifference(time, now);

  // Get the unit and value for the relative time format
  const { unit, value } = getUnitAndValue(diff);

  // Create a relative time formatter with the numeric option set to auto
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // Format and return the relative time
  return rtf.format(value, unit);
};

console.log(getRelativeTime(new Date('2023-04-11T12:12:04.000Z'))); // "17 minutes ago"
console.log(getRelativeTime(new Date('2023-04-11T22:12:04.000Z'))); // "in 10 hours"
console.log(getRelativeTime(new Date('2023-04-10T12:12:04.000Z'))); // "yesterday"
console.log(getRelativeTime(new Date('2023-04-12T12:12:04.000Z'))); // "tomorrow"
console.log(getRelativeTime(new Date('2023-03-11T12:12:04.000Z'))); // "last month"
console.log(getRelativeTime(new Date('2023-05-11T12:12:04.000Z'))); // "next month"
console.log(getRelativeTime(new Date('2022-04-11T12:12:04.000Z'))); // "last ago"
console.log(getRelativeTime(new Date('2024-04-11T12:12:04.000Z'))); // "next year"
