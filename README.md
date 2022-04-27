# relax.js

information-centric networking for the web

```
mkdir relax-js
cd relax-js
fossil open https://source.sunshinegardens.org/xjix/relax-js
fossil ui
```

## system dependencies

* deno | vercel-deno
* minio | s3
* caddy+s3 | vercel

it doesn't take much. we document a self-hosted setup and vercel here for refernce,
together these instructions should provide all of the information you need to adapt
relax.js to your impending scenario.

* [setup/self-hosted](./wiki/setup--self-hosted/)
* [setup/vercel](./wiki/setup--vercel/)

## using relax in your application

* [map/reduce](https://pouchdb.com/api.html#query_database)
* [mango](https://pouchdb.com/guides/mango-queries.html)

```
// queries/my-query.ts
import { relaxQuery } from 'https://heropunch.io/xjix/relax-js/doc/tip/db/query.ts'
// https://www.skypack.dev/view/@nact/core
export default relaxQuery({
	views: {
		myView: {
			query: ``,
			variables: {},
			map(doc) {},
			reduce(docs) {}
		}
	},
	resolve(query, variables) {
		// resolve queries
		return this.$graphql(ENDPOINT, query, variables)
	},
	update() {
		// accept webhook update event
	},
	storage: {},
}
```

