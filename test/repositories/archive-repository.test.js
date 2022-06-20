const mockFs = require('mock-fs');
const path = require('path');

const {
    loadArchiveRepository,
    createArchiveRepository,
    updateArchiveRepository
} = require('../../src/repositories/archive-repository');

describe('Archive Repository', () => {
    beforeEach(()=>{
        mockFs({
            'src/data': mockFs.load(
                path.resolve(__dirname, '..', 'mock', 'data-mock')
            )
        });
    });

    afterEach(()=>{
        mockFs.restore();
    });

    it('should load archive repository', () => {
        const result = loadArchiveRepository();
        expect(result.length).toBe(1);
    });

    it('should create archive repository', () => {
        const archive = {
            name: 'test',
            content: 'test'
        };
        const result = createArchiveRepository(archive);
        expect(result).toEqual(archive);
    });

    it('should throw error when archive is required', () => {
        expect(() => {
            createArchiveRepository();
        }).toThrowError('Archive is required');
    });

    it('should throw error when archive is required', () => {
        expect(() => {
            createArchiveRepository({
                content: 'test'
            });
        }).toThrowError('Archive name is required');
    });

    it('should throw error when archive is required', () => {
        expect(() => {
            createArchiveRepository({
                name: 'test'
            });
        }).toThrowError('Archive content is required');
    });

    it('should update archive repository', () => {
       const beforesArchives = loadArchiveRepository();
       const oldArchive = beforesArchives[0];
       expect(oldArchive.name).toEqual("archive-1");
       expect(oldArchive.description).toEqual("Archive 1");
       const archive = {
            name: 'test',
            content: 'test'
       };
       const result = updateArchiveRepository("1", archive);
       expect(result.id).toEqual("1");
       expect(result.name).toEqual("test");
       expect(result.content).toEqual("test");
    });

    it('should throw error when id is required', () => {
        expect(updateArchiveRepository()).toThrowError('Id is required');
    });
});