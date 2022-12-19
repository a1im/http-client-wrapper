import { parseBaseError } from 'parse-base-error';
import type { RequestResult, RequestResultSuccess } from '../types';

export function requestAssert<T extends RequestResult>(result: T, title?: string, data?: unknown): asserts result is (T & RequestResultSuccess) {
    if (!result.success) {
        throw parseBaseError(result.error, title, data);
    }
}
