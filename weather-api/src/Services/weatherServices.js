import { format, parseISO } from "date-fns";

export const DateTimeConverter = (date) => {
  try {
    const formattedDate = format(
      date,
      "EEEE, dd MMMM yyyy | 'Local Time : 'hh:mm aa"
    );
    return formattedDate;
  } catch (error) {
    console.error("Error converting date:", error);
    return "Invalid Date"; // Return a default value or error message
  }
};


export const DateConverter = (date) => {
  const formattedDate = format(date, "EEEE, dd MMMM yyyy");
  return formattedDate;
};
