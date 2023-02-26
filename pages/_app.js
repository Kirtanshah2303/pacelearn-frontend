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
import cookies from "js-cookie";
import AppContext from './AppContext';
import {isAuthorized} from "./gobals";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
	const { charuvidhya_users_token } = parseCookies();
	const [user, setUser] = React.useState(null);
	useEffect(() => {
		const isProtectedRoute =
			Router.pathname === "/profile/basic-information" ||
			Router.pathname === "/profile/photo" ||
			Router.pathname === "/learning/my-courses" ||
			Router.pathname === "/instructor/courses" ||
			Router.pathname === "/admin" ||
			Router.pathname === "/admin/instructor" ||
			Router.pathname === "/admin/students" ||
			Router.pathname === "/admin/partners" ||
			Router.pathname === "/admin/testimonials" ||
			Router.pathname === "/admin/categories" ||
			Router.pathname === "/learning/wishlist";
		if (!charuvidhya_users_token && isProtectedRoute) {
			Router.push('/auth');
		}
	}, []);
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
	let pageProps = {};
	console.log("First Time --------------->"+Component.user);
	console.log("Authorized -------------------->"+isAuthorized+"\n");
	// if (!isAuthorized) {
	// 	// if a user not logged in then user can't access those pages
	// 	const isProtectedRoute =
	// 		ctx.pathname === "/profile/basic-information" ||
	// 		ctx.pathname === "/profile/photo" ||
	// 		ctx.pathname === "/checkout" ||
	// 		ctx.pathname === "/become-an-instructor" ||
	// 		ctx.pathname === "/learning/my-courses" ||
	// 		ctx.pathname === "/instructor/courses" ||
	// 		ctx.pathname === "/admin" ||
	// 		ctx.pathname === "/admin/instructor" ||
	// 		ctx.pathname === "/admin/students" ||
	// 		ctx.pathname === "/admin/partners" ||
	// 		ctx.pathname === "/admin/testimonials" ||
	// 		ctx.pathname === "/admin/categories" ||
	// 		ctx.pathname === "/checkout" ||
	// 		ctx.pathname === "/learning/wishlist";
	//
	// 	console.log("ohh-----------------<<---"+cookies.get("charuvidhya_users_token")+"--->>");
	// 	console.log("ohh-----------------<<---"+Component.charuvidhya_users_token+"--->>");
	// 	if (isProtectedRoute) {
	// 		const options = {
	// 			headers: {
	// 				'Authorization': 'Bearer ' +Component.charuvidhya_users_token,
	// 				'Content-Type': 'application/json',
	// 			}
	// 		};
	// 		const response = await fetch(`${baseUrl2}/api/account`, options);
	// 		const jsonData = await response.json();
	// 		if(typeof jsonData.firstName ==="undefined"){
	// 			redirectUser(ctx, "/auth");
	// 		}
	// 		else{
	//
	// 		}
	// 	}
	// } else {
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
	// }
	return {
		pageProps,
	};
};

export default MyApp;
