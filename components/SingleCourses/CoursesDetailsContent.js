import React, { useState } from "react";
import Link from "next/link";
import CoursesDetailsSidebar from "./CoursesDetailsSidebar";
import WhatYouWillLearn from "../Course/WhatYouWillLearn";
import InstructorProfile from "../Course/InstructorProfile";
import { formatDate } from "@/utils/helper";
import TabContent from "./TabContent";

const CoursesDetailsContent = ({ user: current_user, course , studentCount }) => {
	// const {
	// 	title,
	// 	slug,
	// 	overview,
	// 	what_you_will_learn,
	// 	who_is_this_course_for,
	// 	requirements,
	// 	is_class,
	// 	updated_at,
	// 	category,
	// 	user,
	// 	enrolments,
	// } = course;
	const {
		id,
		courseTitle,
		courseDescription,
		courseCategory,
		courseLength,
		courseLogo,
		courseObjectives,
		enrolledUsersLists,
		courseUpdatedOn,
		user,
	} = course;

	console.log("ID --> "+id)
	console.log("courseTitle is  --> "+courseTitle)

	return (
		<div className="course-details-area ptb-100">
			<div className="container">
				<div className="row">
					<div className="col-lg-8">
						<div className="course-details-content">
							<h2 className="title">{courseTitle}</h2>
							<ul className="best-seller">
								{courseCategory && (
									<li>
										<Link
											href={`/category/${courseCategory.id}`}
										>
											<a>{courseCategory.courseCategoryTitle}</a>
										</Link>
									</li>
								)}
								<li>
									<span>
										{enrolledUsersLists && enrolledUsersLists.length}
									</span>{" "}
									Students
								</li>
								<li>
									Last Updated{" "}
									<span>{formatDate(courseUpdatedOn)}</span>
								</li>
							</ul>

							<div className="gap-mb-30"></div>

							{user && <InstructorProfile instructor={user} />}

							<div className="gap-mb-30"></div>

							<WhatYouWillLearn
								what_you_will_learn={courseObjectives}
							/>

							<div className="gap-mb-50"></div>

							<TabContent
								overview={courseDescription}
								// courseSlug={id}
								// //requirements={requirements}
								// instructor={user}
								// who_is_this_course_for={courseObjectives}
								//is_class={is_class}
							/>
						</div>
					</div>

					<CoursesDetailsSidebar
						current_user={current_user}
						course={course}
						// course_id={id}
						studentCount = {studentCount}
					/>
				</div>
			</div>
		</div>
	);
};

export default CoursesDetailsContent;
