import React, {useContext, useEffect, useState} from "react";
import { confirmAlert } from "react-confirm-alert";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageNavigation from "@/components/Instructor/PageNavigation";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl2 from "@/utils/baseUrl2";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import CourseVideos from "@/components/Instructor/CourseVideos";
import GeneralLoader from "@/utils/GeneralLoader";
import {fetchUserData} from "../../../gobals";
import AppContext from "../../../AppContext";

const Index = ({  }) => {
	const { charuvidhya_users_token } = parseCookies();
	const router = useRouter();
	const { id: courseId } = router.query;
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user, setUser } = useContext(AppContext);

	const fetchVideos = async () => {
		setLoading(true);
		const payload = {
			headers: { Authorization: "Bearer "+charuvidhya_users_token },
		};

		const url = `${baseUrl2}/api/videoSessions/${courseId}`;

		const response = await axios.get(url, payload);
		setVideos(response.data.video);
		setLoading(false);
	};

	useEffect(() => {
		fetchVideos();
		fetchUserData(user,setUser);
	}, []);

	const confirmDelete = (videoId) => {
		confirmAlert({
			title: "Confirm to delete",
			message: "Are you sure to delete this?",
			buttons: [
				{
					label: "Yes",
					onClick: () => handleDelete(videoId),
				},
				{
					label: "No",
				},
			],
		});
	};

	const handleDelete = async (videoId) => {
		try {
			setLoading(true);
			const payload = {
				headers: { Authorization: "Bearer "+ charuvidhya_users_token },
			};

			const url = `${baseUrl2}/api/course-sessions/${videoId}`;

			const response = await axios.delete(url, payload);
			setLoading(false);
			toast.success("Video Session Deleted!", {
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
			fetchVideos();
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
	return (
		<>
			<Navbar user={user} />

			<div className="ptb-100">
				<div className="container">
					<PageNavigation
						courseId={courseId}
						activeClassname="uploads"
					/>

					{loading ? (
						<GeneralLoader />
					) : (
						<table className="table align-middle table-hover fs-14">
							<div className="create-course-form">


								<thead className="videoDetailrows">
								<tr >
									<th scope="col" style={{width: "12rem"}}>session order</th>
									<th scope="col" style={{width: "12rem"}}>session Title</th>

									<th scope="col" style={{width: "12rem"}}>
										session Duration
									</th>
									<th scope="col" style={{width: "12rem"}}>Is preview</th>
									<th scope="col" style={{width: "12rem"}}>
										Is published</th>
									<th scope="col" style={{width: "12rem"}}>
										Buttons</th>
								</tr>
								</thead>

								{videos.length > 0
									? videos.map((videos) => (
										<CourseVideos
											key={videos.id}
											{...videos}
											onDelete={() =>
												confirmDelete(videos.id)
											}
										/>
									))
									: "Empty"}


							</div>
						</table>


					)}
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
