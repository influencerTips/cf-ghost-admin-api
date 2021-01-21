# cf-ghost-admin-api

> Used to expose functionality in Ghost Admin API

## Installation

1. Follow the instructions to [generate and deploy a worker](https://github.com/cloudflare/wrangler)
2. Use the index.js and router.js in this repo in your app.
3. Setup a custom integration on your ghost account.
4. Setup worker script with the following environment variables mapping values from your ghost account.

```
GHOST_ADMIN_API_KEY: Value encrypted
GHOST_API_URL: Value encrypted
GHOST_CONTENT_API_KEY: Value encrypted
```

## Documentation

This application was initially set up to allow API access to a Ghost blog subscribed member's details using their `UUID`.

At this stage only a get request to the Admin API member with filter uuid is allowed.

### Usage

```
[cf-api-endpoint]/members?uuid=[replace-with-member-uuid]
```

The response is what ever is passed back from the Ghost admin api.

Notes:
* Works with [ghost version 3.40.0](https://github.com/TryGhost/Ghost).
* Ghost Admin members API fis canary and may change in future versions.
* The use case scenario for setting this application up was to allow a subscribed user access to their labels.



## Need more help

Project sponsored by [influencerTips](https://www.influencer.tips/).

Feel very welcome to suggest improvements on a PR or via issues.
