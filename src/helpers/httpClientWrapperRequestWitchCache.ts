import { getRequestCacheKey } from './getRequestCacheKey';
import type { HttpClientWrapperContext, HttpClientWrapperRequestOptions } from '../types';

export const httpClientWrapperRequestWitchCache = async <T>(
    context: HttpClientWrapperContext,
    url: string,
    options: HttpClientWrapperRequestOptions = {},
): Promise<T> => {
    const {
        request,
        cacheService,
        getCacheKey = getRequestCacheKey,
    } = context;

    if (!cacheService || options.cacheTimeInSeconds === undefined) {
        return request(url, options);
    }
    const cacheKey = getCacheKey(url, options);
    const cacheData = await cacheService.get?.<T>(cacheKey);

    if (cacheData) {
        return cacheData.data;
    }

    const result = await request(url, options);

    // сохраним в кэш
    // если надо установить время кэша
    cacheService.set?.<T>(
        cacheKey,
        { data: result },
        options.cacheTimeInSeconds === 0
            ? undefined
            : options.cacheTimeInSeconds,
    ).catch();

    return result;
};
