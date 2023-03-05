import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { handleLogin } from "@/utils/auth";
import baseUrl2 from "@/utils/baseUrl2";
import { useRouter } from "next/router";
import Button from "../../utils/Button";
import { motion } from "framer-motion";

const INITIAL_USER = {
	username: "",
	password: "",
	rememberMe:false ,
};

const LoginForm = () => {
	const [user, setUser] = React.useState(INITIAL_USER);
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// setUser({
			// 	username : email.value,
			// 	password : password.value
			// })
			setLoading(true);
			const url = `${baseUrl2}/api/authenticate`;
			// const url = `${baseUrl2}/demoPostAPI`;
			// const headers = { 
			// 	'Access-Control-Allow-Origin': 'http://localhost:8080'
			// };
			const payload = { ...user };
			const response = await axios.post(url, payload);
			// const response = await fetch(url, {
    		// 		method: "POST",
    		// 		mode: "cors",
    		// 		headers: {
			// 			'Content-Type': 'application/json',
			// 			'Access-Control-Allow-Headers':
			// 			  'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
			// 			'Access-Control-Allow-Methods': 'OPTIONS,POST',
			// 			'Access-Control-Allow-Credentials': true,
			// 			'Access-Control-Allow-Origin': '*',
			// 			'X-Requested-With': '*',
    		// 	},
    		// 	body : payload,
			// });

			handleLogin(response.data.id_token, router);
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

	// const handleSubmit = async (e) => {
	// 	console.log("Hello from handleSubmit")
	// }

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
					placeholder="username"
					name="username"
					value={user.username}
					onChange={handleChange}
					autoFocus
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
			<Button
				loading={loading}
				// disabled={disabled}
				btnText="Login Now"
				btnClass="default-btn"
			/>
		</motion.form>
	);
};

export default LoginForm;