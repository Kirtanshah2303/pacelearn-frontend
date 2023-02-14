import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { handleLogin } from "@/utils/auth";
import baseUrl2 from "@/utils/baseUrl2";
import { useRouter } from "next/router";
import Button from "../../utils/Button";
import { motion } from "framer-motion";

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
	authorities : [""]

};

const RegisterForm = () => {
	const [user, setUser] = React.useState(INITIAL_USER);
	const [value,setValue] = React.useState("");
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();

	React.useEffect(() => {
		const isUser = Object.values(user).every((el) => Boolean(el));
		isUser ? setDisabled(false) : setDisabled(true);
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({ ...prevState, [name]: value }));
	};
	
	const handleChangeROLE = (event) => {

		setValue(event.target.value);
	 
	  };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const url = `${baseUrl2}/api/register`;
			const payload = { ...user };
			const response = await axios.post(url, payload);
			handleLogin(response.data.edmy_users_token, router);
			toast.success(response.data.message, {
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
					value={user.login}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="First Name"
					name="firstName"
					value={user.firstName}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="Last Name"
					name="lastName"
					value={user.lastName}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					placeholder="Email"
					name="email"
					value={user.email}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="imageUrl"
					name="imageUrl"
					value={user.imageUrl}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					placeholder="Password"
					name="password"
					value={user.password}
					onChange={handleChange}
				/>
			</div>
			
			<div className="form-group">
				{/* <input
					type="select"
					className="form-control"
					placeholder="Last Name"
					name="authority"
					value={user.last_name}
					onChange={handleChange}
				/> */}
				<select 
				
					value={value} onChange={handleChangeROLE}
					
					className="form-control">

					<option value={"ROLE_STUDENT"}>ROLE_STUDENT</option>
					<option value={"ROLE_FACULTY"}>ROLE_FACULTY</option>

				</select>
			</div>

			<Button
				loading={loading}
				disabled={disabled}
				btnText="Register Now"
				btnClass="default-btn"
			/>
		</motion.form>
	);
};

export default RegisterForm;
