# Credential Builder Demo

This repository contains a reusable browser extension for building and issuing DID verifiable credentials, with support for loading credential templates from GitHub or local storage. This browser extension demonstrates a practical implementation of verifiable credentials using DIDs. It's designed as a starting point for developers working on digital identity solutions, and to showcase how credential templates can be structured and used.

## Features

- Create and issue DID verifiable credentials
- Load credential templates from a public GitHub repository
- Save private templates to local browser storage
- Select contacts to issue credentials to
- Customizable credential fields

## Setup and Installation

### Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/andrebruelementary/credential-builder-demo.git
   cd credential-builder-demo
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the extension:
   ```
   npm run build
   ```
   Also included is a packaging script that build the project and package the files needed to load as browser extension. To do this build the extension using:
   ```
   ./package-extension.sh
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top-right corner
   - Click "Load unpacked" and select the `dist` folder from the project

## Template Repository Integration

This extension is pre-configured to work with the [Verifiable Credential Templates](https://github.com/andrebruelementary/verifiable-credential-templates) repository, which contains a growing collection of standardized credential templates organized by category.

### Using the Public Template Repository

The extension automatically loads templates from this public repository, giving you immediate access to a variety of credential types without any additional configuration. We strongly encourage you to:

1. **Use existing templates** from the public repository when possible
2. **Contribute new templates** back to the repository (through the "Suggest for Public Repository" feature)
3. **Join our collaborative effort** to build a comprehensive library of reusable templates

This approach offers several advantages:
- Immediate access to high-quality templates
- Standardization across different DID implementations
- Community-vetted credential designs
- Continuous expansion as new templates are added

Do not be discouraged by the placement of the public templates in the Elementary Software domain and let this be a reason for you to not make use of it. This was not done to put ownership of the repository in the hands of Elementary Software, but instead to be able to deliver the proof of concept without needing to tackle obstacles like getting placement allowance from Intersect, Identus or any other body. We are open to suggestions for a new placement. Check out the templates repository for instructions on how to supply recommendations like this or becoming a repository contributor for your DID product.

### Template Structure

For reference, templates in the repository follow this directory structure:

```
credential-templates/
├── education/
│   ├── university-diploma.json
│   └── course-certificate.json
├── professional/
│   ├── employment.json
│   └── certification.json
└── identity/
    └── basic-id.json
```

Each template uses this JSON format:

```json
{
  "id": "course-completion",
  "name": "Course Completion Certificate",
  "description": "Certificate of completion for a course",
  "properties": [
    { "id": "name", "label": "Name issued to", "type": "text", "required": true },
    { "id": "expiryDate", "label": "Credential expiry date", "type": "date", "required": false },
    { "id": "courseName", "label": "Course name", "type": "text", "required": true },
    { "id": "grade", "label": "Grade", "type": "text", "required": false }
  ],
  "isPublic": true,
  "source": "identus"
}
```

### Custom Repository Configuration (Advanced)

While we recommend using the shared public repository, you can point the extension to your own template repository by modifying the configuration in `src/services/githubService.ts`:

```typescript
private static readonly GITHUB_REPO_URL = 'https://api.github.com/repos/your-username/your-template-repo/contents';
private static readonly RAW_GITHUB_URL = 'https://raw.githubusercontent.com/your-username/your-template-repo/main';
```

However, consider that using the shared public repository helps build a more standardized ecosystem of credential templates that benefit the entire Cardano Identus community.


## Usage

1. Click on the Credential Builder Demo extension icon in your browser
2. Click "Load template" to select a credential template from GitHub or local storage
3. Fill in the credential fields
4. Select a contact to issue the credential to
5. Click "Issue credential" to generate the credential

## Adding Custom Contacts

Contacts are stored in browser local storage. You can add custom contacts by modifying the `contacts` array in the background script or by implementing a contact management UI.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
