import React, {useState, useEffect, useContext} from "react";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import CoursesList from "@/components/Courses/CoursesList";
import Footer from "@/components/_App/Footer";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import {fetchUserData} from "../gobals";
import AppContext from "../AppContext";

export default function CoursesPage({}) {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { slug } = router.query;
	const { user, setUser } = useContext(AppContext);

	const fetchCourses = async () => {
		setLoading(true);

		const response = await axios.get(`${baseUrl}/api/categories/${slug}`);
		setCourses(response.data.courses.courses);
		setLoading(false);
	};

	useEffect(() => {
		fetchUserData();
		fetchCourses();
	}, [slug]);
	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle="Category"
				homePageUrl="/"
				homePageText="Home"
				activePageText="Category"
			/>

			<div className="pt-100 pb-70">
				<div className="container">
					<CoursesList courses={courses} user={user} />
				</div>
			</div>

			<Footer />
		</>
	);
}
