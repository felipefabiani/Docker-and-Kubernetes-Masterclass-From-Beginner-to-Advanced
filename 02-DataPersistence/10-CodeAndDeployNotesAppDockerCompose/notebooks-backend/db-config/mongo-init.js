const notebooksDb = process.env.NOTEBOOKS_DB_NAME;
const notebooksUser = process.env.NOTEBOOKS_DB_USER;
const notebooksPassword = process.env.NOTEBOOKS_DB_PASSWORD;

console.log(`INITIALIZING : Notebooks DB: ${notebooksDb}, User: ${notebooksUser}, Password: ${notebooksPassword}`);
db = db.getSiblingDB(notebooksDb);
db.createUser({
  user: notebooksUser,
  pwd: notebooksPassword,
  roles: [
    { 
        role: 'readWrite',
        db: notebooksDb
    }]
});

