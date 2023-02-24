import React from "react";
import CourseRow from "@/components/Admin/CourseRow";

const CourseVideos = ({ id:videoId,sessionOrder, sessionTitle, isPreview, isPublished, onDelete }) => {


	return (

		<div className="table-responsive">
			<table className="table align-middle table-hover fs-14" >
				<div className="create-course-form">
					{console.log("VIdeos ----------------->isPublies:"+isPublished+"isPreview"+isPreview)}
					<thead></thead>



					{/*<div className="card" style={{ width: "18rem" }}>*/}
					{/*	<img*/}
					{/*		src={thumb ? thumb : ""}*/}
					{/*		className="card-img-top"*/}
					{/*		alt="..."*/}
					{/*	/>*/}
					{/*	<div className="card-body">*/}
					{/*		<h5 className="card-title">{title}</h5>*/}
					{/*		<button*/}
					{/*			onClick={() => onDelete(videoId)}*/}
					{/*			className="btn btn-danger"*/}
					{/*		>*/}
					{/*			Delete*/}
					{/*		</button>*/}
					{/*	</div>*/}
					{/*</div>*/}

					{/*<tbody>*/}
					{/*{courses.length > 0 ? (*/}
					{/*	courses.map((course) => (*/}
					{/*		<CourseRow*/}
					{/*			key={course.id}*/}
					{/*			{...course}*/}
					{/*			onHome={() =>*/}
					{/*				handleCourseHome(*/}
					{/*					course.id*/}
					{/*				)*/}
					{/*			}*/}
					{/*			onHomeRemove={() =>*/}
					{/*				handleCourseRemoveHome(*/}
					{/*					course.id*/}
					{/*				)*/}
					{/*			}*/}
					{/*		/>*/}
					{/*	))*/}
					{/*) : (*/}
					{/*	<tr>*/}
					{/*		<td*/}
					{/*			colSpan="7"*/}
					{/*			className="text-center py-3"*/}
					{/*		>*/}
					{/*			Empty!*/}
					{/*		</td>*/}
					{/*	</tr>*/}
					{/*)}*/}
					{/*</tbody>	*/}
			<tbody className="tbody,td,tfoot,th,thead,tr">
					<tr className="videoDetailrows">
						<td scope="col" style={{width: "12rem"}}>{sessionOrder}</td>
						<td scope="col" style={{width: "15rem"}}>{sessionTitle} </td>
						<td scope="col" style={{width: "12rem"}}>3 hr 50 min</td>
						<td scope="col" style={{width: "12rem"}}>{isPreview.toString()}</td>
						<td scope="col" style={{width: "12rem"}}>{isPublished.toString()}</td>
						<td scope="col" style={{width: "12rem"}}>
							<div className="btn-group">
								<button style={{background:"#008000"}} //onClick={() => onDelete(videoId)}
										className="btn btn-danger">
									View Content

								</button>
								<button style={{background:"#2780e3"}} //onClick={() => onDelete(videoId)}
										className="btn btn-danger"> edit</button>

								<button onClick={() => onDelete(videoId)}
										className="btn btn-danger"> Delete</button>
							</div>

						</td>
					</tr>
</tbody>



				</div>
			</table>
		</div>

	);
};

export default CourseVideos;
//className="col-lg-3 col-md-6"