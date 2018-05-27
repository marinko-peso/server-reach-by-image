const defaults = {
  timeout: 3000
};
const errors = {
  timeout: 'timeout',
  missing_urls: 'urls not specified',
  timeout_integer: 'timeout should be an integer'
};


class ServerReachByImage {
  constructor(options = {}) {
    this.options = Object.assign({}, defaults, options);
    this.validateParams();
  }

  reach() {
    return new Promise((resolve, reject) => {
      Promise.race([this.getImage(), this.timeout(this.options.timeout)])
        .then(() => resolve(null, true))
        .catch(e => reject(e, false))
    });
  }

  getImage() {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.onload = () => resolve();
      img.onerror = e => reject(e);
      img.src = `${this.options.url}${this.options.imgUrl}?${new Date().getTime()}`;
    });
  }

  timeout(ms) {
    const err = new Error(errors.timeout);
    return new Promise((resolve, reject) => setTimeout(() => reject(err), ms));
  }

  validateParams() {
    if (!this.options.url || !this.options.imgUrl)
        throw new Error(errors.missing_urls);

    this.options.url = this.options.url.replace(/\/+$/, '');
    if (!this.options.imgUrl.startsWith('/'))
      this.options.imgUrl = `/${this.options.imgUrl}`;

    if (!Number.isInteger(this.options.timeout))
      throw new Error(errors.timeout_integer);
  }
}

module.exports = ServerReachByImage;
