const { createArchiveRepository } = require('../repositories/archive-repository');
const { idGenerator } = require('../utils/id-generator');

function createArchive(archive) {
    if(!archive){
        throw new Error('Archive is required');
    }
    if(!archive.name){
        throw new Error('Archive name is required');
    }
    if(!archive.content){
        throw new Error('Archive content is required');
    }

    const id = idGenerator(archive.name);
    const createAt =  new Date();

    const newArchive = {
        id: id,
        createAt: createAt,
        ...archive
    }

    createArchiveRepository(newArchive);
    return newArchive;
}

module.exports = { createArchive };