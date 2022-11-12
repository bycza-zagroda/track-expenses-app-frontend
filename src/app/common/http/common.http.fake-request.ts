import { Observable, Subject } from 'rxjs';
import { getRandomBoolean, getRandomNumber } from '../utils/common.utils.random';

export function fakeRequest<T>(data: T): Observable<T> {
  const subject: Subject<T> = new Subject();

  setTimeout(() => {
    const shouldSucceed: boolean = getRandomBoolean(0.95);

    if (shouldSucceed) {
      subject.next(data);
    } else {
      subject.error(new Error('Something went wrong'));
    }

    subject.complete();
  }, getRandomNumber(300, 1500));

  return subject.asObservable();
}
