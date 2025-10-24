import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class GenieDial implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GenieDial',
		name: 'genieDial',
		icon: 'file:geniedial.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Make AI calls using GenieDial service',
		defaults: {
			name: 'GenieDial',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'genieDialApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Lead Call',
						value: 'leadCall',
					},
				],
				default: 'leadCall',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['leadCall'],
					},
				},
				options: [
					{
						name: 'Make Call',
						value: 'makeCall',
						description: 'Initiate an AI call to a lead',
						action: 'Make an AI call',
					},
				],
				default: 'makeCall',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				default: '',
				placeholder: '+1234567890',
				description: 'Phone number to call (include country code)',
				displayOptions: {
					show: {
						resource: ['leadCall'],
						operation: ['makeCall'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'John Doe',
				description: 'Name of the person to call',
				displayOptions: {
					show: {
						resource: ['leadCall'],
						operation: ['makeCall'],
					},
				},
			},
			{
				displayName: 'Assistant ID',
				name: 'assistantId',
				type: 'string',
				required: false,
				default: '',
				placeholder: 'assistant_123',
				description: 'Optional assistant ID to use for the call',
				displayOptions: {
					show: {
						resource: ['leadCall'],
						operation: ['makeCall'],
					},
				},
			},
			{
				displayName: 'Custom Parameters',
				name: 'customParameters',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add Parameter',
				description: 'Additional custom parameters to send with the call',
				displayOptions: {
					show: {
						resource: ['leadCall'],
						operation: ['makeCall'],
					},
				},
				options: [
					{
						name: 'parameters',
						displayName: 'Parameter',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								placeholder: 'email',
								description: 'Parameter name',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								placeholder: 'john@example.com',
								description: 'Parameter value',
							},
						],
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				if (resource === 'leadCall' && operation === 'makeCall') {
					const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
					const name = this.getNodeParameter('name', i) as string;
					const assistantId = this.getNodeParameter('assistantId', i) as string;
					const customParameters = this.getNodeParameter('customParameters', i) as {
						parameters?: Array<{ name: string; value: string }>;
					};

					// Validate phone number format
					if (!phoneNumber || !phoneNumber.startsWith('+')) {
						throw new NodeOperationError(this.getNode(), 'Phone number must include country code (e.g., +1234567890)');
					}

					// Prepare request body
					const requestBody: any = {
						number: phoneNumber,
						name: name,
					};

					// Add assistant ID if provided
					if (assistantId) {
						requestBody.assistantId = assistantId;
					}

					// Add custom parameters if provided
					if (customParameters.parameters && customParameters.parameters.length > 0) {
						customParameters.parameters.forEach((param) => {
							if (param.name && param.value) {
								requestBody[param.name] = param.value;
							}
						});
					}

					// Get credentials
					const credentials = await this.getCredentials('genieDialApi');
					if (!credentials) {
						throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
					}

					// Make API request
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'genieDialApi',
						{
							method: 'POST',
							url: 'https://app.geniedial.in/api/campaign-items/leadCall',
							headers: {
								'Content-Type': 'application/json',
							},
							body: requestBody,
							json: true,
						},
					);

					returnData.push({
						json: response,
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error instanceof Error ? error.message : String(error) },
						pairedItem: { item: i },
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}
