import dayjs from "dayjs";

export const deadline = () => {
  return dayjs(new Date()).add(3, 'second').toDate();
}

export const isValidTime = (deadline:Date) => {
  return dayjs(new Date()).isBefore(deadline,"second");
}