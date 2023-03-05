import React from "react";
//import "@fontawsome/~font-awesome/scss/font-awesome.scss";
import CourseRow from "@/components/Admin/CourseRow";
//import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
//import {faBars} from '@fontawesome/free-solid-svg-icons';
//import { faFaceRelieved } from '@fontawesome/pro-solid-svg-icons'


const CourseVideos = ({ id:videoId,sessionOrder, sessionTitle, isPreview, isPublished, onDelete }) => {

	return (

		<tr className="videoDetailrows">
			<td style={{padding:'1em'}} >{sessionOrder}</td>
			<td  style={{padding:'1em'}}>{sessionTitle} </td>
			<td  style={{padding:'1em'}}>3 hr 50 min</td>
			<td  style={{padding:'1em'}}>{isPreview.toString()}</td>
			<td  style={{padding:'1em'}}>{isPublished.toString()}</td>
			<td  style={{padding:'1em'}}>
				<div className="btn-group">
					<button style={{background:"rgb(68 198 87)" }} //onClick={() => onDelete(videoId)}
							className="btn btn-danger" >
						<img src="/view.png" height={27} width={27}/>

					</button>
					<button style={{background:"#59a5e4"}} //onClick={() => onDelete(videoId)}
							className="btn btn-danger"> <img src="/edit-solid.svg" height={23} width={23}/></button>
					<button onClick={() => onDelete(videoId)}
							className="btn btn-danger"> <img src="/trash-solid.svg" height={17} width={17}/></button>
				</div>
			</td>
		</tr>

	);
};

export default CourseVideos;