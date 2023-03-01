import * as S3 from "aws-sdk/clients/s3";
import * as envValue from "next.config.js"

export const handleImageUpload = async (file) =>{

    let fileName = '';
    if (file!=null){
        console.log("Inside handle image upload")
        const contentType = file.type;
        const bucket = new S3({
            accessKeyId: envValue.env.AWS_ACCESSKEY_ID,
            secretAccessKey: envValue.env.AWS_SECRET_ACCESS_KEY,
            region: envValue.env.AWS_REGION,
        });
        fileName = '_' + Math.random().toString(36).substr(2, 9);
        const params = {
            Bucket: envValue.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file,
            ACL: envValue.env.AWS_ACL,
            ContentType: contentType,
        };

        try {
            const res = ( bucket.upload(params).promise()).Location;
            // course.courseLogo = res;
            fileName = res;
            console.log("Location is --> "+fileName)
        } catch (e) {
            window.alert(e.message);
        }
    }
    // const imageUrl = response.data.url;

    return fileName;

}