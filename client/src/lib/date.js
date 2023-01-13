import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const formateDate = (date) => {
    return dayjs(date).format('MMMM D, YYYY')
}

export const dateYearAgo  = (date) => {
    return dayjs().to(dayjs(date))
}