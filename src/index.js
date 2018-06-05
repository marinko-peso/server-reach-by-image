const defaults = {
  timeout: 2500
};
const errors = {
  E_LOAD_TIMEOUT: 'Loading image timed out',
  E_LOAD_FAIL: 'Loading image failed'
};

class ServerReachByImage {
  constructor(options = {}) {
    this.options = Object.assign({}, defaults, options);
    this.validateParams();
  }

  load() {
    return new Promise((resolve, reject) => {
      const fail = code => reject(Object.assign(new Error(errors[code]), { status: false, code }));

      const img = new window.Image();
      img.onload = () => resolve({ msg: null, status: true });
      img.onerror = e => fail('E_LOAD_FAIL');
      img.src = `${this.options.url}${this.options.imgUrl}?${new Date().getTime()}`;

      setTimeout(() => fail('E_LOAD_TIMEOUT'), this.options.timeout);
    });
  }

  validateParams() {
    if (!this.options.url || !this.options.imgUrl) {
      throw new Error('Url param(s) not specified');
    }

    this.options.url = this.options.url.replace(/\/+$/, '');
    if (!this.options.imgUrl.startsWith('/')) {
      this.options.imgUrl = `/${this.options.imgUrl}`;
    }

    if (!Number.isInteger(this.options.timeout)) {
      throw new TypeError('Timeout param should be an integer');
    }
  }
}

ServerReachByImage.errors = Object.keys(errors);
module.exports = ServerReachByImage;
