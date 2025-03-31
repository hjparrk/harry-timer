import { format } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "eeee - dd MMMM yyyy");
};

export const formatTime = (date: Date, is24Hour: boolean) => {
  return format(date, is24Hour ? "HH:mm:ss" : "h:mm:ss a");
};
