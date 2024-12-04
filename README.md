# Portainer API Client

## Example: Get a container's status

	import PortainerClient from 'portainer-api-client';
	
	const portainerUrl = process.env.PORTAINER_URL;
	const portainerUsername = process.env.PORTAINER_USERNAME;
	const portainerPassword = process.env.PORTAINER_PASSWORD;
	
	const portainer = new PortainerClient(portainerUrl, portainerUsername, portainerPassword);
	
    const container = await portainer.callApiWithKey('GET', '/api/endpoints/1/docker/containers/my_container_name/json');
    console.log(`Container's status is ${container.State?.Status}`);

## Example: Update a registry's password

	import PortainerClient from 'portainer-api-client';
	
	const portainerUrl = process.env.PORTAINER_URL;
	const portainerUsername = process.env.PORTAINER_USERNAME;
	const portainerPassword = process.env.PORTAINER_PASSWORD;
	
	const portainer = new PortainerClient(portainerUrl, portainerUsername, portainerPassword);
	
	let registries = await portainer.callApiWithKey('get', '/api/registries');
	registry = registries[0]
	
	registry.Username = 'newusername';
	registry.Password = 'newusername';

	await portainer.callApiWithKey('PUT', `/api/registries/${registry.Id}`, registry);

## TODOs

* Convenience functions
* Documentation