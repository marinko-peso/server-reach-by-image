function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var defaults = {
  timeout: 2500
};
var errors = {
  load_timeout: 'Loading image timed out',
  load_fail: 'Loading image failed',
  param_missing_urls: 'Url param(s) not specified',
  param_timeout_integer: 'Timeout param should be an integer'
};

var ServerReachByImage =
/*#__PURE__*/
function () {
  function ServerReachByImage() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ServerReachByImage);

    this.options = Object.assign({}, defaults, options);
    this.validateParams();
  }

  _createClass(ServerReachByImage, [{
    key: "load",
    value: function load() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        /* eslint-disable prefer-promise-reject-errors */
        var fail = function fail(msg) {
          return reject({
            msg: new Error(msg),
            status: false
          });
        };
        /* eslint-disable no-undef */


        var img = new Image();

        img.onload = function () {
          return resolve({
            msg: null,
            status: true
          });
        };

        img.onerror = function (e) {
          return fail(errors.load_fail);
        };

        img.src = "".concat(_this.options.url).concat(_this.options.imgUrl, "?").concat(new Date().getTime());
        setTimeout(function () {
          return fail(errors.load_timeout);
        }, _this.options.timeout);
      });
    }
  }, {
    key: "validateParams",
    value: function validateParams() {
      if (!this.options.url || !this.options.imgUrl) {
        throw new Error(errors.param_missing_urls);
      }

      this.options.url = this.options.url.replace(/\/+$/, '');

      if (!this.options.imgUrl.startsWith('/')) {
        this.options.imgUrl = "/".concat(this.options.imgUrl);
      }

      if (!Number.isInteger(this.options.timeout)) {
        throw new Error(errors.param_timeout_integer);
      }
    }
  }]);

  return ServerReachByImage;
}();

module.exports = ServerReachByImage;
