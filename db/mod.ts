import { S3Client } from "https://deno.land/x/s3_lite_client@0.2.0/mod.ts";

const s3client = new S3Client({
  endPoint: "s3.amazonaws.com",
  port: 443,
  useSSL: true,
  region: "us-east-1",
  bucket: "openalex",
  pathStyle: false,
});

for await (const obj of s3client.listObjects({ prefix: "data/concepts/" })) {
  console.log(obj);
}
