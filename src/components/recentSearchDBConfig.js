export const DBConfig = {
    name: 'SearchDB',
    version: 1,
    objectStoresMeta: [{
        store: 'recents',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
            { name: 'word', keypath: 'word', options: { unique: true } }
        ]
    }]
};

export default DBConfig;