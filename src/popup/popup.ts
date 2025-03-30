import { CredentialBuilder } from '../components/credentialBuilder/credentialBuilder';
import { TemplateSelector } from '../components/templateSelector/templateSelector';
import { StorageService } from '../services/storageService';
import { Contact } from '../models/contact';

class PopupApp {
  private credentialBuilder: CredentialBuilder;
  private selectedContact: Contact | null = null;
  private contactsList: HTMLElement;
  private contactSearch: HTMLInputElement;
  
  constructor() {
    // Initialize the credential builder
    this.credentialBuilder = new CredentialBuilder('credential-builder');
    
    // Initialize contacts elements
    this.contactsList = document.getElementById('contacts-list') as HTMLElement;
    this.contactSearch = document.getElementById('contact-search') as HTMLInputElement;
    
    // Initialize event listeners
    this.initEventListeners();
    
    // Load contacts
    this.loadContacts();
  }
  
  private initEventListeners(): void {
    // Set up contact search
    this.contactSearch.addEventListener('input', () => {
      this.filterContacts(this.contactSearch.value);
    });
  }
  
  private async loadContacts(): Promise<void> {
    try {
      const contacts = await StorageService.getContacts();
      this.renderContacts(contacts);
    } catch (error) {
      console.error('Error loading contacts:', error);
      this.contactsList.innerHTML = '<p class="error-message">Error loading contacts</p>';
    }
  }
  
  private renderContacts(contacts: Contact[]): void {
    this.contactsList.innerHTML = '';
    
    contacts.forEach(contact => {
      const contactTemplate = document.getElementById('contact-item-template') as HTMLTemplateElement;
      const contactEl = contactTemplate.content.cloneNode(true) as DocumentFragment;
      
      const contactItem = contactEl.querySelector('.contact-item') as HTMLElement;
      contactItem.setAttribute('data-contact-id', contact.id);
      
      const nameEl = contactEl.querySelector('.contact-name') as HTMLElement;
      nameEl.textContent = contact.name;
      
      // Set up selection
      contactItem.addEventListener('click', () => {
        // Remove selected class from all contacts
        document.querySelectorAll('.contact-item').forEach(item => {
          item.classList.remove('selected');
        });

        // Add selected class to this contact
        contactItem.classList.add('selected');

        // Set selected contact
        this.selectedContact = contact;

        // Update credential builder - this line is crucial
        console.log('Contact selected:', contact);
        this.credentialBuilder.setSelectedContact(contact);
      });
      
      this.contactsList.appendChild(contactItem);
    });
  }
  
  private filterContacts(query: string): void {
    const normalizedQuery = query.toLowerCase().trim();
    
    const contactItems = this.contactsList.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
      const name = item.querySelector('.contact-name')?.textContent || '';
      
      if (name.toLowerCase().includes(normalizedQuery)) {
        (item as HTMLElement).style.display = 'flex';
      } else {
        (item as HTMLElement).style.display = 'none';
      }
    });
  }
  
  // Initialize the app when DOM is loaded
  static init(): void {
    document.addEventListener('DOMContentLoaded', () => {
      new PopupApp();
    });
  }
}

// Start the app
PopupApp.init();