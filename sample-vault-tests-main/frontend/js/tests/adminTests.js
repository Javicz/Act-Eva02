/**
 * Test: GET /api/admin/users (Requiere Login Admin)
 */
 testUtils.createTestButton("Test Admin: Listar Usuarios con Login Admin Correcto", async (btn) => {
    // Primero hacemos un login rápido como admin para obtener el token adecuado
    const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: '12345' })
    });
    
    const loginData = await loginRes.json();
    if (!loginRes.ok || !loginData.token) {
        const detail = loginData.error || loginData.message || 'Respuesta sin token';
        throw new Error(`Login de admin falló (HTTP ${loginRes.status}): ${detail}`);
    }

    const response = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${loginData.token}` }
    });
    
    const data = await response.json();
    testUtils.log(data);
    if (response.ok) testUtils.setSuccess(btn);
});

testUtils.createTestButton("Test Seguridad - Productor accediendo a Admin", async (btn) => {
    await okLogin();
    const token = localStorage.getItem('test_token');

    const response = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    testUtils.log(data);

    if (response.status === 403 &&
        typeof data.message === 'string' &&
        data.message.includes('Acceso denegado')) {
        testUtils.setSuccess(btn);
    }
});