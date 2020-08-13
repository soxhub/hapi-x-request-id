"use strict";

const chai = require('chai');
const expect = chai.expect;

const Hapi = require('@hapi/hapi');
const HapiXRequestId = require('..');

describe('x-request-id -> request.id', function () {
    let server;
    var testRequestFunction = null;
    beforeEach(async () => {
        server = new Hapi.Server();
        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                if (typeof testRequestFunction === 'function') {
                    testRequestFunction(request);
                }
                return request.id || "";
            }
        });
        testRequestFunction = null;
    });

    it('no header', async () => {
        await server.register({ plugin: HapiXRequestId });
        const requestOptions = {
            method: 'GET',
            url: '/'
        };
        let tested = false;
        let requestInfoId;
        testRequestFunction = (request) => {
            tested = true;
            requestInfoId = request.info.id;
            expect(request.id).to.equal(request.info.id);
        };
        let res = await server.inject(requestOptions);
        expect(tested).to.be.true;
        expect(res.result).to.equal(requestInfoId);
    });

    it('x-request-id passed', async () => {
        await server.register({ plugin: HapiXRequestId });
        const requestOptions = {
            method: 'GET',
            url: '/',
            headers: {
                'x-request-id': "test request id"
            }
        };
        let tested = false;
        testRequestFunction = (request) => {
            tested = true;
            expect(request.id).to.equal("test request id");
        };
        let res = await server.inject(requestOptions);
        expect(tested).to.be.true;
        expect(res.result).to.equal("test request id");
    });

    it('custom header x-trace-id passed', async () => {
        await server.register({
            plugin: HapiXRequestId,
            options: {
                header: 'x-trace-id'
            }
        });
        const requestOptions = {
            method: 'GET',
            url: '/',
            headers: {
                'x-trace-id': "test trace id"
            }
        };
        let tested = false;
        testRequestFunction = (request) => {
            tested = true;
            expect(request.id).to.equal("test trace id");
        };
        let res = await server.inject(requestOptions);
        expect(tested).to.be.true;
        expect(res.result).to.equal("test trace id");
    });
});
