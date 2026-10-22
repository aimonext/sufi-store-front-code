import { json } from '@sveltejs/kit';
import localhost from '../../../../static/mock/stores/localhost.json';
import store1 from '../../../../static/mock/stores/store1.com.json';
import p5177 from '../../../../static/mock/stores/5177.json';
import p5178 from '../../../../static/mock/stores/5178.json';
import p5179 from '../../../../static/mock/stores/5179.json';

const STORES = { 'localhost': localhost, 'store1.com': store1, '5177': p5177, '5178': p5178, '5179': p5179 };

export function GET({ request, url }) {
  const host = (url.host || request.headers.get('host') || 'localhost').toLowerCase();
  const port = url.port || (host.includes(':') ? host.split(':')[1] : '');
  const hostname = url.hostname || host.split(':')[0];
  let key;
  if (hostname === 'store1.com') key = 'store1.com';
  else if (port && ['5177','5178','5179'].includes(port)) key = port;
  else key = 'localhost';
  const store = STORES[key] || STORES.localhost;
  return json(store.products || []);
}
