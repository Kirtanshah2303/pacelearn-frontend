import baseUrl2 from "@/utils/baseUrl2";
import { secondsToHms } from "@/utils/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FsLightbox from "fslightbox-react";

const CourseVideo = ({ courseSlug }) => {
	// console.log(courseSlug);
	const [videos, setVideos] = useState([]);
	const [preview, setPreview] = useState("");
	const [toggler, setToggler] = useState(false);
	useEffect(() => {
		const fetchVideos = async () => {
			const url = `${baseUrl2}/api/videoSessions/${courseSlug}`;
			const response = await axios.get(url);
			setVideos(response.data.video);
		};
		fetchVideos();
	}, [courseSlug]);

	return (
		<>
			<div className="courses-curriculum">
				<ul>
					{videos &&
						videos.map((v) => (
							<li key={v.id}>
								<div className="d-flex justify-content-between align-items-center">
									<span className="courses-name">
										{v.sessionTitle}
									</span>
									<div className="courses-meta">
										<span className="duration">
											{secondsToHms(v.sessionDuration)}
										</span>
										{v.isPreview ? (
											<span
												className="status"
												onClick={() => {
													setPreview(v.sessionVideo);
													setToggler(!toggler);
												}}
											>
												preview
											</span>
										) : (
											<span
												className="status locked"
												title="Premium"
											>
												{/*<i className="flaticon-password"></i>*/}
											</span>
										)}
									</div>
								</div>
							</li>
						))}
				</ul>
			</div>

			{preview && <FsLightbox toggler={toggler} sources={[preview]} />}
		</>
	);
};

export default CourseVideo;
