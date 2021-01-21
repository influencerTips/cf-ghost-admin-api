const Router = require('./router')
const jwt = require('jsonwebtoken');

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function isUUID(s){
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(s);
}

async function getMembers(request) {
  const uuid=getParameterByName('uuid', new URL(request.url).href);
  if (isUUID(uuid)) {
    const [id, secret] = GHOST_ADMIN_API_KEY.split(':');
    const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
      keyid: id,
      algorithm: 'HS256',
      expiresIn: '5m',
      audience: `/v3/admin/`
    });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers.append('Authorization',`Ghost ${token}`);
    let response = await fetch((GHOST_API_URL+'/ghost/api/v3/admin/members/?filter=uuid:'+encodeURIComponent(uuid)), {
      method: 'GET',
      headers: headers
    });
    return new Response(
      JSON.stringify(await response.json()),
      { headers: { 'content-type': 'application/json' } }
    )
  }
  else {
    return new Response(
      JSON.stringify(
        {
          "members": [],
          "meta": {
            "pagination": {
              "page": 1,
              "limit": 15,
              "pages": 1,
              "total": 1,
              "next": null,
              "prev": null
            }
          }
        }
      ),
      { headers: { 'content-type': 'application/json' } }
    )
  }
}

async function handleRequest(request) {
    const r = new Router()
    r.get('.*/test', () => new Response('OK'))
    r.get('.*/members.*', request => getMembers(request))

    const resp = await r.route(request)
    return resp
}
