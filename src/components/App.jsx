import React, { useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const trimmedName = name.trim();

    // Verificar si el nombre ya está en la lista
    const isDuplicate = contacts.some(contact => contact.name.toLowerCase() === trimmedName.toLowerCase());
    
    if (isDuplicate) {
      alert(`${trimmedName} is already in contacts!`);
      return;
    }
    
    const newContact = {
      id: nanoid(),
      name: trimmedName,
      number
    };
    setContacts([...contacts, newContact]);
  };

  const handleDelete = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDelete} />
    </div>
  );
}

export default App;
