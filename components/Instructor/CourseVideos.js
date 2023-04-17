import React, {useState} from "react";
import {BsFillEyeFill} from 'react-icons/bs';
import {AiFillEdit,AiFillDelete} from 'react-icons/ai';


//import "@fontawsome/~font-awesome/scss/font-awesome.scss";
import CourseRow from "@/components/Admin/CourseRow";
import FsLightbox from "fslightbox-react";
//import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
//import {faBars} from '@fontawesome/free-solid-svg-icons';
//import { faFaceRelieved } from '@fontawesome/pro-solid-svg-icons'


const CourseVideos = ({ id:videoId,sessionOrder, sessionTitle, isPreview, isPublished, onDelete ,sessionVideo }) => {

	const [preview, setPreview] = useState("");
	const [toggler, setToggler] = useState(false);

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
							className="btn btn-danger"
							onClick={() => {
								setPreview(sessionVideo);
								// {preview && <FsLightbox toggler={toggler} sources={[preview]} />}
								setToggler(!toggler);
							}}><BsFillEyeFill  width={11} style={{color:"black" , fontSize:"20px"}}
																		 />

						{/*<img height={27} width={27} onClick={() => {*/}
						{/*	setPreview(sessionVideo);*/}
						{/*	// {preview && <FsLightbox toggler={toggler} sources={[preview]} />}*/}
						{/*	setToggler(!toggler);*/}
						{/*}}/>*/}

					</button>
					<button style={{background:"#59a5e4"}} //onClick={() => onDelete(videoId)}
							className="btn btn-danger">
						<AiFillEdit style={{color:"black",  fontSize:"20px" }}/>
						{/*<img src="/edit-solid.svg" height={23} width={23}/>*/}
					</button>
					<button onClick={() => onDelete(videoId)}
							className="btn btn-danger">
						<AiFillDelete style={{color:"black" , fontSize:"20px"}}/>
						{/*<img src="/trash-solid.svg" height={17} width={17}/>*/}

					</button>
				</div>
				{preview && <FsLightbox toggler={toggler} sources={[preview]} />}
			</td>
		</tr>

	);
};

export default CourseVideos;