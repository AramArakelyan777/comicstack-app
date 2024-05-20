const {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
	GetObjectCommand,
} = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const dotenv = require("dotenv")

dotenv.config()

const bucketName = process.env.S3_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
	region,
	credentials: {
		accessKeyId,
		secretAccessKey,
	},
})

module.exports = {
	DeleteObjectCommand,
	PutObjectCommand,
	GetObjectCommand,
	bucketName,
	s3Client,
	getSignedUrl,
}
