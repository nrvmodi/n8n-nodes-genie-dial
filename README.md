# n8n-nodes-genie-dial

[![npm version](https://badge.fury.io/js/n8n-nodes-genie-dial.svg)](https://badge.fury.io/js/n8n-nodes-genie-dial)

An n8n community node for GenieDial AI calling functionality. This node allows you to make AI-powered calls to leads using the GenieDial service.

## Features

- **AI Lead Calling**: Initiate AI-powered calls to leads with customizable parameters
- **Flexible Parameters**: Support for custom parameters like email, company name, policy number, etc.
- **Assistant Selection**: Optional assistant ID for different calling scenarios
- **Easy Integration**: Simple setup with API key authentication

## Installation

1. Install the package in your n8n instance:
   ```bash
   npm install n8n-nodes-genie-dial
   ```

2. Restart your n8n instance to load the new node.

## Configuration

### Credentials

1. Go to **Credentials** in your n8n instance
2. Click **Add Credential** and search for "GenieDial API"
3. Enter your GenieDial API key
4. Save the credential

### Node Usage

1. Add the **GenieDial** node to your workflow
2. Select the **Lead Call** resource and **Make Call** operation
3. Configure the following parameters:
   - **Phone Number**: Include country code (e.g., +1234567890)
   - **Name**: Name of the person to call
   - **Assistant ID**: (Optional) Specific assistant to use
   - **Custom Parameters**: (Optional) Additional data like email, company name, etc.

## API Reference

The node makes a POST request to:
```
https://app.geniedial.in/api/campaign-items/leadCall
```

### Required Parameters
- `number`: Phone number with country code
- `name`: Prospect's first name

### Optional Parameters
- `assistantId`: Specific assistant to use for the call
- Custom parameters: Any additional data you want to pass

### Example Request Body
```json
{
  "number": "+918128654706",
  "name": "Prospect First Name",
  "assistantId": "assistant_123",
  "email": "prospect@example.com",
  "companyName": "Example Corp",
  "policyNo": "POL123456"
}
```

## Example Workflow

1. **Trigger**: Webhook or manual trigger
2. **GenieDial Node**: Configure with lead data
3. **Response**: Handle the API response

## Support

For support and questions:
- Email: support@geniedial.in
- Website: https://geniedial.in

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

