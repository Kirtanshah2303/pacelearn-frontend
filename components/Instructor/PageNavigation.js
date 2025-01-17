import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl2 from "@/utils/baseUrl2";

const PageNavigation = ({ courseId, activeClassname }) => {
	const { charuvidhya_users_token } = parseCookies();
	const [course, setCourse] = useState({ title: "" });

	useEffect(() => {
		const fetchCourse = async () => {
			const payload = {
				headers: { Authorization: "Bearer "+charuvidhya_users_token },
			};
			const url = `${baseUrl2}/api/courses/${courseId}`;
			const response = await axios.get(url, payload);
			setCourse({ title: response.data.course.courseTitle });
		};

		fetchCourse();
	}, []);

	return (
		<>
			<h2 className="fw-bold mb-4">Title: {course && course.title}</h2>

			<ul className="nav-style1">
				<li>
					<Link href="/instructor/courses/">
						<a>Courses</a>
					</Link>
				</li>
				<li>
					<Link href="/instructor/course/create/">
						<a>Create Course</a>
					</Link>
				</li>
				<li>
					<Link href={`/instructor/course/edit/${courseId}`}>
						<a
							className={
								activeClassname == "edit" ? "active" : ""
							}
						>
							Edit Course
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/instructor/course/section/${courseId}`}>
						<a
							className={
								activeClassname == "section" ? "active" : ""
							}
						>
							Course Section
						</a>
					</Link>
				</li>
				{/*<li>*/}
				{/*	<Link href={`/instructor/course/EditCourseSection/${courseId}`}>*/}
				{/*		<a*/}
				{/*			className={*/}
				{/*				activeClassname == "EditSection" ? "active" : ""*/}
				{/*			}*/}
				{/*		>*/}
				{/*			Edit Course Section*/}
				{/*		</a>*/}
				{/*	</Link>*/}
				{/*</li>*/}
				<li>
					<Link href={`/instructor/course/upload/${courseId}`}>
						<a
							className={
								activeClassname == "upload" ? "active" : ""
							}
						>
							Upload Video
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/instructor/course/video/${courseId}`}>
						<a
							className={
								activeClassname == "editVideo" ? "active" : ""
							}
						>
							Edit Video
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/instructor/course/uploads/${courseId}`}>
						<a
							className={
								activeClassname == "uploads" ? "active" : ""
							}
						>
							Videos
						</a>
					</Link>
				</li>
				{/*<li>
					<Link href={`/instructor/course/assets/${courseId}`}>
						<a
							className={
								activeClassname == "assets" ? "active" : ""
							}
						>
							Assets
						</a>
					</Link>
				</li>*/}
			</ul>
		</>
	);
};

export default PageNavigation;
