import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { handleLogin } from "@/utils/auth";
import baseUrl2 from "@/utils/baseUrl2";
import { useRouter } from "next/router";
import Button from "../../utils/Button";
import { motion } from "framer-motion";
import Router from "next/router";
import * as S3 from "aws-sdk/clients/s3";

// const INITIAL_USER = {
// 	first_name: "",
// 	last_name: "",
// 	email: "",
// 	password: "",
// };
const INITIAL_USER = {
	login: "",
	password: "",
	firstName: "",
	lastName: "",
	email : "",
	imageUrl : "",
	langKey : "en",
	// authorities : [""],
	image : {}

};

const RegisterForm = () => {
	const [registerUser, setRegisterUser] = React.useState(INITIAL_USER);
	// const [value,setValue] = React.useState("");
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();

	React.useEffect(() => {
		const isUser = Object.values(registerUser).every((el) => Boolean(el));
		isUser ? setDisabled(false) : setDisabled(true);
	}, [registerUser]);

	const handleChange = (e) => {
		const { name, value , files } = e.target;

		if (name === "imageUrl") {
			const image = files[0].size / 1024 / 1024;
			if (image > 2) {
				toast.error(
					"The photo size greater than 2 MB. Make sure less than 2 MB.",
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
			setRegisterUser((prevState) => ({
				...prevState,
				image: files[0],
			}));
			// setImagePreview(window.URL.createObjectURL(files[0]));
		}
		else{
			setRegisterUser((prevState) => ({ ...prevState, [name]: value }));
		}


	};

	const handleChangeROLE = (event) => {

		setValue(event.target.value);

	};

	const handleImageUpload = async () => {
		// const data = new FormData();
		// data.append("file", course.courseLogo);
		// data.append("upload_preset", process.env.UPLOAD_PRESETS);
		// data.append("cloud_name", process.env.CLOUD_NAME);
		// let response;
		// if (course.image) {
		// 	response = await axios.post(process.env.CLOUDINARY_URL, data);
		// }
		let fileName = '';
		if (registerUser.image!=null){
			// console.log("Inside handle image upload")
			const contentType = registerUser.image.type;
			const bucket = new S3({
				accessKeyId: process.env.AWS_ACCESSKEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
				region: process.env.AWS_REGION,
			});
			fileName = '_' + Math.random().toString(36).substr(2, 9);
			const params = {
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: fileName,
				Body: registerUser.image,
				ACL: process.env.AWS_ACL,
				ContentType: contentType,
			};

			try {
				const res = (await bucket.upload(params).promise()).Location;
				registerUser.imageUrl = res;
				console.log("Location --> "+registerUser.imageUrl)
				fileName = res;
			} catch (e) {
				window.alert(e);
			}
		}
		// const imageUrl = response.data.url;

		return fileName;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);

			await handleImageUpload()

			const url = `${baseUrl2}/api/register`;
			const payload = { ...registerUser };
			const response = await axios.post(url, payload);
			Router.push("/")
			// handleLogin(response.data.charuvidhya_users_token, router);
			toast.success(response.data.message, {
				style: {
					border: "1px solid #9fccfa",
					padding: "16px",
					// color: "#4BB543",
					color: "#9fccfa",

				},
				iconTheme: {
					// primary: "#4BB543",
					primary: "#9fccfa",
					secondary: "#FFFAEE",
				},
			});
		} catch (err) {
			let {
				response: {
					data: { message },
				},
			} = err;
			toast.error(message, {
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
		<motion.form
			onSubmit={handleSubmit}
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0 }}

		>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="login"
					name="login"
					value={registerUser.login}
					onChange={handleChange}
					autoFocus
				/>
			</div>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="First Name"
					name="firstName"
					value={registerUser.firstName}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="Last Name"
					name="lastName"
					value={registerUser.lastName}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					placeholder="Email"
					name="email"
					value={registerUser.email}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				{/*<input*/}
				{/*	type="text"*/}
				{/*	className="form-control"*/}
				{/*	placeholder="imageUrl"*/}
				{/*	name="imageUrl"*/}
				{/*	value={registerUser.imageUrl}*/}
				{/*	onChange={handleChange}*/}
				{/*/>*/}
				<label className="form-label fw-semibold">
					Profile Image
				</label>
				<input
					type="file"
					className="form-control file-control"
					name="imageUrl"
					onChange={handleChange}
					required={true}
				/>
				<div className="form-text">
					Upload image size 750x500!
				</div>
			</div>
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					placeholder="Password"
					name="password"
					value={registerUser.password}
					onChange={handleChange}
				/>
			</div>

			{/*<div className="form-group">*/}
			{/*	/!* <input*/}
			{/*		type="select"*/}
			{/*		className="form-control"*/}
			{/*		placeholder="Last Name"*/}
			{/*		name="authority"*/}
			{/*		value={registerUser.last_name}*/}
			{/*		onChange={handleChange}*/}
			{/*	/> *!/*/}
			{/*	<select */}
			{/*	*/}
			{/*		value={value} onChange={handleChangeROLE}*/}
			{/*		*/}
			{/*		className="form-control">*/}

			{/*		<option value={"ROLE_STUDENT"}>ROLE_STUDENT</option>*/}
			{/*		<option value={"ROLE_FACULTY"}>ROLE_FACULTY</option>*/}

			{/*	</select>*/}
			{/*</div>*/}

			<Button
				loading={loading}
				// disabled={disabled}
				btnText="Register Now"
				btnClass="default-btn"
			/>
		</motion.form>
	);
};

export default RegisterForm;
