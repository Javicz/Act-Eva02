async function okLogin() {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '12345' })
    });

    const data = await response.json();

    if (!response.ok || !data.token) {
        const detail = data.error || data.message || 'Respuesta sin token';
        throw new Error(`Login de prueba falló (HTTP ${response.status}): ${detail}`);
    }

    localStorage.setItem('test_token', data.token);
    testUtils.log({ message: data.message, role: data.role });
    return data.token;
}

/**
 * Test: POST /api/auth/login
 */
 testUtils.createTestButton("Test Login Correcto (Pepe y 12345)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '12345' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();

    if (response.ok) {
        testUtils.log({ message: data.message, role: data.role });
        testUtils.setSuccess(btn);
    } else {
        throw new Error(`Login falló (HTTP ${response.status}): ${data.error || data.message || 'Respuesta inválida'}`);
    }
});

testUtils.createTestButton("Test Login - Password Incorrecto (Pepe y 123)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '123' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status === 401) {
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Login - Usuario Incorrecto (Juan y 12345)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'juan', password: '12345' })
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status === 401) {
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Registro - Usuario Nuevo", async (btn) => {
    const username = `pepe_${Date.now()}`;

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: '12345' })
    });

    const data = await response.json();
    testUtils.log(data);

    if (response.status === 201) {
        testUtils.setSuccess(btn);
    }
});