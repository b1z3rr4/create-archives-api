const { createArchiveRepository } = require('../repositories/archive-repository');

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
}

module.exports = { createArchive };