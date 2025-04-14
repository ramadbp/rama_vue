export async function onRequest(context) {
  const { request, env } = context
  const { pathname } = new URL(request.url)

  // GET /api/tasks
  if (pathname === '/api/produks' && request.method === 'GET') {
    const { results } = await env.DB.prepare('SELECT * FROM produk').all()
    return new Response(JSON.stringify(results), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  if (pathname === '/api/produks' && request.method === 'POST') {
    const { task } = await request.json()
    await env.DB.prepare('INSERT INTO produk (task) VALUES (?)').bind(task).run()
    return new Response('Data ditambahkan', { status: 201 })
  }

  return new Response('Not Found', { status: 404 })
}
