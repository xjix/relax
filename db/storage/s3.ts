import { S3Client } from "https://deno.land/x/s3_lite_client@0.2.0/mod.ts"
import { KV } from './kv.ts'

// 9p inspired?
// read, write, walk, create

export class S3Storage implements KV {
  _client: S3Client;
  constructor(keychain) {
    const subchain = keychain.subchain('relax/client/s3')
    this._client = new S3Client({
      endPoint: subchain.get('endpoint'),
      port: subchain.get('port', 443, { to: Number }),
      useSSL: subchain.get('use-ssl', true, { to: Boolean }),
      region: subchain.get('region'),
      bucket: subchain.get('bucket'),
      pathStyle: subchain.get('path-style', false, { to: Boolean }),
    })
  }
  read() {}
  write() {}
  async walk() {
    for await (const obj of this._client.listObjects({ prefix: "data/concepts/" })) {
      console.log(obj);
    }
  }
  create() {}
}
