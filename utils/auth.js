import cookie from "js-cookie";
import Router from "next/router";
import baseUrl2 from "@/utils/baseUrl2";
import AppContext from 'pages/AppContext.js'
import {useContext} from "react";



export const handleLogin = (t, routeNext) => {

	const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
	cookie.set("charuvidhya_users_token", t, { expires: expirationDate });
	// fetchData(t);
	if (routeNext.query && routeNext.query.next) {
		Router.push(routeNext.query.next);
	} else {
		Router.push("/");
	}
};

export const handleLogout = () => {
	cookie.remove("charuvidhya_users_token");
	Router.push("/");
	window.location.reload();
};

export const destroyCookie = () => {
	cookie.remove("charuvidhya_users_token");
	Router.reload("/");
};

export const redirectUser = (ctx, location) => {
	if (ctx.req) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push({ pathname: location, query: { next: ctx.pathname } });
	}
};

export const slugify = (string) => {
	return string
		.toString()
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
};
