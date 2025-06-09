import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 50
): string {
  const wordCount = text.trim().split(/\s+/).length;
  const totalMinutes = wordCount / wordsPerMinute;
  const readingDuration = dayjs.duration(totalMinutes, 'minutes');

  const minutes = readingDuration.minutes();
  const seconds = readingDuration.seconds();

  if (minutes === 0) {
    return `${seconds} seconds`;
  }

  return `${minutes} minutes ${seconds > 0 ? seconds + ' seconds' : ''}`;
}