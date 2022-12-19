# http-client-wrapper

[![NPM](https://img.shields.io/npm/v/http-client-wrapper.svg?style=flat-square)](https://www.npmjs.com/package/http-client-wrapper)
[![Downloads](https://img.shields.io/npm/dm/http-client-wrapper?style=flat-square)](https://www.npmjs.com/package/http-client-wrapper)

A single interface for queries, allows you to use your favorite library for queries

## Install
```
yarn add http-client-wrapper
# or
npm i http-client-wrapper
```

## Example

```ts
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
```

## License
MIT
