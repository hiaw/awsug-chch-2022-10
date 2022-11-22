import { Bucket } from "@serverless-stack/node/bucket";
import { builder } from "../builder";
import { S3 } from "aws-sdk";
import { ulid } from "ulid";

const ImageUploadType = builder
  .objectRef<{ preSignedURL: string }>("ImageUpload")
  .implement({
    fields: (t) => ({
      preSignedURL: t.exposeString("preSignedURL"),
    }),
  });

builder.queryFields((t) => ({
  preSignedURL: t.field({
    type: ImageUploadType,
    resolve: async () => {
      const expiryTime = 3600; // 1 hour = 3600 secomds

      const params = {
        Bucket: Bucket.image_upload.bucketName,
        Key: `upload/${ulid()}.png`,
        Expires: expiryTime,
      };

      const preSignedURL = new S3().getSignedUrl("putObject", params);
      return { preSignedURL };
    },
  }),
}));
