export const formatDate = (date) => {
  const options = { hour: "2-digit", minute: "2-digit", hour12: false };
  return new Date(date).toLocaleDateString("en-US", options);
};
