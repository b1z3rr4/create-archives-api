const { createArchive } = require('../../src/services/create-archive.service');
const ARCHIVE_MOCK = require('../mock/archive-mock');

jest.mock('../../src/repositories/archive-repository', ()=>{
    const originalModule = jest.requireActual('../../src/repositories/archive-repository');

    const ARCHIVE_MOCK = require('../mock/archive-mock');

    return {
        __esModule: true,
        ...originalModule,
        loadArchiveRepository: jest.fn(()=>[ARCHIVE_MOCK]),
        createArchiveRepository: jest.fn(()=> "createArchiveRepository"),
    }
});

describe('Create Archive Service', ()=>{
    it('should create an archive', ()=>{
        const archive = createArchive(ARCHIVE_MOCK);
        const keys = Object.keys(archive);
        expect(typeof archive.id).toEqual('string');
        expect(archive.name).toEqual(ARCHIVE_MOCK.name);
        expect(archive.content).toEqual(ARCHIVE_MOCK.content);
        expect(keys).toContain('createAt');
    });

    it('should throw an error if archive is not provided', ()=>{
        expect(()=> {
            createArchive()
        }).toThrowError('Archive is required');
    });

    it('should throw an error if archive name is not provided', ()=>{
        const archive = { ...ARCHIVE_MOCK, name: undefined };
        expect(()=>{
            createArchive(archive)
        }).toThrowError('Archive name is required');
    });

    it('should throw an error if archive content is not provided', ()=>{
        const archive = { ...ARCHIVE_MOCK, content: undefined };
        expect(()=>{
            createArchive(archive)
        }).toThrowError('Archive content is required');
    });
});
