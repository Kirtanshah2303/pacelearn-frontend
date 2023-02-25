import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Cookies from 'js-cookie'
import toast from "react-hot-toast";

const CourseCard = ({ course, onFav, onUnFav, userId, onAddCart }) => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const router = useRouter();
	// const {
	// 	id,
	// 	title,
	// 	slug,
	// 	courseDescription,
	// 	latest_price,
	// 	before_price,
	// 	lessons,
	// 	image,
	// 	user,
	// 	enrollments = [],
	// } = course;
	const {
		id,
		courseTitle,
		courseDescription,
		courseCategory,
		courseLength,
		courseLogo,
		enrolledUsersLists,
		courseObjectives,
		courseUpdatedOn,
		user,
	} = course;
	// const [fav, setfavs] = useState(false);
	// const [add, setAdd] = useState(false);
	// const [buy, setBuy] = useState(false);



	const enroll = (courseID) => {

		const cookies = Cookies.get("charuvidhya_users_token")

		if(cookies){
			let bearer = 'Bearer ';
			let token = cookies;
			/*console.log("Token is -->" + token);*/
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
							/*console.log("Already Enrolled")*/
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
						/*console.log("Access Denied")*/
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
					/*console.log(result.status);
					console.log('Demo passed enrolled');*/
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

	// useEffect(() => {
	// 	setAdd(cartItems.some((cart) => cart.id === id));
	// 	if (userId && course && id) {
	// 		const payload = {
	// 			params: { userId: userId, courseId: id },
	// 		};
	// 		const url = `${baseUrl}/api/courses/course/exist`;
	// 		axios.get(url, payload).then((result) => {
	// 			if (result && result.data.enroll === true)
	// 				setBuy(result.data.enroll);
	// 		});
	// 	}
	// }, [course, cartItems]);

	// useEffect(() => {
	// 	if (userId) {
	// 		const payload = {
	// 			params: {
	// 				userId: userId,
	// 				courseId: id,
	// 			},
	// 		};

	// 		const url = `${baseUrl}/api/favourites/new`;
	// 		axios.get(url, payload).then((result) => {
	// 			setfavs(result.data);
	// 		});
	// 	} else {
	// 		setfavs(false);
	// 	}
	// }, [fav]);

	return (
		<div className="col-lg-3 col-md-6">
			<div className="single-courses">
				<div className="courses-main-img">
					<img src={courseLogo} alt="Image" />
				</div>
				<div className="courses-content">
					<h3>{courseTitle}</h3>
					<ul className="admin">
						<li>
							<img
								src={
									user.imageUrl
										? user.imageUrl
										: "/images/avatar.jpg"
								}
								className="rounded-circle"
								alt={user.firstName}
								style={{ height: "25px", width: "25px" }}
							/>
						</li>
						<li>
							<span>By</span>
						</li>
						<li style={{fontSize: "15px"}}>{`${user.firstName} ${user.lastName}`}</li>
					</ul>

				</div>

				<div className="courses-hover-content">
					<div className="sk">
						<div>
							<h3>
								<Link href={`/course/${id}`}>
									<a>{courseTitle}</a>
								</Link>
							</h3>
							<p>{courseDescription.slice(0, 108)}</p>

							<div className="courses-btn d-flex justify-content-between align-items-center">
								{/* {buy ? (
									<button
										className="default-btn"
										onClick={() =>
											router.push(
												`/learning/course/${slug}`
											)
										}
									>
										View My Course
									</button>
								) */}
								<>
									{/* {add ? (
											<button
												className="default-btn"
												onClick={() =>
													router.push("/checkout")
												}
											>
												View Cart
											</button>
										) : ( */}
									<button
										className="default-btn"
										onClick={() =>
											enroll(id)
										}
									>
										Enroll
									</button>
									{/* )} */}
								</>
								{/* )} */}
								{/* {fav ? (
									<motion.button
										whileTap={{ scale: 3 }}
										transition={{ duration: 0.5 }}
										className="default-btn wish"
										onClick={() => {
											onUnFav(id);
											setfavs(!fav);
										}}
									>
										<i className="ri-heart-fill"></i>
										<i className="ri-heart-fill hover"></i>
									</motion.button>
								) : (
									<motion.button
										whileTap={{ scale: 3 }}
										transition={{ duration: 0.5 }}
										className="default-btn wish"
										onClick={() => {
											onFav(id);
											setfavs(!fav);
										}}
									>
										<i className="ri-heart-line"></i>
										<i className="ri-heart-fill hover"></i>
									</motion.button>
								)} */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
