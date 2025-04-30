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

export const calculateSpan = (durationInMonths: number) => {
  const years = Math.floor(durationInMonths / 12);
  const months = durationInMonths % 12;
  
  return `${years} Year(s) ${months} Month(s)`;
}