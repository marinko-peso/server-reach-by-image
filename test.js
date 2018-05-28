ServerReachByImage = require('./index');

describe('params not specified', () => {
  const options = {
    url: 'https://www.google.com'
  };

  it('should return not specified error for 1 missing url', () => {
    expect(() => {
      new ServerReachByImage(options);
    }).toThrow('Url param(s) not specified');
  });

  it('should return not specified error for both missing urls', () => {
    expect(() => {
      new ServerReachByImage()
    }).toThrow('Url param(s) not specified');
  });
});

describe('url params should get fixed', () => {
  const options = {
    url: 'https://www.test-reach-dummy.com/',
    imgUrl: 'test-reach-dummy.png'
  };
  const serverReach = new ServerReachByImage(options);

  it('by removing extra / from url param', () => {
    return expect(serverReach.options.url).toBe('https://www.test-reach-dummy.com');
  });

  it('by adding missing / in imgUrl param', () => {
    return expect(serverReach.options.imgUrl).toBe('/test-reach-dummy.png');
  });
});

describe('timeout param', () => {
  const options = {
    url: 'https://www.test-reach-dummy.com',
    imgUrl: '/test-reach-dummy.png',
    timeout: 'i_am_a_number'
  };

  it('should be an integer', () => {
    expect(() => {
      new ServerReachByImage(options);
    }).toThrow('Timeout param should be an integer');
  });
});
