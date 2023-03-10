import cookie from "js-cookie";
import Router from "next/router";
import toast from "react-hot-toast";

export const handleLogin = (t, routeNext) => {

	const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
	cookie.set("charuvidhya_users_token", t, { expires: expirationDate });
	if (routeNext.query && routeNext.query.next) {
		Router.push(routeNext.query.next);
	} else {
		Router.push("/");
	}
};

export const handleLogout = (user,setUser) =>  {
	toast.error("Logged Out", {
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
	cookie.remove("charuvidhya_users_token");
	setUser(null);
	Router.push("/auth");
	// window.location.reload();
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
