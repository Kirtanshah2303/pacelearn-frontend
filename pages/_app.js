import React, { useEffect} from "react";
import { parseCookies } from "nookies";
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
	return (
		<AppContext.Provider value={{ user, setUser }}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AppContext.Provider>
	);
}


export default MyApp;