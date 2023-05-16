import React, {useState, useEffect, useContext} from "react";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import CoursesList from "@/components/Courses/CoursesList";
import Footer from "@/components/_App/Footer";
import SearchForm from "@/components/_App/SearchForm";
import FilterDropdown from "@/components/Courses/FilterDropdown";
import { useRouter } from "next/router";
import Pagination from "@etchteam/next-pagination";
import axios from "axios";
import baseUrl2 from "@/utils/baseUrl2";
import AppContext from "../AppContext";
import {fetchUserData} from "../gobals";
import CourseCard from "@/components/Courses/CourseCard";

export default function CoursesPage({  }) {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const page = router.query.page ? router.query.page : "1";
	const size = router.query.size ? router.query.size : "8";
	const short = router.query.short ? router.query.short : "";
	const search = router.query.search ? router.query.search : "";

	const { user, setUser } = useContext(AppContext);

	const course = courses.sort((a, b) => new Date(b.courseCreatedOn) - new Date(a.courseCreatedOn));



	// eslint-disable-next-line react-hooks/rules-of-hooks

	const fetchCourses = async () => {
		setLoading(true);

		const payload = {
			params: {
				page,
				limit: size,
				short: short,
				search: search,
			},
		};
		const response = await axios.get(`${baseUrl2}/api/courses`, payload);


		// {console.log("URL:"+baseUrl2+"/api/courses"+"-----------Token:")}
		// console.log(response.data);
		let courseList =[]
		short && short.length > 0 ?
			courses.length > 0 ? (
				courses.map((course) => (
					course.courseCategory.courseCategoryTitle === short.toString() ?
						courseList.push(course) : null
				))

			) : null
			: null
		short && short.length > 0 ?
			setCourses(courseList)
			:
			setCourses(response.data.courses);
		setLoading(false);
	};
	useEffect(() => {
		fetchUserData(user,setUser);
		fetchCourses();
	}, [page, size, short, search]);

	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle="Courses"
				homePageUrl="/"
				homePageText="Home"
				activePageText="Courses"
			/>

			<div className="courses-area ptb-100">
				<div className="container">
					<div className="section-title wow animate__animated animate__fadeInUp delay-0-2s">
						<span className="top-title">Courses</span>
						<h2>Expand Your Career Opportunity With Our Courses</h2>
					</div>

					<div className="search-result">
						<div className="row align-items-center">
							<div className="col-lg-6 col-md-5">
								<p>
									We found <span>{courses.length}</span> Total courses
									available for you
								</p>
							</div>
							<div className="col-lg-6 col-md-7">
								<ul>
									<li>
										<SearchForm
											formClass="src-form"
											btnClass="src-btn"
										/>
									</li>
									<FilterDropdown />
								</ul>
							</div>
						</div>
					</div>

					{console.log("Courses ---------------------->"+JSON.stringify(courses))}
					{courses && <CoursesList courses={courses} user={user} short={short} />}
					{/*{courses.length > 9 && (*/}
					{/*	<div className="col-lg-12 col-md-12">*/}
					{/*		<div className="pagination-area text-center">*/}
					{/*			<Pagination sizes={[1]} total={pages} />*/}
					{/*		</div>*/}
					{/*	</div>*/}
					{/*)}*/}
				</div>
			</div>

			<Footer />
		</>
	);
}
