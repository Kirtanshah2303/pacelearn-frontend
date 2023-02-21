import React, {useEffect, useState} from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageNavigation from "@/components/Instructor/PageNavigation";
import { useRouter } from "next/router";
import UploadVideoForm from "@/components/Instructor/UploadVideoForm";
import {parseCookies} from "nookies";
import baseUrl2 from "@/utils/baseUrl2";

const Index = ({ user }) => {
	const router = useRouter();
	const { edmy_users_token } = parseCookies();
	const [section, setSection] = useState([]);
	const { id: courseId } = router.query;


	// useEffect(() => {
	//
	// 	fetch(`${baseUrl2}/api/course-section/${courseId}`,{
	// 		headers: { Authorization: edmy_users_token },
	// 	}).then(response => response.json().then(result => {
	// 		console.log(result)
	// 		setSection(result)
	// 	}))
	//
	// },[])



	return (
		<>
			<Navbar user={user} />

			<div className="ptb-100">
				<div className="container">
					<PageNavigation
						courseId={courseId}
						activeClassname="upload"
					/>

					<div className="create-course-form">
						<UploadVideoForm courseId={courseId}  />
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
