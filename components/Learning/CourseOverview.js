import React from "react";

const CourseOverview = ( {overview} ) => {
	return (
		<div className="tab-pane fade show active">
			<div className="course-contents">
				<div dangerouslySetInnerHTML={{ __html: overview }}></div>
				{/*<h1>{overview}</h1>*/}
			</div>
		</div>
	);
};

export default CourseOverview;
