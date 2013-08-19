request = require 'request'

class Gumroad
	
	constructor: (@email, @password) ->
		do @setEndpoint
	
	setEndpoint: (@endpoint = 'https://gumroad.com/api/v1') ->
	
	authenticate: (callback) ->
		that = @
		request
			method: 'POST'
			uri: @endpoint + '/sessions'
			form:
				email: @email
				password: @password
		, (err, res, body) ->
			err = not not err
			if not err
				response = JSON.parse body
				if response.success
					that.token = (new Buffer response.token + ':').toString 'base64'
					err = no
				else
					err = response.error
			process.nextTick ->
				callback err if callback
	
	newLink: (link, callback) ->
		throw new Error 'You should authenticate before querying Gumroad\'s API' if not @token
		that = @
		request
			method: 'POST'
			uri: @endpoint + '/products'
			headers:
				Authorization: 'Basic ' + @token
			form:
				name: link.name
				url: link.url
				price_cents: parseFloat(link.price) * 100
				price: parseFloat(link.price) * 100
				description: link.description
				currency: link.currency
			, (err, res, body) ->
				err = not not err
				if not err
					response = JSON.parse body
					if response.success
						result = response.link
						err = no
					else
						result = {}
						err = response.error
				process.nextTick ->
					callback err, result if callback
	
	getLinks: (callback) ->
		throw new Error 'You should authenticate before querying Gumroad\'s API' if not @token
		request
			method: 'GET'
			uri: @endpoint + '/products'
			headers:
				Authorization: 'Basic ' + @token
		, (err, res, body) ->
			err = not not err
			if not err
				response = JSON.parse body
				if response.success
					result = response.links
					err = no
				else
					result = []
					err = response.error
			process.nextTick ->
				callback err, result if callback
	
	getLink: (id, callback) ->
		throw new Error 'You should authenticate before querying Gumroad\'s API' if not @token
		that = @
		request
			method: 'GET'
			uri: @endpoint + '/products/' + id
			headers:
				Authorization: 'Basic ' + @token
		, (err, res, body) ->
			err = not not err
			if not err
				response = JSON.parse body
				if response.success
					result = response.link
					err = no
				else
					result = {}
					err = response.error
			process.nextTick ->
				callback err, result if callback
	
	editLink: (link, callback) ->
		throw new Error 'You should authenticate before querying Gumroad\'s API' if not @token
		that = @
		request
			method: 'PUT'
			uri: @endpoint + '/products/' + link.id
			headers:
				Authorization: 'Basic ' + @token
			form:
				name: link.name
				url: link.url
				price: parseFloat(link.price) * 100
				price_cents: parseFloat(link.price) * 100
				description: link.description
				currency: link.currency
			, (err, res, body) ->
				err = not not err
				if not err
					response = JSON.parse body
					if response.success or response.link
						result = response.link
						err = no
					else
						result = {}
						err = response.error
				process.nextTick ->
					callback err, result if callback
	
	deleteLink: (id, callback) ->
		throw new Error 'You should authenticate before querying Gumroad\'s API' if not @token
		request
			method: 'DELETE'
			uri: @endpoint + '/products/' + id
			headers:
				Authorization: 'Basic ' + @token
			, (err, res, body) ->
				err = not not err
				if not err
					response = JSON.parse body
					if response.success
						result = yes
						err = no
					else
						result = no
						err = response.error
				process.nextTick ->
					callback err, result if callback


module.exports = Gumroad