// GET /api/items — list all conductor items
export async function onRequestGet(context) {
  const items = await context.env.ITEMS.get('list', 'json') || [];
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

// POST /api/items — add a conductor item
export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const items = await context.env.ITEMS.get('list', 'json') || [];
    data.id = Date.now().toString();
    const now = new Date();
    data.time = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
    items.push(data);
    await context.env.ITEMS.put('list', JSON.stringify(items));
    return new Response(JSON.stringify({ ok: true, item: data }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}

// DELETE /api/items — clear all items
export async function onRequestDelete(context) {
  await context.env.ITEMS.put('list', '[]');
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

// OPTIONS for CORS
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
