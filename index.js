const defaults = {
  url: 'https://upload.wikimedia2.org',
  imgUrl: '/wikipedia/commons/thumb/d/db/Npm-logo.svg/440px-Npm-logo.svg.png',
  timeout: 2500
};


class ServerReachByImage {
  constructor(options = {}) {
    this.options = Object.assign({}, defaults, options);
  }

  reach() {
    return new Promise((resolve, reject) => {
      Promise.race([this.getImage(), this.timeout(this.options.timeout)])
        .then(() => resolve())
        .catch(e => reject(e))
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
    const err = new Error('timeout');
    return new Promise((resolve, reject) => setTimeout(() => reject(err), ms));
  }
}


module.exports = ServerReachByImage;
