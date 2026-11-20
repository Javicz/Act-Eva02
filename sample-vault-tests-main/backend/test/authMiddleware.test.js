const assert = require('node:assert/strict');
const test = require('node:test');

process.env.JWT_SECRET = 'unit-test-secret';

const jwt = require('jsonwebtoken');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

function runVerifyToken(authorization) {
    return new Promise((resolve) => {
        const req = { headers: {} };
        if (authorization !== undefined) {
            req.headers.authorization = authorization;
        }

        const res = {
            statusCode: 200,
            body: undefined,
            status(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            json(body) {
                this.body = body;
                resolve({ req, statusCode: this.statusCode, body });
            }
        };

        verifyToken(req, res, () => resolve({ req, statusCode: 200 }));
    });
}

test('verifyToken rechaza una cabecera ausente', async () => {
    const result = await runVerifyToken();

    assert.equal(result.statusCode, 403);
    assert.match(result.body.message, /incorrecto o inexistente/);
});

test('verifyToken rechaza un token inválido', async () => {
    const result = await runVerifyToken('Bearer invalid-token');

    assert.equal(result.statusCode, 401);
    assert.match(result.body.message, /Token inválido o expirado/);
});

test('verifyToken carga identidad y rol desde un token válido', async () => {
    const token = jwt.sign({ id: 7, role: 'producer' }, process.env.JWT_SECRET);
    const result = await runVerifyToken(`Bearer ${token}`);

    assert.equal(result.statusCode, 200);
    assert.equal(result.req.userId, 7);
    assert.equal(result.req.userRole, 'producer');
});

test('isAdmin permite administradores y rechaza productores', () => {
    let nextCalled = false;
    isAdmin(
        { userRole: 'admin' },
        { status() { return this; }, json() { assert.fail('admin fue rechazado'); } },
        () => { nextCalled = true; }
    );
    assert.equal(nextCalled, true);

    let statusCode;
    let body;
    isAdmin(
        { userRole: 'producer' },
        {
            status(code) { statusCode = code; return this; },
            json(value) { body = value; }
        },
        () => assert.fail('producer no debe tener permisos de admin')
    );
    assert.equal(statusCode, 403);
    assert.match(body.message, /Acceso denegado/);
});
