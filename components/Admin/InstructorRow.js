import React from "react";

const InstructorRow = ({
	id,
						   firstName,
						   lastName,
	email,
						   activated,
	instructor_subject,
	instructor_description,
						   make_reviewer,
						   onMakeReviewer = null,
						   onRemoveReviewer = null,
}) => {
	return (
		<tr>
			<td>{`${firstName} ${lastName}`}</td>
			<td>{email}</td>
			{
				activated === true &&
				<td>Activated</td>
			}
			{
				activated === false &&
				<td> Not Activated </td>
			}
			{/*<td>{instructor_subject}</td>*/}
			{/*<td>*/}
			{/*	<div className="max-300px max-height-60">*/}
			{/*		{instructor_description}*/}
			{/*	</div>*/}
			{/*</td>*/}
			<td>
				{make_reviewer ? (
					<button
						type="button"
						className="btn btn-success btn-sm fs-12 ms-2"
						onClick={() => onMakeReviewer(id)}
					>
						Make Reviewer
					</button>
				) : (
					<button
						type="button"
						className="btn btn-success btn-sm fs-12 ms-2"
						onClick={() => onRemoveReviewer(id)}
					>
						Remove Reviewer
					</button>
				)}
			</td>
			{/*{!make_reviewer && (*/}
			{/*	<td>*/}
			{/*		<button*/}
			{/*			type="button"*/}
			{/*			className="btn btn-success btn-sm fs-12 ms-2"*/}
			{/*			onClick={() => onApprove(id)}*/}
			{/*		>*/}
			{/*			Approve Now*/}
			{/*		</button>*/}

			{/*		<button*/}
			{/*			type="button"*/}
			{/*			className="btn btn-danger btn-sm fs-12 ms-2"*/}
			{/*			onClick={() => onDeny(id)}*/}
			{/*		>*/}
			{/*			Decline*/}
			{/*		</button>*/}
			{/*	</td>*/}
			{/*)}*/}
		</tr>
	);
};

export default InstructorRow;
