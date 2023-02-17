import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl2 from "@/utils/baseUrl2";
import GeneralLoader from "@/utils/GeneralLoader";
import CourseCard from "@/components/Learning/CourseCard";

const Index = ({ user }) => {
	const { edmy_users_token } = parseCookies();
	const [enrolments, setEnrolments] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEnrols = async () => {
			setLoading(true);
			let bearer = 'Bearer ';
			let token = edmy_users_token;
			// console.log("Token is -->" + token);
			bearer = bearer+token;
			const payload = {
				headers: { Authorization: bearer },
			};
			console.log("Payload is --> "+payload);
			// const response = await axios.get(
			// 	// `${baseUrl}/api/learnings`,
			// 	`${baseUrl2}/api/courses/enrolled`,
			// 	payload
			// )
			const response = fetch(`${baseUrl2}/api/courses/enrolled`,{
				method : "GET",
				headers : {
					Authorization: bearer
				}
			}).then(response => response.json())
				.then(result => {
					console.log("Results is ==> "+result)
					const {enrolments} = result
					setEnrolments(enrolments)
					console.log("Response is = "+ enrolments)
				})
			// console.log("Response is = "+ (await response).json())
			// const {enrolments} = (await response).json();
			// console.log("Response is = "+ enrolments)
			// console.log("Enrollment details is --> "+ enrolments)
			// setEnrolments(response.data.enrolments);



			setLoading(false);
		};

		fetchEnrols();
	}, []);

	return (
		<>
			<Navbar user={user} />

			<div className="ptb-100">
				<div className="container">
					<h2 className="fw-bold mb-4">My learning</h2>

					<ul className="nav-style1">
						<li>
							<Link href="/learning/my-courses/">
								<a className="active">All Courses</a>
							</Link>
						</li>
						<li>
							<Link href="/learning/wishlist/">
								<a>Wishlist</a>
							</Link>
						</li>
					</ul>

					<div className="row">
						{loading ? (
							<GeneralLoader />
						) : (
							<>
								{enrolments &&
									enrolments.map((enrol) => (
										// <CourseCard key={enrol.id} {...enrol} />
										<CourseCard key={enrol.id} course={enrol} />
										// <CourseCard key={id} {...enrol} />
									))}
								{/* <div className="col-lg-12 col-md-12">
									<div className="pagination-area text-center">
										<Pagination sizes={[1]} total={pages} />
									</div>
								</div> */}
							</>
						)}
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
