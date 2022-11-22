import { Bucket, StackContext } from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";
import { BlockPublicAccess } from "aws-cdk-lib/aws-s3";

export function Buckets({ stack }: StackContext) {
  const buckets = new Bucket(stack, "image_upload", {
    cdk: {
      bucket: {
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });

  return buckets;
}
