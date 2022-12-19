import { createHttpClientWrapper, HttpClientWrapperMethod, HttpClientWrapperRequestOptions } from './index';

const request = async (url: string, options: HttpClientWrapperRequestOptions) => {
    /**
     * Make a request using any library, for example "axios"
     * In this example, display the request arguments
     */
    return [url, options];
};
const httpClient = createHttpClientWrapper({
    request,
    /** you can add a cache service */
    // cacheService,
});

const exampleRequest = async (method: HttpClientWrapperMethod) => {
    const response = await httpClient.request('http://example.com/hello/world', {
        method,
        params: {
            hello: 'World',
        },
    });

    if (response.success) {
        console.log(response.data);
    } else {
        console.log(response.error);
    }
};
const exampleExceptionPostRequest = async () => {
    try {
        const data = await httpClient.postRequest.exception('http://example.com/hello/world');

        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

exampleRequest(HttpClientWrapperMethod.GET); // [ 'http://example.com/hello/world', { params: { hello: 'World' }, method: 'GET' } ]
exampleRequest(HttpClientWrapperMethod.POST); // [ 'http://example.com/hello/world', { params: { hello: 'World' }, method: 'POST' } ]
exampleExceptionPostRequest(); // [ 'http://example.com/hello/world', method: 'POST' } ]
