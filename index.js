const argv = require("yargs").argv;
const {listContacts, getContactById, removeContact, addContact} = require('./contacts')

// TODO: refactor
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts)
      break;

    case "get":
      const contact = await getContactById(id)
      console.table(contact)
      break;

    case "add":
      const newContact = await addContact(name, email, phone)
      console.table(newContact)
      break;

    case "remove":
      const deletedContact = await removeContact(id)
      console.table(deletedContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);