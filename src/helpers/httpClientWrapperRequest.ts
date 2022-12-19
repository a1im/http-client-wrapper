import { parseBaseError } from 'parse-base-error';
import type {
    HttpClientWrapperContext,
    HttpClientWrapperRequestOptions,
} from '../types';
import { httpClientWrapperRequestWitchCache } from './httpClientWrapperRequestWitchCache';

export const httpClientWrapperRequest = async <T>(
    context: HttpClientWrapperContext,
    url: string,
    options?: HttpClientWrapperRequestOptions,
): Promise<T> => {
    const requestOptions = context.updateOptions?.(url, options) ?? options;

    try {
        const result = await httpClientWrapperRequestWitchCache<T>(context, url, requestOptions);

        return result;
    } catch (e) {
        throw parseBaseError(
            e,
            [
                'HttpClientWrapperRequest',
                JSON.stringify([
                    url,
                    requestOptions,
                ]),
            ].join(' '),
        );
    }
};
