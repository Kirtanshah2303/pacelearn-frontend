import * as S3 from "aws-sdk/clients/s3";

export const handleImageUpload = async (file) =>{

    let fileName = '';
    if (file!=null){
        console.log("Inside handle image upload")
        const contentType = file.type;
        const bucket = new S3({
            accessKeyId: process.env.AWS_ACCESSKEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
        fileName = '_' + Math.random().toString(36).substr(2, 9);
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file,
            ACL: process.env.AWS_ACL,
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