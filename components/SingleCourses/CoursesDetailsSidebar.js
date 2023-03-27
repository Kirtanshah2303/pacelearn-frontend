import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import BuyCourseBtn from "./BuyCourseBtn";
import { calculateDiscount } from "@/utils/helper";
import Cookies from "js-cookie";
import {MyCourses} from "../../pages/gobals";
import {router} from "next/client";

const CoursesDetailsSidebar = ({ current_user,course_id, course , studentCount }) => {
	// console.log(course);
	// const cartItems = useSelector((state) => state.cart.cartItems);
	// const dispatch = useDispatch();
	// const [add, setAdd] = useState(false);
	// const [alreadyBuy, setAlreadyBuy] = useState(false);
	// const router = useRouter();
	// const [apply, setApplyCoupon] = useState(false);
	// const [coupon, setCoupon] = useState({ coupon: "" });
	// const [cnt,setCnt]=useState(10);
	// useEffect(()=>{

	// })

	const enroll = (courseID) => {
		fecten
		const cookies = Cookies.get("charuvidhya_users_token")

		if(cookies){
			let bearer = 'Bearer ';
			let token = cookies;
			// console.log("Token is -->" + token);
			bearer = bearer+token;

			fetch(`http://localhost:8080/api/courses/enroll`, {
				method: 'POST',
				headers: {
					accept: '*/*',
					Authorization: bearer,
				},
				body: courseID,
			})
				// .then(response => response.json())
				.then((response) => {
					// if(!response.ok) throw new Error(response.status);
					if (response.status === 400) {
						toast.error("Already Enrolled", {
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
						// console.log("Already Enrolled")
						throw new Error(response.status);
					}
					else return response.json();

				})
				.then(result => {
					if(result.status === "FORBIDDEN"){
						toast.error("Access Denied for this action", {
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
						// console.log("Access Denied")
						return false;
					}
					toast.success("Course enrolled successfully", {
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
					window.location.href = '/';
					// console.log(result.status);
					// console.log('Demo passed enrolled');
					// console.log(this.state);
					return true;
				})
				.catch(error => {
					console.log(error);
					return false;
				});

			return true;

		}else{
			window.location.href = '/auth';
		}

	}


	// const cntStud =(courseID) => {
	// 	console.log("--------------->"+course_id);
	// 	fetch(`http://localhost:8080/api/courses/${course_id}/student-count`, {
	// 		method: 'GET',
	// 		headers: {
	// 			accept: '*/*',
	// 			// Authorization: bearer,
	// 		}
	// 	})
	// 		.then(response =>{
	// 			// response.json()
	// 			console.log("HAHA -> "+response.json().then(result => {
	// 				// console.log(result.studentCount)
	// 				setCnt(result.studentCount)
	// 				console.log("COunt --> "+cnt)
	// 			}))
	// 		} )
	// }
	// useEffect(() => {
	// 	// const courseExist = cartItems.find((cart) => {
	// 	// 	return course.id === cart.id;
	// 	// });
	// 	// courseExist && setAdd(true);
	// 	if (current_user && course && course.id) {
	// 		const payload = {
	// 			params: { userId: current_user.id, courseId: course.id },
	// 		};
	// 		const url = `${baseUrl}/api/courses/course/exist`;
	// 		axios.get(url, payload).then((result) => {
	// 			if (result && result.data.enroll === true)
	// 				setAlreadyBuy(result.data.enroll);
	// 		});
	// 	}
	// }, [cartItems, course]);

	// const addToCart = (courseCart) => {
	// 	let courseObj = {};
	// 	courseObj["id"] = courseCart.id;
	// 	courseObj["title"] = courseCart.title;
	// 	courseObj["slug"] = courseCart.slug;
	// 	courseObj["price"] = discount > 0 ? discount : courseCart.latest_price;
	// 	courseObj["regular_price"] = courseCart.before_price;
	// 	courseObj["image"] = courseCart.image;
	// 	courseObj["lessons"] = courseCart.lessons;
	// 	courseObj["duration"] = courseCart.duration;
	// 	courseObj["access_time"] = courseCart.access_time;
	// 	courseObj["quantity"] = 1;
	// 	courseObj[
	// 		"instructor"
	// 	] = `${courseCart.user.first_name} ${courseCart.user.last_name}`;
	// 	dispatch({
	// 		type: "ADD_TO_CART",
	// 		data: courseObj,
	// 	});
	// };

	// const handleCoupon = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		// const payload = { coupon: coupon };
	//
	// 		// const response = await axios.post(
	// 		// 	`${baseUrl}/api/coupons/get-coupon`,
	// 		// 	payload
	// 		// );
	//
	// 		// console.log(response.data.discount);
	//
	// 		dispatch({
	// 			type: "GET_DISCOUNT",
	// 			data: calculateDiscount(
	// 				response.data.discount.discount,
	// 				course.latest_price
	// 			),
	// 		});
	//
	// 		toast.success(response.data.message, {
	// 			style: {
	// 				border: "1px solid #4BB543",
	// 				padding: "16px",
	// 				color: "#4BB543",
	// 			},
	// 			iconTheme: {
	// 				primary: "#4BB543",
	// 				secondary: "#FFFAEE",
	// 			},
	// 		});
	// 	} catch (err) {
	// 		let {
	// 			response: {
	// 				data: { message },
	// 			},
	// 		} = err;
	// 		toast.error(message, {
	// 			style: {
	// 				border: "1px solid #ff0033",
	// 				padding: "16px",
	// 				color: "#ff0033",
	// 			},
	// 			iconTheme: {
	// 				primary: "#ff0033",
	// 				secondary: "#FFFAEE",
	// 			},
	// 		});
	// 	}
	// };

	return (
		<div className="col-lg-4">
			<div className="course-details-sidebar">
				<div className="course-preview">
					<img src={course.courseLogo} alt={course.courseTitle} />
				</div>

				<div className="sidebar-futcher">
					{/*<div className="sidebar-title d-flex justify-content-between">*/}
					{/*	<h2>*/}
					{/*		{discount > 0 ? discount : course.latest_price}{" "}*/}
					{/*		{course.before_price > 0 && (*/}
					{/*			<del>${course.before_price}</del>*/}
					{/*		)}*/}
					{/*	</h2>*/}
					{/*	{course.before_price > 0 && <p>Offer for today</p>}*/}
					{/*</div>*/}

					<ul>
						{/*<li>*/}
						{/*	<div className="d-flex justify-content-between align-items-center">*/}
						{/*		<span>*/}
						{/*			<i className="ri-tv-line"></i> Live Class*/}
						{/*		</span>*/}
						{/*		{course.is_class ? (*/}
						{/*			<div className="live-class-icon"></div>*/}
						{/*		) : (*/}
						{/*			"No"*/}
						{/*		)}*/}
						{/*	</div>*/}
						{/*</li>*/}
						<li>
							<i className="ri-bar-chart-fill"></i>
							Category
							<span>
								{course.courseCategory && course.courseCategory.courseCategoryTitle}
							</span>
						</li>
						<li>
							<i className="ri-time-line"></i>
							Duration
							<span>{"9h 50min"}</span>
						</li>
						<li>
							<i className="ri-booklet-line"></i>
							Lectures
							<span>{25}</span>
						</li>
						{/*<li>*/}
						{/*	<i className="ri-store-line"></i>*/}
						{/*	Resources*/}
						{/*	<span>*/}
						{/*		{course.assets && course.assets.length}{" "}*/}
						{/*		downloadable*/}
						{/*	</span>*/}
						{/*</li>*/}
						<li>
							<i className="ri-group-line"></i>
							Enrolled
							<span>
								  {studentCount}{" "}
								Students
							</span>
						</li>
						{/*<li>*/}
						{/*	<i className="ri-key-2-fill"></i>*/}
						{/*	Access*/}
						{/*	<span>{course.access_time}</span>*/}
						{/*</li>*/}
					</ul>

					{/*<div className="coupon">*/}
					{/*	<h4 onClick={() => setApplyCoupon(!apply)}>*/}
					{/*		Apply Coupon*/}
					{/*	</h4>*/}
					{/*	{apply && (*/}
					{/*		<form onSubmit={handleCoupon}>*/}
					{/*			<input*/}
					{/*				type="text"*/}
					{/*				className="input-search"*/}
					{/*				placeholder="Enter Coupon"*/}
					{/*				name="search"*/}
					{/*				value={coupon.coupon}*/}
					{/*				onChange={(e) => setCoupon(e.target.value)}*/}
					{/*			/>*/}
					{/*			<button type="submit">*/}
					{/*				<b>Apply</b>*/}
					{/*			</button>*/}
					{/*		</form>*/}
					{/*	)}*/}
					{/*</div>*/}

					{/*<div className="cart-wish d-flex justify-content-between">*/}
					{/*	{alreadyBuy ? (*/}
					{/*		<button*/}
					{/*			onClick={() =>*/}
					{/*				router.push("/learning/my-courses")*/}
					{/*			}*/}
					{/*			className="default-btn"*/}
					{/*		>*/}
					{/*			View My Courses*/}
					{/*		</button>*/}
					{/*	) : (*/}
					{/*		<>*/}
					{/*			{add ? (*/}
					{/*				<button*/}
					{/*					onClick={() => router.push("/checkout")}*/}
					{/*					className="default-btn"*/}
					{/*				>*/}
					{/*					View Cart*/}
					{/*				</button>*/}
					{/*			) : (*/}
					{/*				<button*/}
					{/*					onClick={() => addToCart(course)}*/}
					{/*					className="default-btn"*/}
					{/*				>*/}
					{/*					Add To Cart*/}
					{/*				</button>*/}
					{/*			)}*/}
					{/*		</>*/}
					{/*	)}*/}
					{/*</div>*/}

					{/*{!alreadyBuy && !add && (*/}
					{/*	<BuyCourseBtn*/}
					{/*		current_user={current_user}*/}
					{/*		course={course}*/}
					{/*	/>*/}
					{/*)}*/}
					{MyCourses.includes(String(course_id)) ?
					<button
						className="default-btn buy"
						onClick={() =>
							router.push(`/learning/course/${course_id}`)
						}
					>
						View Course
					</button>: <button
						className="default-btn buy"
						onClick={() =>
							enroll(course_id)
						}
					>
						Enroll
					</button>
					}
				</div>
			</div>
		</div>
	);
};

export default CoursesDetailsSidebar;
