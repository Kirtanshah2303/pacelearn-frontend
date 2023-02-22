import * as S3 from "aws-sdk/clients/s3";

export const handleImageUpload = async (file) =>{

    let fileName = '';
    if (file!=null){
        console.log("Inside handle image upload")
        const contentType = file.type;
        const bucket = new S3({
            accessKeyId: 'AKIAUAPPTOSJ4XNUJ2D5',
            secretAccessKey: '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',
            region: 'ap-south-1',
        });
        fileName = '_' + Math.random().toString(36).substr(2, 9);
        const params = {
            Bucket: 'charuvidya-charusat',
            Key: fileName,
            Body: file,
            ACL: 'public-read',
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