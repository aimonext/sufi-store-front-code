import { json } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export async function GET({ request }) {
  const host = (request.headers.get('host') || 'localhost').split(':')[0].toLowerCase();
  const file = host === 'store1.com' ? 'store1.com.json' : 'localhost.json';
  const raw = await readFile(resolve('static/mock/stores', file), 'utf-8');
  return json(JSON.parse(raw));
}