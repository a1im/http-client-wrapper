import type { HttpClientWrapperRequestOptions } from '../types';

export const getRequestCacheKey = (url: string, options: HttpClientWrapperRequestOptions): string => JSON.stringify([
    url,
    options.method,
    options.params,
    options.queryParams,
    options.headers,
    options.withCredentials,
]);
