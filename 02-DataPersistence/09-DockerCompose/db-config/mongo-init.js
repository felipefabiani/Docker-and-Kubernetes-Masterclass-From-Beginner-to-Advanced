const keyValueDb = process.env.KEY_VALUE_DB || 'key-value-db';
const keyValueUser = process.env.KEY_VALUE_USER || 'key-value-user';
const keyValuePassword = process.env.KEY_VALUE_PASSWORD || 'key-value-password';

console.log(`Creating user '${keyValueUser}' with access to database '${keyValueDb}'`);
db = db.getSiblingDB(keyValueDb);
db.createUser({
  user: keyValueUser,
  pwd: keyValuePassword,
  roles: [
    { 
        role: 'readWrite',
        db: keyValueDb
    }]
});

