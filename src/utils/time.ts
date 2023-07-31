export default function getFormattedTimeElapsed(createdAt: Date) {
  const currentTime = new Date();
  const createdAtDate = new Date(createdAt);
  const timeDifferenceInMilliseconds =
    currentTime.getTime() - createdAtDate.getTime();
  const timeDifferenceInSeconds = Math.floor(
    timeDifferenceInMilliseconds / 1000
  );
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
  const timeDifferenceInMonths = Math.floor(timeDifferenceInDays / 30);
  const timeDifferenceInYears = Math.floor(timeDifferenceInDays / 365);

  if (timeDifferenceInYears > 0) {
    return `${timeDifferenceInYears} yıl önce`;
  } else if (timeDifferenceInMonths > 0) {
    return `${timeDifferenceInMonths} ay önce`;
  } else if (timeDifferenceInDays > 0) {
    return `${timeDifferenceInDays} gün önce`;
  } else if (timeDifferenceInHours > 0) {
    return `${timeDifferenceInHours} saat önce`;
  } else if (timeDifferenceInMinutes > 0) {
    return `${timeDifferenceInMinutes} dakika önce`;
  } else {
    return `${timeDifferenceInSeconds} saniye önce`;
  }
}
