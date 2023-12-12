const fs = require("fs").promises
const path = require("path")
const {nanoid} = require("nanoid")

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
    try{
    const Contacts = await fs.readFile(contactsPath);
    const json = JSON.parse(Contacts.toString())
    return json
  }
    catch(err){
        console.log(err)
    }
  }
  
 async function getContactById(contactId) {
  try{
    const contacts = await listContacts()
    const contact = contacts.find((({id}) => id === contactId))
    return contact || null}
    catch(error){
      console.log(error)
    }
  }
  
 async function removeContact(contactId) {
  try{
    const contacts = await listContacts()
    const index = contacts.findIndex((item => item.id === contactId))
    if(index === -1){
        return null
    };
    const result = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result}
    catch(error){
      console.log(error)
    }
  }
  

 async function addContact(name, email, phone) {
  try{
    const contacts = await listContacts()
    const newContacts = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContacts)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContacts}
    catch(error){
      console.log(error)
    }
  }


module.exports = {listContacts, getContactById, removeContact, addContact}