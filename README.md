# Portainer API Client
	
## Example: Update a registry's password

	const PortainerClient = require('portainer-api-client');
	
	const portainerUrl = process.env.PORTAINER_URL;
	const portainerUsername = process.env.PORTAINER_USERNAME;
	const portainerPassword = process.env.PORTAINER_PASSWORD;
	
	const portainer = new PortainerClient(portainerUrl, portainerUsername, portainerPassword);
	
	let registries = await portainer.callApiWithKey('get', '/api/registries');
	registry = registries[0]
	
	registry.Username = 'newusername';
	registry.Password = 'newusername';

	await portainer.callApiWithKey('PUT', '/api/registries/' + registry.Id, registry);

## TODOs

* Convenience functions
* Documentation