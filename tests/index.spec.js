import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('SpotifyWrapper library', () => {
  it('should create an instance of SpotifyWrapper', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
  });
  it('should receive API_URL as an option', () => {
    let spotify = new SpotifyWrapper({
      apiURL: 'urlteste',
    });
    expect(spotify.apiURL).to.be.equal('urlteste');
  });
  it('should use the default API_URL if not provided', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });
  it('should receive token as an option', () => {
    let spotify = new SpotifyWrapper({
      token: 'foo',
    });
    expect(spotify.token).to.be.equal('foo');
  });
  describe('request method', () => {
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });
    afterEach(() => {
      stubedFetch.restore();
    });
    it('should have request method', () => {
      let spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });
    it('should call fetch when request', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the correct url', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url');
    });
    it('should call fetch with the right headers', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo',
      });
      let headers = {
        headers: {
          Authorization: `'Bearer ${spotify.token}'`,
        },
      };
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url', headers);
    });
  });
});
