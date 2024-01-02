const {ipcRenderer} = window.require('electron');

const database = {}

database.getAllValues = function(callback) {
    ipcRenderer.invoke('get-all-values')
        .then((docs) => {
            console.log(docs)
            callback(docs);
        })
        .catch(error => console.log(error));
};

database.insertValue = function(value, callback) {
    ipcRenderer.invoke('insert-value', value)
        .then((doc) => {
            callback(doc);
        })
        .catch(error => console.log(error));
}

database.getOneValue = function(id, callback) {
    ipcRenderer.invoke('get-one-value', id)
        .then((doc) => {
            callback(doc);
        })
        .catch(error => console.log(error));
}

database.removeValue = function(id, callback) {
    ipcRenderer.invoke('remove-value', id)
        .then((doc) => {
            callback(doc);
        })
        .catch(error => console.log(error));
}

export default database;