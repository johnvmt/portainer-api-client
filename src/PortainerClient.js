// API examples: https://gist.github.com/deviantony/77026d402366b4b43fa5918d41bc42f8

class PortainerClient {
	constructor(apiHost, username, password) {
		this._apiHost = apiHost.replace(/\/$/, '');
		this._username = username;
		this._password = password;
	}

	async callApiWithKey(requestMethod, apiPath, requestData) {
		if(!this._authToken)
			await this.setAuthToken();

		try {
			return await this.callApi(requestMethod, apiPath, requestData, this.postHeaders());
		}
		catch(error) {
			// Retry after refreshing the token
			await this.setAuthToken();
			return await this.callApi(requestMethod, apiPath, requestData, this.postHeaders());
		}
	}

	async callApi(requestMethod, apiPath, requestData, requestHeaders = {}) {
		const url = `${this._apiHost}${apiPath}`;
		const options = {
			method: requestMethod.toUpperCase(),
			headers: {
				'Content-Type': 'application/json',
				...requestHeaders
			},
			body: requestData ? JSON.stringify(requestData) : undefined
		};

		const response = await fetch(url, options);

		if (!response.ok)
			throw new Error(`HTTP error! Status: ${response.status}`);

		return response.json();
	}

	async setAuthToken() {
		const authData = await this.callApi('POST', '/api/auth', {
			username: this._username,
			password: this._password
		});

		this._authToken = authData.jwt;
	}

	postHeaders() {
		return {
			Authorization: `Bearer ${this._authToken}`
		};
	}
}

export default PortainerClient;