const onlineStatusFormatted = (
  onlineStatus: boolean,
  lastOnlineDate: string
) => {
  if (onlineStatus) return "Онлайн";

  const onlineDate: Date = new Date(lastOnlineDate);
  const currentDate: Date = new Date();

  const milliSeconds: number = currentDate.getTime() - onlineDate.getTime();

  const seconds: number = Math.floor(milliSeconds / 1000);

  const years: number = Math.floor(seconds / 31536000);
  const months: number = Math.floor((seconds - years * 31536000) / 2592000);
  const days: number = Math.floor(
    (seconds - years * 31536000 - months * 2592000) / 86400
  );
  const hours: number = Math.floor(
    (seconds - years * 31536000 - months * 2592000 - days * 86400) / 3600
  );
  const minutes: number = Math.floor(
    (seconds -
      years * 31536000 -
      months * 2592000 -
      days * 86400 -
      hours * 3600) /
      60
  );

  if (years > 0) {
    let yearsText: string;
    if (years % 10 === 1 && years % 100 !== 11) {
      yearsText = "год";
    } else if (
      years % 10 >= 2 &&
      years % 10 <= 4 &&
      (years % 100 < 12 || years % 100 > 14)
    ) {
      yearsText = "года";
    } else {
      yearsText = "лет";
    }

    return `Был в сети ${years} ${yearsText} назад`;
  } else if (months > 0) {
    let monthtext: string;

    if (months === 1 || months === 21) {
      monthtext = "месяц";
    } else if ((months >= 2 && months <= 4) || (months >= 22 && months <= 24)) {
      monthtext = "месяца";
    } else {
      monthtext = "месяцев";
    }
    return `Был в сети ${months} ${monthtext} назад`;
  } else if (days > 0) {
    let daystext: string;
    if (days === 1 || days % 10 === 1) {
      daystext = "день";
    } else if ((days >= 2 && days <= 4) || (days % 10 >= 2 && days % 10 <= 4)) {
      daystext = "дня";
    } else {
      daystext = "дней";
    }

    return `Был в сети ${days} ${daystext} назад`;
  } else if (hours > 0) {
    let hoursText: string;
    if (hours === 1 || hours % 10 === 1) {
      hoursText = "час";
    } else if (
      (hours % 100 !== 11 && hours >= 2 && hours <= 4) ||
      (hours >= 22 && hours <= 24)
    ) {
      hoursText = "часа";
    } else {
      hoursText = "часов";
    }

    return `Был в сети ${hours}${hoursText}назад`;
  } else if (minutes > 0) {
    let minutesText: string;
    if (minutes === 1 || minutes % 10 === 1) {
      minutesText = "минута";
    } else if (
      (minutes >= 2 && minutes <= 4) ||
      (minutes >= 22 && minutes <= 24)
    ) {
      minutesText = "минуты";
    } else {
      minutesText = "минут";
    }

    return `Был в сети ${minutes} ${minutesText} назад`;
  } else return "Был в сети недавно";
};

export default onlineStatusFormatted;
