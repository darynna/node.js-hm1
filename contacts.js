const fs = require("fs").promises
const path = require("path")
const {nanoid} = require("nanoid")

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
    try{
    const Contacts = await fs.readFile(contactsPath);
    const json = JSON.parse(Contacts.toString())
    return json}
    catch(err){
        console.log(err)
    }
  }
  
 async function getContactById(contactId) {
    const contacts = await listContacts()
    const contact = contacts.filter((item => item.id === contactId))
    return contact || null
  }

  
 async function removeContact(contactId) {
    const contacts = await listContacts()
    const index = contacts.findIndex((item => item.id === contactId))
    if(index === -1){
        return null
    };
    const result = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
  }
  

 async function addContact(name, email, phone) {
    const contacts = await listContacts()
    const newContacts = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContacts)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContacts
  }


module.exports = {listContacts, getContactById, removeContact, addContact}