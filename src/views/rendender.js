// renderer.js
let contacts = [];
let groups = {};

function addContact() {
  const contactName = document.getElementById('contact-name').value.trim();
  const contactPhone = document.getElementById('contact-phone').value.trim();

  if (contactName && contactPhone) {
    const contact = {
      name: contactName,
      phone: contactPhone,
      groups: []
    };

    contacts.push(contact);
    updateContactsList();
    updateContactCount();
    clearContactForm();
  }
}

function addContactToGroup() {
  const groupName = document.getElementById('group-name').value.trim();
  const contactName = document.getElementById('contact-name').value.trim();

  if (groupName && contactName) {
    let group = groups[groupName];
    if (!group) {
      group = [];
      groups[groupName] = group;
    }

    const contact = contacts.find(c => c.name === contactName);
    if (contact) {
      contact.groups.push(groupName);
      group.push(contact);
      updateContactsList();
    }

    clearGroupForm();
  }
}

function toggleGroupOptions() {
  const addToGroupCheckbox = document.getElementById('addToGroup');
  const groupOptions = document.getElementById('group-options');

  groupOptions.style.display = addToGroupCheckbox.checked ? 'block' : 'none';
}

function updateContactsList() {
  const contactsList = document.getElementById('contacts');
  contactsList.innerHTML = '';

  contacts.forEach((contact, index) => {
    const li = document.createElement('li');
    li.textContent = `${contact.name} - ${contact.phone}`;

    if (contact.groups.length > 0) {
      const groupsText = contact.groups.join(', ');
      li.textContent += ` (${groupsText})`;
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteContact(index);
    li.appendChild(deleteButton);

    contactsList.appendChild(li);
  });
}

function deleteContact(index) {
  contacts.splice(index, 1);
  updateContactsList();
  updateContactCount();
}

function updateContactCount() {
  document.getElementById('contact-count').textContent = contacts.length;
}

function clearContactForm() {
  document.getElementById('contact-name').value = '';
  document.getElementById('contact-phone').value = '';
}

function clearGroupForm() {
  document.getElementById('group-name').value = '';
}

// Initialize
updateContactsList();
updateContactCount();

