import React, {useState, useEffect, useContext} from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl2 from "@/utils/baseUrl2";
import { parseCookies } from "nookies";
import GeneralLoader from "@/utils/GeneralLoader";
import InstructorRow from "@/components/Admin/InstructorRow";
import {confirmAlert} from "react-confirm-alert";
import {fetchUserData} from "../../gobals";
import AppContext from "../../AppContext";

const Index = ({  }) => {
	const { charuvidhya_users_token } = parseCookies();
	const [instructors, setInstructors] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user, setUser } = useContext(AppContext);


	const fetchData = async () => {
		setLoading(true);
		try {
			const payload = {
				headers: { Authorization: "Bearer "+ charuvidhya_users_token },
			};
			const response = await axios.get(
				`${baseUrl2}/api/admin/instructor`,
				payload
			);
			setInstructors(response.data.instructors);
			setLoading(false);
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
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserData(user,setUser);
		fetchData();
	}, []);

	const handleMakeReviewer = async (instId) => {


		confirmAlert({
			title: "Confirm to Make this Instructor a Reviewer",
			message: "Are you sure for this?",
			buttons: [
				{
					label: "Yes",
					onClick: async () => {
						try {
							const payload = {
								headers: { Authorization: "Bearer "+ charuvidhya_users_token },
							};

							const payloadData = { instId, approve: true };
							const response = await axios.put(
								`${baseUrl2}/api/admin/instructor/${instId}/make-reviewer`,
								payloadData,
								payload
							);
							toast.success(response.data.message, {
								style: {
									border: "1px solid #4BB543",
									padding: "16px",
									color: "#4BB543",
								},
								iconTheme: {
									primary: "#4BB543",
									secondary: "#FFFAEE",
								},
							});
							fetchData();
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
						} finally {
							setLoading(false);
							fetchData();
						}
					}
				},
				{
					label: "No",
				},
			],
		});


	};

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
								<ul className="nav-style1">
									<li>
										<Link href="/admin/instructor/">
											<a className="active">
												Instructors
											</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/instructor/requests/">
											<a>Reviewers</a>
										</Link>
									</li>
								</ul>
								{loading ? (
									<GeneralLoader />
								) : (
									<div className="table-responsive">
										<table className="table align-middle table-hover fs-14">
											<thead>
												<tr>
													<th scope="col">Name</th>
													<th scope="col">Email</th>
													<th scope="col">Activated</th>
													{/*<th scope="col">Subject</th>*/}
													{/*<th scope="col">Text</th>*/}
													<th scope="col">Status</th>
												</tr>
											</thead>
											<tbody>
												{instructors.length > 0 ? (
													instructors.map(
														(instructor) => (
															<InstructorRow
																key={
																	instructor.id
																}
																{...instructor}
																make_reviewer={true}
																onMakeReviewer={() =>
																	handleMakeReviewer(
																		instructor.id
																	)
																}
															/>
														)
													)
												) : (
													<tr>
														<td
															colSpan="7"
															className="text-center py-3"
														>
															Empty!
														</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
