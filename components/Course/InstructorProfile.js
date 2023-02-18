import React from "react";
import Link from "next/link";

const InstructorProfile = ({ instructor }) => {
	const { firstName, lastName, imageUrl } = instructor;
	// console.log(instructor);
	return (
		<div className="admin-info d-flex align-items-center">
			<Link href="/instructor">
				<a>
					<img
						src={
							imageUrl
								? imageUrl
								: "/images/admin/admin-10.jpg"
						}
						alt={firstName}
					/>
				</a>
			</Link>
			<span>Created By </span>{" "}
			<Link href="/instructor">
				<a>
					{firstName} {lastName}
				</a>
			</Link>
		</div>
	);
};

export default InstructorProfile;
