const fs = require('fs');
const path = require('path');
const archivePath = path.resolve(__dirname, '..', 'data');

function isKey(obj, key){
    return key in obj;
}

function loadArchiveRepository() {
    const archive = [];
    const archiveFiles = fs.readdirSync(archivePath);
    archiveFiles.forEach(file => {
        const archiveFilePath = path.resolve(archivePath, file);
        const archiveFile = fs.readFileSync(archiveFilePath, 'utf8');
        const archiveFileJson = JSON.parse(archiveFile);
        archive.push(archiveFileJson);
    });
    return archive;
}

function createArchiveRepository(archive) {
    if(!archive) {
        throw new Error('Archive is required');
    }
    if(!archive.name) {
        throw new Error('Archive name is required');
    }
    if(!archive.content) {
        throw new Error('Archive content is required');
    }
    const archivePathResolve = path.resolve(archivePath, `${archive.name}.json`);
    fs.writeFileSync(archivePathResolve, JSON.stringify(archive));
    return archive;
}

function updateArchiveRepository(id, content) {
    if(!id){
        throw new Error('Id is required');
    }
    if(!content){
        throw new Error('Archive is required');
    }
    const archiveFiles = fs.readdirSync(archivePath);
    archiveFiles.forEach(file => {
        const archiveFilePath = path.resolve(archivePath, file);
        const archiveFile = fs.readFileSync(archiveFilePath, 'utf8');
        const archiveFileJson = JSON.parse(archiveFile);
        if(archiveFileJson.id === id){
            archiveFileJson.content = content;
            fs.writeFileSync(archiveFilePath, JSON.stringify(archiveFileJson));
        }
    });
    const result = [];
    archiveFiles.forEach(file => {
        const archiveFilePath = path.resolve(archivePath, file);
        const archiveFile = fs.readFileSync(archiveFilePath, 'utf8');
        const archiveFileJson = JSON.parse(archiveFile);
        if(archiveFileJson.id === id){
            const archive = fs.readFileSync(archiveFilePath, 'utf-8');
            result.push(JSON.parse(archive));
        }
    });
    return result[0];
}

function deleteArchiveRepository(id) {
    if(!id){
        throw new Error('Id is required');
    }
    const archiveFiles = fs.readdirSync(archivePath);
    archiveFiles.forEach(file => {
        const archiveFilePath = path.resolve(archivePath, file);
        const archiveFile = fs.readFileSync(archiveFilePath, 'utf8');
        const archiveFileJson = JSON.parse(archiveFile);
        if(archiveFileJson.id === id){
            fs.unlinkSync(archiveFilePath);
        }
    });
    return true;
}

module.exports = {
    loadArchiveRepository,
    createArchiveRepository,
    updateArchiveRepository,
    deleteArchiveRepository
}