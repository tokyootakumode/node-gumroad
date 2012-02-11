
# Gumroad

Gumroad is(obviously) client for Gumroad's API. Library covered 100% of its methods.

# Installation

```
npm install gumroad
```

# Usage

```coffee-script
gumroad = require 'gumroad'
client = new gumroad 'user', 'password'

client.authenticate (err) ->
	# your API calls go here
```

# Methods

#### authenticate(callback)

This method should be called before any other, except of **setEndpoint**. Authenticates user with given email and password, saves token for future API calls.

Params:

- callback - optional callback, which will be called with the result of authentication.

#### setEndpoint(endpoint)

Allows to set endpoint for API calls, in case it changes. Default one(https://gumroad.com/api) is already set up.

Params:

- endpoint - endpoint for the API, in case it changes(default one is already there).

#### newLink(link, callback)

Creates new link, using given options.

Params:

- link - object, which has information about the link. Example:


```javascript
link = {
	name: 'Very nice PSD',
	url: 'URL to that PSD',
	price: 1.50,
	description: 'Very long description for the PSD'
}
```

- callback - optional callback, which will be called with the error(if any) and result of request. Example:

```javascript
callback = (err, result) ->
	# don't forget to check err
```

#### getLink(id, callback)

Gets info about the link with given id.

Params:

- id - unique id of the link.
- callback - optional callback.

#### editLink(link, callback)

Edits link. Requires **id** field to be present in **link** object.

Params:

- link - object of the link. **id** field should be there.
- callback - optional callback.

#### deleteLink(id, callback)

Deletes link.

Params:

- id - unique id of the link.
- callback - optional callback.

#### getLinks(callback)

Gets the list of all links.

Params:

- callback - optional callback.

# Official docs

Official docs are located at http://gumroad.com/api. I strongly recommend you to read them all to get better idea of how the Gumroad's API and this library work.

# License 

(The MIT License)

Copyright (c) 2011 Vadim Demedes &lt;sbioko@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.