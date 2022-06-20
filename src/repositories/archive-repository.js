const fs = require('fs');
const path = require('path');
const archiveRepositoryPath = path.resolve(__dirname, '..', 'data');

function loadArchiveRepository() {
    const archiveRepository = [];
    const archiveRepositoryFiles = fs.readdirSync(archiveRepositoryPath);
    archiveRepositoryFiles.forEach(file => {
        const archiveRepositoryFilePath = path.resolve(archiveRepositoryPath, file);
        const archiveRepositoryFile = fs.readFileSync(archiveRepositoryFilePath, 'utf8');
        const archiveRepositoryFileJson = JSON.parse(archiveRepositoryFile);
        archiveRepository.push(archiveRepositoryFileJson);
    });
    return archiveRepository;
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
    const archivePathResolve = path.resolve(archiveRepositoryPath, `${archive.name}.json`);
    fs.writeFileSync(archivePathResolve, JSON.stringify(archive));
    return archive;
}

function updateArchiveRepository(id, archive) {
 
}

module.exports = {
    loadArchiveRepository,
    createArchiveRepository,
    updateArchiveRepository
}