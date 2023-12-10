const argv = require("yargs").argv;
const {listContacts, getContactById, removeContact, addContact} = require('./contacts')

// TODO: refactor
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log(allContacts)
      break;

    case "get":
      const contact = await getContactById(id)
      console.log(contact)
      break;

    case "add":
      const newContact = await addContact(name, email, phone)
      break;

    case "remove":
      const deletedContact = await removeContact(id)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);