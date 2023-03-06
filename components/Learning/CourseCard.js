import React from "react";
import Link from "next/link";

const CourseCard = ({ course: { user, courseLogo, courseTitle, id} }) => {
	return (
		<div className="col-lg-4 col-md-6">
			<div className="single-courses-box style-2">
				<div className="courses-image">
					{/*	{is_class ? (*/}
					{/*	<Link href={`/learning/course/class/${id}`}>*/}
					{/*		<a className="d-block image">*/}
					{/*			<img src={courseLogo} alt={courseTitle} />*/}
					{/*		</a>*/}
					{/*	</Link>*/}
					{/*	) : (*/}
						<Link href={`/learning/course/${id}`}>
							<a className="d-block image courses-main-img">
								<img src={courseLogo} alt={courseTitle} />
							</a>
						</Link>
					{/*)	}*/}

					<div className="video_box">
						<div className="d-table">
							<div className="d-table-cell">
								{/*	{is_class ? (*/}
								{/*	<Link*/}
								{/*		href={`/learning/course/class/${id}`}*/}
								{/*	>*/}
								{/*		<a>*/}
								{/*			<i className="bx bx-play"></i>*/}
								{/*		</a>*/}
								{/*	</Link>*/}
								{/*) : (*/}
									<Link href={`/learning/course/${id}`}>
										<a>
											<i className="bx bx-play"></i>
										</a>
									</Link>
								{/*	)}*/}
							</div>
						</div>
					</div>
				</div>
				<div className="courses-content">
					<h3>
						{/*	{is_class ? (*/}
						{/*	<Link href={`/learning/course/class/${id}`}>*/}
						{/*		<a>{courseTitle}</a>*/}
						{/*	</Link>*/}
						{/*) : (*/}
							<Link href={`/learning/course/${id}`}>
								<a>{courseTitle}</a>
							</Link>
						{/*	)}*/}
					</h3>

					<div className="course-author d-flex justify-content-between">
						<span>{`${user.firstName}`}</span>
						<p>Start Course</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
