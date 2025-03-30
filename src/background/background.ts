
// This is a minimal background script that handles the extension's lifecycle
chrome.runtime.onInstalled.addListener(async () => {
    console.log('Identus Credential Builder Extension installed');
    
    // Initialize sample templates in local storage if needed
    const templates = await chrome.storage.local.get('identus_private_templates');
    if (!templates.identus_private_templates || templates.identus_private_templates.length === 0) {
      // Add a sample template
      const sampleTemplate = {
        id: 'sample-diploma',
        name: 'Course Completion Diploma',
        description: 'A verifiable credential for course completion',
        properties: [
          { id: 'name', label: 'Name issued to', type: 'text', required: true },
          { id: 'expiryDate', label: 'Credential expiry date', type: 'date', required: false },
          { id: 'courseName', label: 'Course name', type: 'text', required: true },
          { id: 'grade', label: 'Grade', type: 'text', required: false },
          { id: 'institution', label: 'Issuing institution', type: 'text', required: true }
        ],
        isPublic: false
      };
      
      await chrome.storage.local.set({
        identus_private_templates: [sampleTemplate]
      });
      
      console.log('Sample template added to local storage');
    }
    
    // Initialize sample contacts if needed
    const contacts = await chrome.storage.local.get('identus_contacts');
    if (!contacts.identus_contacts || contacts.identus_contacts.length === 0) {
      // Add sample contacts
      const sampleContacts = [
        { id: '1', name: 'Alice', did: 'did:example:alice' },
        { id: '2', name: 'Bob', did: 'did:example:bob' },
        { id: '3', name: 'Charlie', did: 'did:example:charlie' },
        { id: '4', name: 'University', did: 'did:example:university' },
        { id: '5', name: 'Work', did: 'did:example:work' },
        { id: '6', name: 'Doctor', did: 'did:example:doctor' }
      ];
      
      await chrome.storage.local.set({
        identus_contacts: sampleContacts
      });
      
      console.log('Sample contacts added to local storage');
    }
  });
  
  // Optional: Handle extension updates
  chrome.runtime.onUpdateAvailable.addListener(() => {
    console.log('Update available for Identus Credential Builder Extension');
    chrome.runtime.reload();
  });