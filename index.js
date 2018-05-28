const defaults = {
  timeout: 2500
};
const errors = {
  load_timeout: 'Loading image timed out',
  load_fail: 'Loading image failed',
  param_missing_urls: 'Url param(s) not specified',
  param_timeout_integer: 'Timeout param should be an integer'
};

class ServerReachByImage {
  constructor(options = {}) {
    this.options = Object.assign({}, defaults, options);
    this.validateParams();
  }

  load() {
    return new Promise((resolve, reject) => {
      const fail = msg => reject(new Error(msg), false);

      const img = new Image();
      img.onload = () => resolve(null, true);
      img.onerror = e => fail(errors.load_fail);
      img.src = `${this.options.url}${this.options.imgUrl}?${new Date().getTime()}`;

      setTimeout(() => fail(errors.load_timeout), this.options.timeout);
    });
  }

  validateParams() {
    if (!this.options.url || !this.options.imgUrl)
      throw new Error(errors.param_missing_urls);

    this.options.url = this.options.url.replace(/\/+$/, '');
    if (!this.options.imgUrl.startsWith('/'))
      this.options.imgUrl = `/${this.options.imgUrl}`;

    if (!Number.isInteger(this.options.timeout))
      throw new Error(errors.param_timeout_integer);
  }
}

module.exports = ServerReachByImage;
