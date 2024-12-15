export const frequencyInDays = (freq: String) => {
  switch (freq) {
    case "Holding":
      return -1;
    case "Half-Yearly":
      return 6;
    case "Quaterly":
      return 3;
    default:
      return 30;
  }
};
