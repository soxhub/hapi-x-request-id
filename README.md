[![Build Status](https://travis-ci.org/soxhub/hapi-x-request-id.svg?branch=master)](https://travis-ci.org/soxhub/hapi-forwarded-for)

# hapi-x-request-id

hapi.js v17+ plugin: sets `request.id` from `x-request-id` (or custom like `x-amzn-trace-id`) header

### Installation
```
npm install --save hapi-x-request-id
```
or
```
yarn add hapi-x-request-id
```


### Usage

``` javascript
let server = new Hapi.Server();
await server.register({
    plugin: require('hapi-x-request-id'),
    options: {
        header: 'x-amzn-trace-id' // optional
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return request.id;
    }
});
```

## License

MIT