const assert = require('node:assert/strict');
const test = require('node:test');

const dbPath = require.resolve('../config/db');
const repositoryPaths = [
    require.resolve('../repositories/userRepo'),
    require.resolve('../repositories/sampleRepo')
];

function loadRepository(repositoryPath, affectedRows) {
    delete require.cache[repositoryPath];
    require.cache[dbPath] = {
        id: dbPath,
        filename: dbPath,
        loaded: true,
        exports: {
            execute: async () => [[[{ affectedRows }]]]
        }
    };
    return require(repositoryPath);
}

test('delete repositories return false when no database row was deleted', async (t) => {
    const userRepo = loadRepository(repositoryPaths[0], 0);
    const sampleRepo = loadRepository(repositoryPaths[1], 0);

    t.after(() => {
        delete require.cache[repositoryPaths[0]];
        delete require.cache[repositoryPaths[1]];
        delete require.cache[dbPath];
    });

    assert.equal(await userRepo.delete(42), false);
    assert.equal(await sampleRepo.delete(42, 7), false);
});

test('delete repositories return true when a database row was deleted', async (t) => {
    const userRepo = loadRepository(repositoryPaths[0], 1);
    const sampleRepo = loadRepository(repositoryPaths[1], 1);

    t.after(() => {
        delete require.cache[repositoryPaths[0]];
        delete require.cache[repositoryPaths[1]];
        delete require.cache[dbPath];
    });

    assert.equal(await userRepo.delete(42), true);
    assert.equal(await sampleRepo.delete(42, 7), true);
});
