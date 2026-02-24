var folderEncrypt = require('folder-encrypt');
 
folderEncrypt.encrypt({
    password: 'your-password',
    input: './uploads',
    output: 'encrypted-folder' // optional, default will be input path with extension `encrypted`
}).then(() => {
    console.log('encrypted!');
}).catch((err) => {
    console.log(err);
});

folderEncrypt.decrypt({
    password: 'your-password',
    input: 'encrypted-folder',
    output: 'decrypted-folder' // optional, default will be input path without extension
}).then(() => {
    console.log('decrypted!');
    // when using a wrong password on file decryption, the file will be decrypted to a bunch of garbled text. 
    // But still considered `decrypted` due to there is no way knowing the original content.
}).catch((err) => {
    console.log(err); 
    // when using a wrong password on directory decryption, a `tar is corrupted` error will occured.
});