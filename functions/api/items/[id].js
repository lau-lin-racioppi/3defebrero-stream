// DELETE /api/items/:id — remove one item
export async function onRequestDelete(context) {
  const id = context.params.id;
  const items = await context.env.ITEMS.get('list', 'json') || [];
  const filtered = items.filter(i => i.id !== id);
  await context.env.ITEMS.put('list', JSON.stringify(filtered));
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
