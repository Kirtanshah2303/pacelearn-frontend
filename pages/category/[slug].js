import React, {useState, useEffect, useContext} from "react";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import CoursesList from "@/components/Courses/CoursesList";
import Footer from "@/components/_App/Footer";
import { useRouter } from "next/router";
import axios from "axios";
import AppContext from "../AppContext";
import {fetchUserData} from "../gobals";
import baseUrl2 from "@/utils/baseUrl2";

export default function CoursesPage({  }) {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { slug } = router.query;

	const { user, setUser } = useContext(AppContext);

	// eslint-disable-next-line react-hooks/rules-of-hooks

	const fetchCourses = async () => {
		setLoading(true);
		const response = await axios.get(`${baseUrl2}/api/categories/${slug}`);
		setCourses(response.data.courses.courses);
		setLoading(false);
	};

	useEffect(() => {
		fetchUserData(user,setUser);
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
