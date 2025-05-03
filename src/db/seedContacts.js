import 'dotenv/config';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initMongoConnection } from './initMongoConnection.js';
import { Contact } from './Contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const seedContacts = async () => {
  try {
    await initMongoConnection();
    
    const contactsPath = join(__dirname, '..', '..', 'contacts.json');
    const contactsData = await readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(contactsData);

    // Önce koleksiyonu temizleyelim
    await Contact.deleteMany({});
    
    // Verileri ekleyelim
    await Contact.insertMany(contacts);
    
    console.log('Contacts successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding contacts:', error);
    process.exit(1);
  }
}

seedContacts();