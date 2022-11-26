import { Observable, Subject } from 'rxjs';
import { getRandomNumber } from '../utils/common.utils.random';

export function fakeRequest<T>(data: T): Observable<T> {
  const subject: Subject<T> = new Subject<T>();

  setTimeout(() => {
    subject.next(data);
    subject.complete();
  }, getRandomNumber(300, 1500));

  return subject.asObservable();
}
