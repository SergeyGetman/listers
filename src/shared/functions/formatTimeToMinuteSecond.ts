export const formatTimeToMinuteSecond = (seconds?: number): string => {
  if (!seconds) {
    return '';
  }
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;

  let formattedTime: string = '';

  if (minutes > 0) {
    formattedTime += `${minutes}m `;
  }

  formattedTime += `${remainingSeconds}sec`;

  return formattedTime;
};
