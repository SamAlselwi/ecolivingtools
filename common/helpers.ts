import { format } from "date-fns";


export const formatDate = (date: Date, fr = 'yyyy-mm-dd') => {
  return format(date, fr);
}
