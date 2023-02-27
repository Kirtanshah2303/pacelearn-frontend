import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Button from "@/utils/Button";
import baseUrl2 from "@/utils/baseUrl2";
import * as S3 from 'aws-sdk/clients/s3';

const INITIAL_VALUE = {
	sessionDescription: "",
	sessionTitle: "",
	sessionVideo: "",
	sessionResource: "",
	sectionId: 0,
	is_preview: false,
	isDraft: false,
	quizLink: "",
	courseId: "",
	sessionDuration : 0,
	video : {}
};

const UploadVideoForm = ({ courseId ,courseSection}) => {
	const { charuvidhya_users_token } = parseCookies();
	const [video, setVideo] = useState(INITIAL_VALUE);
	const [section, setSection] = useState([]);

	// const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	// const [thumbPreview, setThumbPreview] = React.useState("");
	const router = useRouter();

	useEffect(() => {

		fetch(`${baseUrl2}/api/course-section/${courseId}`,{
			headers: { Authorization: charuvidhya_users_token },
		}).then(response => response.json().then(result => {
			// console.log(result)
			setSection(result)
		}))

	},[])

	// useEffect(() => {
	// 	setVideo((prevState) => ({ ...prevState, courseId }));
	// }, []);

	// useEffect(() => {
	// 	let { group_name, title, video: video_url, courseId } = video;
	// 	const isVideo = Object.values({
	// 		group_name,
	// 		title,
	// 		video_url,
	// 		courseId,
	// 	}).every((el) => Boolean(el));
	// 	isVideo ? setDisabled(false) : setDisabled(true);
	// }, [video]);

	const handleChange = (e) => {
		const { name, value, files } = e.target;

		let fileSize;
		if (name === "thumb") {
			fileSize = files[0].size / 1024 / 1024;
			if (fileSize > 2) {
				toast.error(
					"The thumb size greater than 2 MB. Make sure less than 2 MB.",
					{
						style: {
							border: "1px solid #ff0033",
							padding: "16px",
							color: "#ff0033",
						},
						iconTheme: {
							primary: "#ff0033",
							secondary: "#FFFAEE",
						},
					}
				);
				e.target.value = null;
				return;
			}
			setVideo((prevState) => ({
				...prevState,
				thumb: files[0],
			}));
			setThumbPreview(window.URL.createObjectURL(files[0]));
		} else if (name === "video") {
			fileSize = files[0].size / 1024 / 1024;
			// if (fileSize > 5) {
			// 	toast.error(
			// 		"The video size greater than 5 MB. Make sure less than 5 MB.",
			// 		{
			// 			style: {
			// 				border: "1px solid #ff0033",
			// 				padding: "16px",
			// 				color: "#ff0033",
			// 			},
			// 			iconTheme: {
			// 				primary: "#ff0033",
			// 				secondary: "#FFFAEE",
			// 			},
			// 		}
			// 	);
			// 	e.target.value = null;
			// 	return;
			// }

			let media = new Audio(window.URL.createObjectURL(files[0]));
			media.onloadedmetadata = function () {
				setVideo((prevState) => ({
					...prevState,
					video: files[0],
					sessionDuration: media.duration,
				}));
			};
		} else {
			setVideo((prevState) => ({ ...prevState, [name]: value }));
		}
	};

	const handleVideoUpload = async () => {
		let fileName = '';
		if (video.video!=null){
			// console.log("Inside handle image upload")
			const contentType = video.video.type;
			const bucket = new S3({
				accessKeyId: 'AKIAUAPPTOSJ4XNUJ2D5',
				secretAccessKey: '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',
				region: 'ap-south-1',
			});
			fileName = '_' + Math.random().toString(36).substr(2, 9);
			const params = {
				Bucket: 'charuvidya-charusat',
				Key: fileName,
				Body: video.video,
				ACL: 'public-read',
				ContentType: contentType,
			};

			try {
				const res = (await bucket.upload(params).promise()).Location;
				// console.log("Location of video is --? "+ res)
				video.sessionVideo = res;
				fileName = res;
			} catch (e) {
				window.alert(e);
			}
		}
		// const imageUrl = response.data.url;

		// return fileName;
	};

	// const handleThumbUpload = async () => {
	// 	const data = new FormData();
	// 	data.append("file", video.thumb);
	// 	data.append("upload_preset", process.env.UPLOAD_PRESETS);
	// 	data.append("cloud_name", process.env.CLOUD_NAME);
	// 	let response;
	// 	if (video.thumb) {
	// 		response = await axios.post(process.env.CLOUDINARY_URL, data);
	// 	}
	//
	// 	const imageUrl = response.data.url;
	//
	// 	return imageUrl;
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			let videoUrl = "";
			let thumbUrl = "";
			if (video.video) {
				// const videoUpload = await handleVideoUpload();
				await handleVideoUpload();
				// video.sessionVideo = videoUpload
				// console.log("Session video = " + video.sessionVideo)
				// videoUrl = videoUpload.replace(/^http:\/\//i, "https://");
				// const thumbUpload = await handleThumbUpload();
				// thumbUrl = thumbUpload.replace(/^http:\/\//i, "https://");
			}

			const {
				sessionTitle,
				sessionDescription,
				sessionVideo,
				sessionResource,
				sectionId,
				is_preview,
				isDraft,
				quizLink,
				sessionDuration
			} = video;

			const payloadData = {
				sessionTitle,
				sessionDescription,
				sessionVideo,
				sessionResource,
				sectionId,
				is_preview,
				isDraft,
				quizLink,
				sessionDuration
			};
			const url = `${baseUrl2}/api/course/${courseId}/course-session`;
			const payloadHeader = {
				headers: { Authorization: charuvidhya_users_token,
					"Content-Type" : 'application/json'

				},
			};

			// const response = await axios.post(url, payloadData, payloadHeader);

			fetch(url,{
				method : "POST",
				headers : {
					Authorization: "Bearer " + charuvidhya_users_token,
					"Content-Type" : 'application/json'
				},
				body : JSON.stringify(payloadData)
			}).then(response => {
				response.json().then(response => {


					toast.success("Video uploaded successfully", {
						style: {
							border: "1px solid #4BB543",
							padding: "16px",
							color: "#4BB543",
						},
						iconTheme: {
							primary: "#4BB543",
							secondary: "#FFFAEE",
						},
					});

					setLoading(false);

					router.push(`/instructor/course/uploads/${courseId}`);


					// console.log("Get response is --> "+response.title)
					// setLoading(false);
					//
					// toast.success("Submitted successfully", {
					// 	style: {
					// 		border: "1px solid #4BB543",
					// 		padding: "16px",
					// 		color: "#4BB543",
					// 	},
					// 	iconTheme: {
					// 		primary: "#4BB543",
					// 		secondary: "#FFFAEE",
					// 	},
					// });
					//
					// // if (is_class) {
					// //     router.push(`/instructor/courses`);
					// // } else {
					// console.log("Response data is --> "+response.id)
					// router.push(
					// 	`/instructor/course/upload/${courseId}`
					// 	// `/instructor/course/upload/${response.id}`
					// );
					// }
				})
			}).catch(error => {
				console.log("Error is --> "+error)
			})

			// toast.success("Video uploaded successfully", {
			// 	style: {
			// 		border: "1px solid #4BB543",
			// 		padding: "16px",
			// 		color: "#4BB543",
			// 	},
			// 	iconTheme: {
			// 		primary: "#4BB543",
			// 		secondary: "#FFFAEE",
			// 	},
			// });
			//
			// setLoading(false);
			//
			// router.push(`/instructor/course/uploads/${courseId}`);
		} catch (err) {
			// let {
			// 	response: {
			// 		data: { message },
			// 	},
			// } = err;
			toast.error(err, {
				style: {
					border: "1px solid #ff0033",
					padding: "16px",
					color: "#ff0033",
				},
				iconTheme: {
					primary: "#ff0033",
					secondary: "#FFFAEE",
				},
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Video Title
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Session Title"
							name="sessionTitle"
							value={video.sessionTitle}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Video Description
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Video Description"
							name="sessionDescription"
							value={video.sessionDescription}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Course Section
						</label>
						<select
							className="form-select"
							name="sectionId"
							value={video.sectionId}
							onChange={handleChange}
						>
							<option value="">Select</option>
							{section.length > 0 &&
							section.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.sectionTitle}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Select Video
						</label>
						<input
							type="file"
							className="form-control file-control"
							name="video"
							onChange={handleChange}
						/>
					</div>
				</div>
				{/*<div className="col-md-6">*/}
				{/*	<div className="form-group">*/}
				{/*		<label className="form-label fw-semibold">*/}
				{/*			Video Order Number (Ascending)*/}
				{/*		</label>*/}
				{/*		<input*/}
				{/*			type="number"*/}
				{/*			className="form-control"*/}
				{/*			placeholder="Group Title"*/}
				{/*			name="short_id"*/}
				{/*			value={video.short_id}*/}
				{/*			onChange={handleChange}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}

				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Session Resource
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Session Resource"
							name="sessionResource"
							value={video.sessionResource}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Session Quiz
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Link of the Quiz"
							name="quizLink"
							value={video.quizLink}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<input
							type="checkbox"
							className="form-check-input"
							id="is_preview"
							defaultChecked={video.is_preview}
							onChange={(e) =>
								setVideo((prevState) => ({
									...prevState,
									is_preview: !video.is_preview,
								}))
							}
						/>{" "}
						<label
							className="form-check-label"
							htmlFor="is_preview"
						>
							Preview Video?
						</label>
					</div>
				</div>

				<div className="col-12">
					<Button
						loading={loading}
						// disabled={loading || disabled}
						btnText="Upload Video"
						btnClass="default-btn"
					/>
				</div>
			</div>
		</form>
	);
};

export default UploadVideoForm;
