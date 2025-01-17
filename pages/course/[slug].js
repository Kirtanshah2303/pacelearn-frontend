import React, {useContext, useEffect, useState} from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import CoursesDetailsContent from "@/components/SingleCourses/CoursesDetailsContent";
import Footer from "@/components/_App/Footer";
import axios from "axios";
import baseUrl2 from "@/utils/baseUrl2";
import toast from "react-hot-toast";
import AppContext from "../AppContext";
import {fetchUserData} from "../gobals";

const courseDeatails = ({  }) => {
	const [course, setCourse] = useState({});
	const router = useRouter();
	const { slug } = router.query;
	const [cnt,setCnt]=useState(10);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { user, setUser } = useContext(AppContext);

	// eslint-disable-next-line react-hooks/rules-of-hooks

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		fetchUserData(user,setUser);
		const fetchCourse = async () => {
			try {
				const payload = {
					params: { slug: slug },
				};
				const url = `${baseUrl2}/api/courses/${slug}`;

				fetch(`${baseUrl2}/api/courses/${slug}/student-count`, {
					method: 'GET',
					headers: {
						accept: '*/*',
						// Authorization: bearer,
					}
				})
					.then(response =>{
						// response.json()
						console.log("HAHA -> "+response.json().then(result => {
							// console.log(result.studentCount)
							setCnt(result.studentCount)
							console.log("COunt --> "+cnt)
						}))
					} )

				const response = await axios.get(url);
				console.log("Response in slug.js file -->"+response)
				setCourse(response.data.course);
			} catch (err) {
				let {
					response: {
						data: { message },
					},
				} = err;
				toast.error(message, {
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
			}
		};

		fetchCourse();
	}, [slug]);

	return (
		<>
			<Navbar user={user} />
			<PageBanner
				pageTitle={course && course.title}
				homePageUrl="/courses"
				homePageText="Courses"
				activePageText={course && course.title}
			/>
			{/*{<CoursesDetailsContent user={user} course={course} studentCount={cnt} />}*/}
			{course && <CoursesDetailsContent user={user} course={course} studentCount={cnt} slug={slug} />}
			<Footer />
		</>
	);
};

export default courseDeatails;
