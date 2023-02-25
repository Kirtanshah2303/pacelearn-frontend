import React, {useState,useEffect} from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import Link from "next/link";
import CourseCreateForm from "@/components/Instructor/CourseCreateForm";
import baseUrl2 from "@/utils/baseUrl2";
import {parseCookies} from "nookies";

const Create = ({ user }) => {
	const { charuvidhya_users_token } = parseCookies();
	const [parentCategories, setParentCategories] = useState([]);
	// const [categories, setCategories] = useState([]);
	const [level, setLevel] = useState([]);

	useEffect(() => {
		// const { charuvidhya_users_token } = parseCookies();
		// const [parentCategories, setParentCategories] = useState([]);
		// // const [categories, setCategories] = useState([]);
		// const [level, setLevel] = useState([]);

		fetch(`${baseUrl2}/api/course-category/parent-categories`,{
			headers: { Authorization: charuvidhya_users_token },
		}).then(response => response.json().then(result => {
			// console.log(result.parentCategories)
			setParentCategories(result.parentCategories)
		}))

		fetch(`${baseUrl2}/api/course-levels`,{
			headers: { Authorization: charuvidhya_users_token },
		}).then(response => response.json().then(result => {
			// console.log(result.levels)
			setLevel(result.levels)
		}))
	}, []);



	return (
		<>
			<Navbar user={user} />

			<div className="ptb-100">
				<div className="container">
					<h2 className="fw-bold mb-4">Create the Course</h2>

					<ul className="nav-style1">
						<li>
							<Link href="/instructor/courses/">
								<a>Courses</a>
							</Link>
						</li>
						<li>
							<Link href="/instructor/course/create/">
								<a className="active">Create a Course</a>
							</Link>
						</li>
						<li>
							<Link href="/instructor/course/create-class/">
								<a>Create Class Room</a>
							</Link>
						</li>
					</ul>

					<div className="create-course-form">
						<CourseCreateForm parentCategories={parentCategories} level ={level} />
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Create;
