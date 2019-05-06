'use strict';

const dbName = 'xposure';

const dbUrl = `mongodb+srv://xposure:xposure@cluster0-4xs44.mongodb.net/${dbName}?retryWrites=true`;

module.exports = { dbName, dbUrl };
