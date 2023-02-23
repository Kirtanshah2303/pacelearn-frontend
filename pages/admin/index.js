import React, {useEffect, useState} from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import baseUrl2 from "@/utils/baseUrl2";
import {parseCookies} from "nookies";
import toast from "react-hot-toast";
import Router from "next/router";

const INITIAL_USER = {
	students : 0,
	instructor : 0,
	reviewer : 0,
	approvedCourses : 0,
	approvalPendingCourses : 0,
	courseVideos : 0,
	totalEnrollment : 0,
	// authorities : [""]

};

const Index = ({
				   // students,
				   // instructor,
				   // reviewer,
				   // approvedCourses,
				   // approvalPendingCourses,
				   // courseVideos,
				   // totalEnrollment,
					user,
}) => {

	const { edmy_users_token } = parseCookies();
	const [students,setStudents] = useState(0);
	const [instructor,setInstructor] = useState(0);
	const [reviewer,setReviewer] = useState(0);
	const [approvedCourses,setApprovedCourses] = useState(0);
	const [approvalPendingCourses,setApprovalPendingCourses] = useState(0);
	const [courseVideos,setCourseVideos] = useState(0);
	const [totalEnrollment,setTotalEnrollment] = useState(0);

	const fetchData = async () => {
		const res = await fetch(`${baseUrl2}/api/coreMetaData`,{
			headers : {
				Authorization : "Bearer "+edmy_users_token
			}
		})
		console.log("Token is --> "+edmy_users_token)
		const {
			students,
			instructor,
			reviewer,
			approvedCourses,
			approvalPendingCourses,
			courseVideos,
			totalEnrollment,
			status
		} = await res.json();
		setApprovalPendingCourses(approvalPendingCourses)
		setStudents(students)
		setCourseVideos(courseVideos)
		setTotalEnrollment(totalEnrollment)
		setInstructor(instructor)
		setReviewer(reviewer)
		setApprovedCourses(approvedCourses)

		if (status === "FORBIDDEN"){
			toast.error("Access Denied, You do not have access to view this page", {
				style: {
					border: "1px solid #ff0033",
					padding: "16px",
					color: "#ff0033",
				},
				iconTheme: {
					primary: "#ff0033",
					secondary: "#FFFAEE",
				},
			})
			Router.push("/");
		}
	}

	useEffect(() => {
		fetchData();
	}, []);


	return (
		<>
			<Navbar user={user} />

			<div className="main-content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-3 col-md-4">
							<AdminSideNav user={user} />
						</div>

						<div className="col-lg-9 col-md-8">
							<div className="main-content-box">
								<div className="row justify-content-center">
									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-group"></i>
											<h1>{students}</h1>
											<p>Total Students</p>
										</div>
									</div>

									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-group"></i>
											<h1>{instructor}</h1>
											<p>Total Instructors</p>
										</div>
									</div>

									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-group"></i>
											<h1>{reviewer}</h1>
											<p>Total Reviewers</p>
										</div>
									</div>

									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-group"></i>
											<h1>{totalEnrollment}</h1>
											<p>Course Enrolled</p>
										</div>
									</div>

									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-book-add"></i>
											<h1>{approvedCourses}</h1>
											<p>Total Approved Courses</p>
										</div>
									</div>

									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bxs-bell-ring"></i>
											<h1>{approvalPendingCourses}</h1>
											<p>Total Approval Pending Courses</p>
										</div>
									</div>
									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bxs-file"></i>
											<h1>{courseVideos}</h1>
											<p>Total Video Sessions</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

// This gets called on every request
// export async function getServerSideProps() {
// 	// Fetch data from external API
// 	const { edmy_users_token } = parseCookies();
// 	const res = await fetch(`${baseUrl2}/api/coreMetaData`,{
// 		headers : {
// 			Authorization : "Bearer "+edmy_users_token
// 		}
// 	})
// 	console.log("Token is --> "+edmy_users_token)
// 	const {
// 		students,
// 		instructor,
// 		reviewer,
// 		approvedCourses,
// 		approvalPendingCourses,
// 		courseVideos,
// 		totalEnrollment,
// 	} = await res.json();
//
// 	// Pass data to the page via props
// 	return {
// 		// props: {
// 		// 	students,
// 		// 	instructor,
// 		// 	reviewer,
// 		// 	approvedCourses,
// 		// 	approvalPendingCourses,
// 		// 	courseVideos,
// 		// 	totalEnrollment,
// 		// },
// 	};
// }

export default Index;
