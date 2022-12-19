import { parseBaseError } from 'parse-base-error';
import type {
    BaseCallback,
    BaseRequestType,
    CreateRequestOptions,
    RequestType,
} from './types';

export const createRequest = <
    Params extends unknown[],
    Response,
>(
    cb: BaseCallback<Params, Response>,
    options?: CreateRequestOptions,
) => {
    const maxAttempts = options?.attempts ?? 3;
    let currentAttempts = 0;
    const baseRequest: BaseRequestType<Params, Response> = async (...args) => {
        try {
            const data = await cb(...args);

            return {
                success: true,
                data,
            };
        } catch (e) {
            const error = parseBaseError(e, 'Request');
            const isAttempts = maxAttempts > currentAttempts;
            const isRepeat = isAttempts && options?.repeatStrategy
                ? await options.repeatStrategy(currentAttempts, error)
                : false;

            if (isRepeat) {
                currentAttempts += 1;

                return baseRequest(...args);
            }

            return {
                success: false,
                error,
            };
        }
    };
    const request: RequestType<Params, Response> = async (...args) => {
        currentAttempts = 0;

        return baseRequest(...args);
    };

    request.withLog = async (...args) => {
        const result = await request(...args);

        if (!result.success) {
            result.error.log();
        }

        return result;
    };
    request.exception = async (...args) => {
        const result = await request(...args);

        if (!result.success) {
            throw result.error;
        }

        return result.data;
    };
    request.withLogException = async (...args) => {
        const result = await request.withLog(...args);

        if (!result.success) {
            throw result.error;
        }

        return result.data;
    };

    return request;
};
