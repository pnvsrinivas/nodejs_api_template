export default {
    // DB_URI: process.env.DB_URI || 'mongodb://appbuilderdb:*****@appbuilderdb.mongo.cosmos.azure.com:10255/?authSource=admin&replicaSet=globaldb&maxIdleTimeMS=120000&readPreference=primary&appname=MongoDB%20Compass&retryWrites=false&ssl=true',
    // DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/?readPreference=primary&ssl=false',
    DB_URI: process.env.DB_URI || 'mongodb://mongoAdmin:m0ng0Admin123@50.203.125.25:27017/?readPreference=primary&ssl=false&retryWrites=true',
}