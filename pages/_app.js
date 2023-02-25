import React, {useContext, useEffect, useState} from "react";
import { Provider } from "react-redux";
import { useStore } from "../store";
import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";
import { redirectUser } from "@/utils/auth";
import baseUrl2 from "@/utils/baseUrl2";
import "../styles/bootstrap.min.css";
import "../styles/animate.min.css";
import "../styles/boxicons.min.css";
import "../styles/flaticon.css";
import "../styles/remixicon.css";
import "../styles/nprogress.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "react-tabs/style/react-tabs.css";
import "swiper/css";
import "swiper/css/bundle";
import "react-confirm-alert/src/react-confirm-alert.css";
import "@etchteam/next-pagination/dist/index.css";
import "react-loading-skeleton/dist/skeleton.css";

// Global Styles
import "../styles/style.css";
import "../styles/responsive.css";

// Dashboard
import "../styles/dashboard.css";

import Layout from "../components/_App/Layout";
import cookie from "js-cookie";
import AppContext from './AppContext';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = React.useState(null);
	// const myContext = useContext(AppContext);
	// useEffect(() => {
	// 	try{
	// 		const fetchData = async () => {
	// 			if(typeof cookie.get("charuvidhya_users_token") !== 'undefined' && (myContext.user === null || (typeof myContext.user) === undefined )) {
	//
	// 				const options = {
	// 					headers: {
	// 						'Authorization': 'Bearer ' + cookie.get('charuvidhya_users_token'),
	// 						'Content-Type': 'application/json',
	// 					}
	// 				};
	// 				const response = await fetch(`${baseUrl2}/api/account`, options);
	// 				const jsonData = await response.json();
	// 				myContext.setUser(jsonData);
	// 				console.log("Data@@@@@@@@@@@@@@@@@" + myContext.user + "JSON :" + jsonData);
	// 			}
	// 		};
	// 		fetchData();
	// 	}
	// 	catch (e) {
	// 		console.log("Context------------>"+myContext+"\n"+e);
	// 	}
	// }, []);

	// const store = useStore(pageProps.initialReduxState);
	return (
		<AppContext.Provider value={{ user, setUser }}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AppContext.Provider>
	);
}


MyApp.getInitialProps = async ({ Component, ctx }) => {
	// const { charuvidhya_users_token } = parseCookies(ctx);
	let pageProps = {};
	console.log("First Time --------------->"+Component.user);

	// if (Component.getInitialProps) {
	// 	pageProps = await Component.getInitialProps(ctx);
	// }
	// const cookie = ctx.req.headers.cookie
	// console.log("ohh-----------------<<---"+cookie.get("charuvidhya_users_token")+"--->>");

	// if(typeof cookie.get("charuvidhya_users_token") !== 'undefined' || (Component.user === null || (typeof Component.user) === undefined )) {
	//
	// 	const options = {
	// 		headers: {
	// 			'Authorization': 'Bearer ' + cookie.get('charuvidhya_users_token'),
	// 			'Content-Type': 'application/json',
	// 		}
	// 	};
	// 	const response = await fetch(`${baseUrl2}/api/account`, options);
	// 	const jsonData = await response.json();
	// 	console.log("Result ------------------>"+Component.setUser(jsonData));
	// 	console.log("Data-------------->" + Component.user + "JSON :" + jsonData);
	// }
	if (typeof cookie.get("charuvidhya_users_token") === 'undefined') {
		// if a user not logged in then user can't access those pages
		const isProtectedRoute =
			ctx.pathname === "/profile/basic-information" ||
			ctx.pathname === "/profile/photo" ||
			ctx.pathname === "/checkout" ||
			ctx.pathname === "/become-an-instructor" ||
			ctx.pathname === "/learning/my-courses" ||
			ctx.pathname === "/instructor/courses" ||
			ctx.pathname === "/admin" ||
			ctx.pathname === "/admin/instructor" ||
			ctx.pathname === "/admin/students" ||
			ctx.pathname === "/admin/partners" ||
			ctx.pathname === "/admin/testimonials" ||
			ctx.pathname === "/admin/categories" ||
			ctx.pathname === "/checkout" ||
			ctx.pathname === "/learning/wishlist";

		if (isProtectedRoute) {
			redirectUser(ctx, "/auth");
		}
	} else {
		// if a user logged in then user can't access those pages
		// const ifLoggedIn =
		// 	ctx.pathname === "/auth" || ctx.pathname === "/reset-password";
		// if (ifLoggedIn) {
		// 	redirectUser(ctx, "/");
		// }





		// try {
		// 	if (!(typeof cookie.get('charuvidhya_users_token')==="undefined")){
		// 		const options = {
		// 			headers: {
		// 				'Authorization': 'Bearer ' + cookie.get('charuvidhya_users_token'),
		// 				'Content-Type': 'application/json',
		// 			}
		// 		};
		// 		const response = await fetch(`${baseUrl2}/api/account`, options);
		// 		const jsonData = await response.json();
		//
		// 		// if (!user) {
		// 		// 	destroyCookie(ctx, "charuvidhya_users_token");
		// 		// 	redirectUser(ctx, "/auth");
		// 		// }
		// 		pageProps.user = jsonData;
		// 	}
		// } catch (err) {
		// 	destroyCookie(ctx, "charuvidhya_users_token");
		// 	// redirectUser(ctx, "/");
		// }
	}
	return {
		pageProps,
	};
};

export default MyApp;
