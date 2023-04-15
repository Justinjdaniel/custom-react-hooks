import { useEffect, useState } from 'react';

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

const useRelativeTime = date => {
  const [relativeTime, setRelativeTime] = useState('');

  useEffect(() => {
    const updateRelativeTime = () => {
      const now = getTimestamp(new Date());
      const time = getTimestamp(date);
      const diff = getDifference(time, now);
      const { unit, value } = getUnitAndValue(diff);
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      setRelativeTime(rtf.format(value, unit));
    };

    updateRelativeTime();
  }, [date]);

  return relativeTime;
};

export default useRelativeTime;
