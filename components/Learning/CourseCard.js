import React from "react";
import Link from "next/link";
import {MyCourses} from "../../pages/gobals";

const CourseCard = ( { course} ) => {
	const {
		id,
		courseCreatedOn,
		courseTitle,
		courseDescription,
		courseCategory,
		courseLength,
		courseLogo,
		enrolledUsersLists,
		courseObjectives,
		courseUpdatedOn,
		user,
	} = course;

	return (
		<div className="col-lg-3 col-md-6">
			<div className="single-courses" style={{}}>

				<div className="courses-main-img">


					<img src={courseLogo} alt="Image" />

				</div>
				<div className="courses-content">
					<h3>{courseTitle}</h3>
					<ul className="admin">
						<li>
							<img
								src={
									user.imageUrl
										? user.imageUrl
										: "/images/avatar.jpg"
								}
								className="rounded-circle"
								alt={user.firstName}
								style={{ height: "25px", width: "25px" }}
							/>
						</li>
						<li>
							<span>By</span>
						</li>
						<li style={{fontSize: "15px"}}>{`${user.firstName} `} </li>
					</ul>

					<ul className="admin" >

						<li>
							<img
								src="/images/banner/client-1.jpg"

								alt="banner"
							/>
							<img
								src="/images/banner/client-2.jpg"
								className="client"
								style={{marginLeft:"-10px"}}
								alt="banner"
							/>
							<img
								src="/images/banner/client-3.jpg"
								style={{marginLeft:"-10px"}}
								className="client"
								alt="banner"
							/>
						</li>
						<li>
							<p style={{fontSize:"12px"}}>
								{enrolledUsersLists} Students

							</p>
						</li>
						<li>
							<p style={{marginLeft : "50px",textAlign:"right", fontSize:"14px"}}> created on: <br/>{courseCreatedOn}</p>
						</li>

					</ul>

				</div>



			</div>
		</div>
		// <div className="col-lg-4 col-md-6">
		// 	<div className="single-courses-box style-2">
		// 		<div className="courses-image">
		// 			{/*	{is_class ? (*/}
		// 			{/*	<Link href={`/learning/course/class/${id}`}>*/}
		// 			{/*		<a className="d-block image">*/}
		// 			{/*			<img src={courseLogo} alt={courseTitle} />*/}
		// 			{/*		</a>*/}
		// 			{/*	</Link>*/}
		// 			{/*	) : (*/}
		// 				<Link href={`/learning/course/${id}`}>
		// 					<a className="d-block image courses-main-img">
		// 						<img src={courseLogo} alt={courseTitle} />
		// 					</a>
		// 				</Link>
		//
		// 			{/*)	}*/}
		//
		// 			<div className="video_box">
		// 				<div className="d-table">
		// 					<div className="d-table-cell">
		// 						{/*	{is_class ? (*/}
		// 						{/*	<Link*/}
		// 						{/*		href={`/learning/course/class/${id}`}*/}
		// 						{/*	>*/}
		// 						{/*		<a>*/}
		// 						{/*			<i className="bx bx-play"></i>*/}
		// 						{/*		</a>*/}
		// 						{/*	</Link>*/}
		// 						{/*) : (*/}
		// 							<Link href={`/learning/course/${id}`}>
		// 								<a>
		// 									<i className="bx bx-play"></i>
		// 								</a>
		// 							</Link>
		//
		// 						{/*	)}*/}
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 		{/*<div className="courses-content">*/}
		// 		{/*	<h3>*/}
		// 		{/*		/!*	{is_class ? (*!/*/}
		// 		{/*		/!*	<Link href={`/learning/course/class/${id}`}>*!/*/}
		// 		{/*		/!*		<a>{courseTitle}</a>*!/*/}
		// 		{/*		/!*	</Link>*!/*/}
		// 		{/*		/!*) : (*!/*/}
		// 		{/*			<Link href={`/learning/course/${id}`}>*/}
		// 		{/*				<a>{courseTitle}</a>*/}
		// 		{/*			</Link>*/}
		// 		{/*		/!*	)}*!/*/}
		// 		{/*	</h3>*/}
		//
		// 		{/*	<div className="course-author d-flex justify-content-between">*/}
		// 		{/*		<span>{`${user.firstName}` }*/}
		// 		{/*			<ul >*/}
		// 		{/*		<li>*/}
		// 		{/*			<img*/}
		// 		{/*				src="/images/banner/client-1.jpg"*/}
		// 		{/*				style={{marginLeft:"-10px"}}*/}
		// 		{/*				alt="banner"*/}
		// 		{/*			/>*/}
		// 		{/*			<img*/}
		// 		{/*				src="/images/banner/client-2.jpg"*/}
		// 		{/*				className="client"*/}
		// 		{/*				style={{marginLeft:"-10px"}}*/}
		// 		{/*				alt="banner"*/}
		// 		{/*			/>*/}
		// 		{/*			<img*/}
		// 		{/*				src="/images/banner/client-3.jpg"*/}
		// 		{/*				style={{marginLeft:"-10px"}}*/}
		// 		{/*				className="client"*/}
		// 		{/*				alt="banner"*/}
		// 		{/*			/>*/}
		// 		{/*		</li>*/}
		// 		{/*		<li>*/}
		// 		{/*			<p style={{fontSize:"12px"}}>*/}
		// 		{/*				{}  Students*/}
		//
		// 		{/*			</p>*/}
		// 		{/*		</li>*/}
		// 		{/*				*/}
		// 		{/*		</ul>*/}
		// 		{/*			*/}
		// 		{/*			*/}
		// 		{/*		</span>*/}
		//
		// 		{/*	</div>*/}
		// 		{/*</div>*/}
		// 		<div className="courses-content">
		// 			<h3>{courseTitle}</h3>
		// 			<ul className="admin">
		// 				<li>
		// 					<img
		// 						src={
		// 							user.imageUrl
		// 								? user.imageUrl
		// 								: "/images/avatar.jpg"
		// 						}
		// 						className="rounded-circle"
		// 						alt={user.firstName}
		// 						style={{ height: "25px", width: "25px" }}
		// 					/>
		// 				</li>
		// 				<li>
		// 					<span>By</span>
		// 				</li>
		// 				<li style={{fontSize: "15px"}}>{`${user.firstName} ${user.lastName}`} </li>
		// 			</ul>
		//
		// 			<ul className="admin" >
		//
		// 				<li>
		// 					<img
		// 						src="/images/banner/client-1.jpg"
		//
		// 						alt="banner"
		// 					/>
		// 					<img
		// 						src="/images/banner/client-2.jpg"
		// 						className="client"
		// 						style={{marginLeft:"-10px"}}
		// 						alt="banner"
		// 					/>
		// 					<img
		// 						src="/images/banner/client-3.jpg"
		// 						style={{marginLeft:"-10px"}}
		// 						className="client"
		// 						alt="banner"
		// 					/>
		// 				</li>
		// 				<li>
		// 					<p style={{fontSize:"12px"}}>
		// 						  Students
		//
		// 					</p>
		// 				</li>
		// 				<li>
		// 					<p style={{marginLeft : "50px",textAlign:"right", fontSize:"14px"}}> created on: <br/></p>
		// 				</li>
		//
		// 			</ul>
		//
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default CourseCard;
