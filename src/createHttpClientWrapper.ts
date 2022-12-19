import type { CreateHttpClientWrapper, HttpClientWrapperRequest } from './types';
import { HttpClientWrapperMethod } from './HttpClientWrapperMethod';
import { httpClientWrapperRequest } from './helpers/httpClientWrapperRequest';
import { createRequest } from './createRequest';

export const createHttpClientWrapper: CreateHttpClientWrapper = (httpClientWrapperOptions) => {
    const context = {
        ...httpClientWrapperOptions,
    };
    const request: HttpClientWrapperRequest = createRequest(async (url, options): Promise<any> => httpClientWrapperRequest(context, url, options));
    const getRequest: HttpClientWrapperRequest = createRequest(async (url, options): Promise<any> => httpClientWrapperRequest(context, url, {
        ...options,
        method: HttpClientWrapperMethod.GET,
    }));
    const postRequest: HttpClientWrapperRequest = createRequest(async (url, options): Promise<any> => httpClientWrapperRequest(context, url, {
        ...options,
        method: HttpClientWrapperMethod.POST,
    }));

    return {
        request,
        getRequest,
        postRequest,
    };
};
