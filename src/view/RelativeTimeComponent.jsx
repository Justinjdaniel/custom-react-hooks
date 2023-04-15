import React from 'react'
import useRelativeTime from '../hooks/useRelativeTime';

const RelativeTime = () => {
  const date = new Date('2023-01-01');
  const relativeTime = useRelativeTime(date);

  return <div>{relativeTime}</div>;
}

export default RelativeTime