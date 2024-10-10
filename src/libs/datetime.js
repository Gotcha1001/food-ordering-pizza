export default function dbTimeForHuman(str) {
  const date = new Date(str);

  // Format the date to "12 September 2005 11:03"
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("en-GB", options).replace(",", "");
}
