export class DateUtils {
  public static parseDate(date: string | Date): Date {
    return typeof date === 'string' ? new Date(date) : date;
  }
}
