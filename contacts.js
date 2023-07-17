const fs = require("fs");
const path = require("path");

const { v1: uuidv1 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) {
          throw err
        } else {
            const contactsData = JSON.parse(data);
            console.table(contactsData);
      }
  })
}

function getContactById(contactId) {
   fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) {
          throw err
        } else {
            const contactsData = JSON.parse(data);
            const searchContact = contactsData.find((elem) => (elem.id = contactId));
            console.table(searchContact)
      }
  })
}


function removeContact(contactId) {
    fs.readFile(contactsPath, "utf8", (err, data) => { 
        if (err) {
            throw err;
        } else {
            const contactsData = JSON.parse(data);
            const contactsToRemoveIndex = contactsData.findIndex(
                (elem) => elem.id === contactId
            );
            if (contactsToRemoveIndex === -1) {
                console.log("Contact not found");
                return;
            } else {
                const newcontactsData = contactsData.filter((c) => c.id !== contactId);
        fs.writeFile(contactsPath, JSON.stringify(newcontactsData), (err) => {
          if (err) {
            throw err;
          } else {
            console.log("Contact removed !");
          }
        });
            }
        }
    })
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      const contactsData = JSON.parse(data);

      const newContact = {
        id: uuidv1(),
        name: name,
        email: email,
        phone: phone,
      };

      contactsData.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(contactsData), (err) => {
        if (err) {
          throw err;
        } else {
          console.log("Contact added !");
        }
      });
    }
  });
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};