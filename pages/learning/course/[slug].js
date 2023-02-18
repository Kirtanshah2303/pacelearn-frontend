import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import StickyBox from "react-sticky-box";
import Player from "@/components/Learning/Player";
import { useRouter } from "next/router";
import baseUrl2 from "@/utils/baseUrl2";
import axios from "axios";
import VideoList from "@/components/Learning/VideoList";
import ProgressManager from "@/components/Learning/ProgressManager";
import CourseOverview from "@/components/Learning/CourseOverview";
import Link from "next/link";
import CourseAsset from "@/components/Learning/CourseAsset";
import CourseDiscussion from "@/components/Learning/CourseDiscussion";
import CourseRating from "@/components/Learning/CourseRating";
import CourseFeedback from "@/components/Learning/CourseFeedback";

const Index = ({ user }) => {
	const [videos, setVideos] = useState([]);
	const [videoDescription, setVideoDescription] = useState("");
	const [selectedVideo, setSelectedVideo] = useState("");
	const [active, setActive] = useState("");
	const [tab, setTab] = useState("overview");
	const {
		query: { slug },
	} = useRouter();

	const fetchVideos = async () => {
		const url = `${baseUrl2}/api/videoSessions/${slug}`;
		const response = await axios.get(url);
		setVideos(response.data.video);
		setSelectedVideo(response.data.video[0].sessionVideo);
		setActive(response.data.video[0].id);
		setVideoDescription(response.data.video[0].sessionDescription);
	};

	useEffect(() => {
		fetchVideos();
	}, [slug]);

	// const selectVideo = (videoId) => {
	// 	// console.log(videoId);
	// 	try {
	// 		// const payload = {
	// 		// 	params: { userId: user.id, courseId: course.id },
	// 		// };
	// 		const url = `${baseUrl2}/api/course-sessions/${videoId}`;
	// 		const response = axios.get(url, payload);
	// 		const {
	// 			data: { sessionVideo },
	// 		} = response;
	//
	// 		setSelectedVideo(sessionVideo.video);
	// 		setActive(sessionVideo.id);
	// 		setCourse(sessionVideo.sessionDescription)
	//
	// 		// console.log(video);
	// 	} catch (err) {
	// 		// console.log(err.response.data);
	// 	}
	// };

	return (
		<>
			<Navbar user={user} />

			<div className="mt-5 pb-5 video-area">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-9 col-md-8">
							<div className="video-content">
								{selectedVideo && (
									<Player videoSrc={selectedVideo} />
								)}

								<br />
								<ul className="nav-style1">
									<li>
										<Link href={`/learning/course/${slug}`}>
											<a
												onClick={(e) => {
													e.preventDefault();
													setTab("overview");
												}}
												className={
													tab == "overview"
														? "active"
														: ""
												}
											>
												Overview
											</a>
										</Link>
									</li>
									{/*<li>*/}
									{/*	<Link href={`/learning/course/${slug}`}>*/}
									{/*		<a*/}
									{/*			onClick={(e) => {*/}
									{/*				e.preventDefault();*/}
									{/*				setTab("asset");*/}
									{/*			}}*/}
									{/*			className={*/}
									{/*				tab == "asset"*/}
									{/*					? "active"*/}
									{/*					: ""*/}
									{/*			}*/}
									{/*		>*/}
									{/*			Assets*/}
									{/*		</a>*/}
									{/*	</Link>*/}
									{/*</li>*/}
									{/*<li>*/}
									{/*	<Link href={`/learning/course/${slug}`}>*/}
									{/*		<a*/}
									{/*			onClick={(e) => {*/}
									{/*				e.preventDefault();*/}
									{/*				setTab("discussion");*/}
									{/*			}}*/}
									{/*			className={*/}
									{/*				tab == "discussion"*/}
									{/*					? "active"*/}
									{/*					: ""*/}
									{/*			}*/}
									{/*		>*/}
									{/*			Discussion*/}
									{/*		</a>*/}
									{/*	</Link>*/}
									{/*</li>*/}
									{/*<li>*/}
									{/*	<Link href={`/learning/course/${slug}`}>*/}
									{/*		<a*/}
									{/*			onClick={(e) => {*/}
									{/*				e.preventDefault();*/}
									{/*				setTab("rating");*/}
									{/*			}}*/}
									{/*			className={*/}
									{/*				tab == "rating"*/}
									{/*					? "active"*/}
									{/*					: ""*/}
									{/*			}*/}
									{/*		>*/}
									{/*			Leave a rating*/}
									{/*		</a>*/}
									{/*	</Link>*/}
									{/*</li>*/}
									{/*<li>*/}
									{/*	<Link href={`/learning/course/${slug}`}>*/}
									{/*		<a*/}
									{/*			onClick={(e) => {*/}
									{/*				e.preventDefault();*/}
									{/*				setTab("feedback");*/}
									{/*			}}*/}
									{/*			className={*/}
									{/*				tab == "feedback"*/}
									{/*					? "active"*/}
									{/*					: ""*/}
									{/*			}*/}
									{/*		>*/}
									{/*			Leave a feedback*/}
									{/*		</a>*/}
									{/*	</Link>*/}
									{/*</li>*/}
								</ul>

								{/*{course && tab == "asset" ? (*/}
								{/*	<CourseAsset {...course} />*/}
								{/*) : tab == "discussion" ? (*/}
								{/*	<CourseDiscussion {...course} />*/}
								{/*) : tab == "rating" ? (*/}
								{/*	<CourseRating {...course} />*/}
								{/*) : tab == "feedback" ? (*/}
								{/*	<CourseFeedback {...course} />*/}
								{/*) : (*/}
								{/*	<CourseOverview overview={videoDescription} />*/}
								<text>{videoDescription}</text>
								{/*)}*/}
							</div>
						</div>

						<div className="col-lg-3 col-md-4">
							<StickyBox offsetTop={20} offsetBottom={20}>
								<div className="video-sidebar">
									{/*<ProgressManager*/}
									{/*	videos_count={videos.length}*/}
									{/*	userId={user.id}*/}
									{/*	courseId={course.id}*/}
									{/*	selectedVideo={selectedVideo}*/}
									{/*/>*/}

									<div className="course-video-list">
										{/*<h4 className="title mb-3">*/}
										{/*	{course && course.title}*/}
										{/*</h4>*/}
										<ul>
											{videos.length > 0 &&
											videos.map((video) => (
													<VideoList
														key={video.id}
														{...video}
														onPlay={() =>{
															setSelectedVideo(video.sessionVideo)
															setVideoDescription(video.sessionDescription)
														}
															// selectVideo(
															// 	video.id
															// )

														}
														activeClass={active}
													/>
												))}
										</ul>
									</div>
								</div>
							</StickyBox>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
