import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

module.exports = {
  now: () => {
    return dayjs(new Date()).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
  }
}
