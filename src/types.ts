import type { ParsedBaseError } from 'parse-base-error';
import type { HttpClientWrapperMethod } from './HttpClientWrapperMethod';

export interface RequestResultSuccess<T = unknown> {
    data: T
    success: true
    error?: undefined
}
export interface RequestResultError {
    error: ParsedBaseError
    success: false
}
export type RequestResult<T = unknown> = RequestResultSuccess<T> | RequestResultError;
export interface CreateRequestOptions {
    attempts?: number // сколько раз повторять запрос если условие isRepeat === true
    repeatStrategy?: (currentAttempts: number, error: ParsedBaseError) => Promise<boolean> | boolean
}
export interface BaseCallback<Params extends unknown[], Response> {
    (...args: Params): Promise<Response>
}
export interface BaseRequestType<Params extends unknown[], Response> extends BaseCallback<Params, RequestResult<Response>> {
}
export interface RequestType<Params extends unknown[], Response> extends BaseRequestType<Params, Response> {
    withLog: BaseRequestType<Params, Response>
    exception: (...args: Params) => Promise<Response>
    withLogException: (...args: Params) => Promise<Response>
}

export interface HttpClientWrapperProxy {
    host: string
    port: number
    user?: string
    pass?: string
}
export interface HttpClientWrapperRequestOptions {
    method?: HttpClientWrapperMethod
    params?: Record<string, any>
    queryParams?: Record<string, any>
    headers?: Record<string, string>
    withCredentials?: boolean
    cacheTimeInSeconds?: number
    timeout?: number
    proxy?: HttpClientWrapperProxy
}
export interface HttpClientWrapperOptionsRequest {
    (url: string, options: HttpClientWrapperRequestOptions): Promise<any>
}
export interface HttpClientWrapperCacheServiceItem<T> {
    data: T
}
export interface HttpClientWrapperCacheService {
    get?: <T>(key: string) => Promise<HttpClientWrapperCacheServiceItem<T> | undefined>
    set?: <T>(key: string, value: HttpClientWrapperCacheServiceItem<T>, expireInSeconds?: number) => Promise<void>
}
export interface HttpClientWrapperOptions {
    request: HttpClientWrapperOptionsRequest
    cacheService?: HttpClientWrapperCacheService
    updateOptions?: (url: string, options?: HttpClientWrapperRequestOptions) => HttpClientWrapperRequestOptions
    getCacheKey?: (url: string, options: HttpClientWrapperRequestOptions) => string
}
export interface HttpClientWrapperContext {
    request: HttpClientWrapperOptions['request']
    cacheService?: HttpClientWrapperOptions['cacheService']
    updateOptions?: HttpClientWrapperOptions['updateOptions']
    getCacheKey?: HttpClientWrapperOptions['getCacheKey']
}
export interface HttpClientWrapperRequest {
    <T>(url: string, options?: HttpClientWrapperRequestOptions): Promise<RequestResult<T>>
    withLog<T>(url: string, options?: HttpClientWrapperRequestOptions): Promise<RequestResult<T>>
    exception<T>(url: string, options?: HttpClientWrapperRequestOptions): Promise<T>
    withLogException<T>(url: string, options?: HttpClientWrapperRequestOptions): Promise<T>
}
export interface HttpClientWrapper {
    request: HttpClientWrapperRequest
    getRequest: HttpClientWrapperRequest
    postRequest: HttpClientWrapperRequest
}
export interface CreateHttpClientWrapper {
    (httpClientOptions: HttpClientWrapperOptions): HttpClientWrapper
}
