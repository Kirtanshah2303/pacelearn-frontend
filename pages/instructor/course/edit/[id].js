import React, {useContext, useEffect, useState} from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import CourseUpdateForm from "@/components/Instructor/CourseUpdateForm";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl2 from "@/utils/baseUrl2";
import PageNavigation from "../../../../components/Instructor/PageNavigation";
import AppContext from "../../../AppContext";
import {fetchUserData} from "../../../gobals";

const Create = ({ }) => {
	const { charuvidhya_users_token } = parseCookies();
	const router = useRouter();
	const { id: courseId } = router.query;
	const [course, setCourse] = useState({});
	const { user, setUser } = useContext(AppContext);


	useEffect(() => {
		fetchUserData(user,setUser);
		const fetchCourse = async () => {
			const payload = {
				headers: { Authorization:"Bearer "+ charuvidhya_users_token },
			};
			const url = `${baseUrl2}/api/courses/${courseId}`;
			const response = await axios.get(url, payload);
			setCourse(response.data.course);
		};

		fetchCourse();
	}, []);

	return (
		<>
			<Navbar user={user} />

			<div className="ptb-100">
				<div className="container">
					<PageNavigation
						courseId={courseId}
						activeClassname="edit"
					/>

					<div className="create-course-form">
						{course && <CourseUpdateForm courseData={course} />}
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Create;
