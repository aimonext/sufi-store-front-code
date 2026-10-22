import { json } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export async function GET({ request }) {
  const host = (request.headers.get('host') || 'localhost').toLowerCase();
  const port = host.includes(':') ? host.split(':')[1] : '';
  const hostname = host.split(':')[0];
  let file;
  if (hostname === 'store1.com') file = 'store1.com.json';
  else if (port && ['5177','5178','5179'].includes(port)) file = port + '.json';
  else file = 'localhost.json';
  const raw = await readFile(resolve('static/mock/stores', file), 'utf-8');
  return json(JSON.parse(raw));
}