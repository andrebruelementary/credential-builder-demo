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

### Creating a GitHub Template Repository

To use the GitHub template functionality, create a public repository with this structure:

```
credential-templates/
├── education/
│   ├── diploma.json
│   └── course-certificate.json
├── professional/
│   ├── employment.json
│   └── certification.json
└── identity/
    └── basic-id.json
```

Each JSON template should follow this format:

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

## Usage

1. Click on the Credential Builder Demo extension icon in your browser
2. Click "Load template" to select a credential template from GitHub or local storage
3. Fill in the credential fields
4. Select a contact to issue the credential to
5. Click "Issue credential" to generate the credential

## Customization

### GitHub Repository

To use your own GitHub repository for templates, modify the `GITHUB_REPO_URL` and `RAW_GITHUB_URL` constants in `src/services/githubService.ts`.
The hope is however, that you will connect with our GitHub so that we can build a large and useful collection of reusable templates together.
The extension is configured to load templates from the public repository:
https://github.com/andrebruelementary/verifiable-credential-templates

This repository contains example templates organized by category.

Currently this GitHub placement is in the Elementary Software GitHub, but we are positive to move this into another relevant place. If you have any input about possible placement, do not hesitate to get in contact with us and we can find solution that benefit the whole Cardano Identus community.

### Adding Custom Contacts

Contacts are stored in browser local storage. You can add custom contacts by modifying the `contacts` array in the background script or by implementing a contact management UI.

## License

This project is licensed under the MIT License - see the LICENSE file for details.