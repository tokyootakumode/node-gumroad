var Gumroad, request;

request = require('request');

Gumroad = (function() {

  function Gumroad(email, password) {
    this.email = email;
    this.password = password;
    this.setEndpoint();
  }

  Gumroad.prototype.setEndpoint = function(endpoint) {
    this.endpoint = endpoint != null ? endpoint : 'https://gumroad.com/api/v1';
  };

  Gumroad.prototype.authenticate = function(callback) {
    var that;
    that = this;
    return request({
      method: 'POST',
      uri: this.endpoint + '/sessions',
      form: {
        email: this.email,
        password: this.password
      }
    }, function(err, res, body) {
      var response;
      err = !!err;
      if (!err) {
        response = JSON.parse(body);
        if (response.success) {
          that.token = (new Buffer(response.token + ':')).toString('base64');
          err = false;
        } else {
          err = response.error;
        }
      }
      return process.nextTick(function() {
        if (callback) return callback(err);
      });
    });
  };

  Gumroad.prototype.newLink = function(link, callback) {
    var that;
    if (!this.token) {
      throw new Error('You should authenticate before querying Gumroad\'s API');
    }
    that = this;
    return request({
      method: 'POST',
      uri: this.endpoint + '/products',
      headers: {
        Authorization: 'Basic ' + this.token
      },
      form: {
        name: link.name,
        url: link.url,
        price_cents: parseFloat(link.price) * 100,
        price: parseFloat(link.price) * 100,
        description: link.description,
        currency: link.currency
      }
    }, function(err, res, body) {
      var response, result;
      err = !!err;
      if (!err) {
        response = JSON.parse(body);
        if (response.success) {
          result = response.link;
          err = false;
        } else {
          result = {};
          err = response.error;
        }
      }
      return process.nextTick(function() {
        if (callback) return callback(err, result);
      });
    });
  };

  Gumroad.prototype.getLinks = function(callback) {
    if (!this.token) {
      throw new Error('You should authenticate before querying Gumroad\'s API');
    }
    return request({
      method: 'GET',
      uri: this.endpoint + '/products',
      headers: {
        Authorization: 'Basic ' + this.token
      }
    }, function(err, res, body) {
      var response, result;
      err = !!err;
      if (!err) {
        response = JSON.parse(body);
        if (response.success) {
          result = response.links;
          err = false;
        } else {
          result = [];
          err = response.error;
        }
      }
      return process.nextTick(function() {
        if (callback) return callback(err, result);
      });
    });
  };

  Gumroad.prototype.getLink = function(id, callback) {
    var that;
    if (!this.token) {
      throw new Error('You should authenticate before querying Gumroad\'s API');
    }
    that = this;
    return request({
      method: 'GET',
      uri: this.endpoint + '/products/' + id,
      headers: {
        Authorization: 'Basic ' + this.token
      }
    }, function(err, res, body) {
      var response, result;
      err = !!err;
      if (!err) {
        response = JSON.parse(body);
        if (response.success) {
          result = response.link;
          err = false;
        } else {
          result = {};
          err = response.error;
        }
      }
      return process.nextTick(function() {
        if (callback) return callback(err, result);
      });
    });
  };

  Gumroad.prototype.editLink = function(link, callback) {
    var that;
    if (!this.token) {
      throw new Error('You should authenticate before querying Gumroad\'s API');
    }
    that = this;
    return request({
      method: 'PUT',
      uri: this.endpoint + '/products/' + link.id,
      headers: {
        Authorization: 'Basic ' + this.token
      },
      form: {
        name: link.name,
        url: link.url,
        price: parseFloat(link.price) * 100,
        price_cents: parseFloat(link.price) * 100,
        description: link.description,
        currency: link.currency
      }
    }, function(err, res, body) {
      var response, result;
      err = !!err;
      if (!err) {
        response = JSON.parse(body);
        if (response.success || response.link) {
          result = response.link;
          err = false;
        } else {
          result = {};
          err = response.error;
        }
      }
      return process.nextTick(function() {
        if (callback) return callback(err, result);
      });
    });
  };

  Gumroad.prototype.deleteLink = function(id, callback) {
    if (!this.token) {
      throw new Error('You should authenticate before querying Gumroad\'s API');
    }
    return request({
      method: 'DELETE',
      uri: this.endpoint + '/products/' + id,
      headers: {
        Authorization: 'Basic ' + this.token
      }
    }, function(err, res, body) {
      var response, result;
      err = !!err;
      if (!err) {
        response = JSON.parse(body);
        if (response.success) {
          result = true;
          err = false;
        } else {
          result = false;
          err = response.error;
        }
      }
      return process.nextTick(function() {
        if (callback) return callback(err, result);
      });
    });
  };

  return Gumroad;

})();

module.exports = Gumroad;
