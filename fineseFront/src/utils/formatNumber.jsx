export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else if (num >= 1) {
    return num.toFixed(1);
  } else if (num > 0) {
    return num.toFixed(2);  // Format numbers less than 1 with 2 decimal places
  } else {
    return "0";
  }
};
