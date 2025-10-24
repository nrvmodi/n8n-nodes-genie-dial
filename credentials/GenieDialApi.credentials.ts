import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GenieDialApi implements ICredentialType {
	name = 'genieDialApi';
	displayName = 'GenieDial API';
	documentationUrl = 'https://geniedial.in';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your GenieDial API key',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.geniedial.in',
			url: '/api/health',
			method: 'GET',
			headers: {
				'api-key': '={{$credentials.apiKey}}',
			},
		},
	};
}

