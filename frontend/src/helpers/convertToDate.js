const convertToDate = (createAt) => {
  const date = new Date(createAt);  // Convert MongoDB date to JavaScript Date object

  const dateString = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return dateString;  // Return in the format 'DD/MM/YYYY'
}

const convertToTime = (timestamp) => {
  const date = new Date(timestamp);

  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return timeString
}
export { convertToDate, convertToTime }