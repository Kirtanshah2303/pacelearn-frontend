import React, {useContext, useState} from "react";
import { motion } from "framer-motion";
import Link from "@/utils/ActiveLink";
import { handleLogout } from "@/utils/auth";
import AppContext from "../../pages/AppContext";

const ProfileDropdown = ({
	id,
	firstName,
	email,
	authorities,
	imageUrl,
}) => {
	const [isMouse, toggleMouse] = useState(false);
	const toggleMouseMenu = () => {
		toggleMouse(!isMouse);
	};

	const isAdmin = authorities.includes("ROLE_ADMIN");
	const isInstructor = authorities.includes("ROLE_FACULTY");
	const isStudent = authorities.includes("ROLE_STUDENT");
	const { user, setUser } = useContext(AppContext);

	const subMenuAnimate = {
		enter: {
			opacity: 1,
			rotateX: 0,
			transition: {
				duration: 0.3,
			},
			display: "block",
		},
		exit: {
			opacity: 0,
			rotateX: -15,
			transition: {
				duration: 0.3,
				// delay: 0.3,
			},
			transitionEnd: {
				display: "none",
			},
		},
	};

	return (
		<motion.div
			className="dropdown profile-dropdown"
			onMouseEnter={toggleMouseMenu}
			onMouseLeave={toggleMouseMenu}
		>
			<div className="img ptb-15">
				{imageUrl ? (
					<img src={imageUrl} alt={firstName} />
				) : (
					<img src="/images/admin/admin-9.jpg" alt={firstName} />
				)}
			</div>
			<motion.ul
				className="dropdown-menu"
				initial="exit"
				animate={isMouse ? "enter" : "exit"}
				variants={subMenuAnimate}
			>
				<li>
					{/*<Link href="/profile/basic-information/">*/}
						<a className="dropdown-item author-dropdown-item">
							<div className="d-flex align-items-center">
								<div className="img">
									{imageUrl ? (
										<img
											src={imageUrl}
											alt={firstName}
										/>
									) : (
										<img
											src="/images/admin/admin-9.jpg"
											alt={firstName}
										/>
									)}
								</div>

								<span className="ps-3">
									<span className="fw-semibold fs-16 mb-1 d-block">
										{firstName}
									</span>
									<span className="d-block fs-13 mt-minus-2">
										{email}
									</span>
								</span>
							</div>
						</a>
					{/*</Link>*/}
				</li>
				<li>
					<hr className="dropdown-divider" />
				</li>

				{isInstructor && (
					<>
						<li>
							<Link href="/instructor/courses">
								<a className="dropdown-item">
									<i className="bx bx-book"></i>
									My Courses
								</a>
							</Link>
						</li>
						<li>
							<Link href="/instructor/course/create">
								<a className="dropdown-item">
									<i className="bx bx-folder-plus"></i> Create
									New Course
								</a>
							</Link>
						</li>
					</>
				)}
				{isAdmin && (
					<li>
						<Link href="/admin">
							<a className="dropdown-item">
								<i className="bx bxs-dashboard"></i> My
								Dashboard
							</a>
						</Link>
					</li>
				)}

				{isStudent && (<li>
					<Link href="/learning/my-courses/">
						<a className="dropdown-item">
							<i className="bx bx-book"></i>
							My learning
						</a>
					</Link>
				</li>
				)}
				{/*<li>*/}
				{/*	<Link href="/learning/my-purchase-history/">*/}
				{/*		<a className="dropdown-item">*/}
				{/*			<i className="bx bx-credit-card-front"></i>*/}
				{/*			My Purchases*/}
				{/*		</a>*/}
				{/*	</Link>*/}
				{/*</li>*/}
				<li>
					<Link href="/changePassword">
						<a className="dropdown-item">
							<i className="bx bxs-heart"></i>
							Change Password
						</a>
					</Link>
				</li>

				{/*<li>*/}
				{/*	<Link href="/profile/basic-information/">*/}
				{/*		<a className="dropdown-item">*/}
				{/*			<i className="bx bxs-user-account"></i> Account*/}
				{/*			settings*/}
				{/*		</a>*/}
				{/*	</Link>*/}
				{/*</li>*/}
				<li>
					<hr className="dropdown-divider" />
				</li>
				<li>
					<button
						type="submit"
						className="dropdown-item"
						onClick={(e) => {
							e.preventDefault();
							handleLogout(user,setUser,);
						}}
					>
						<i className="bx bx-log-out"></i> Log out
					</button>
				</li>
			</motion.ul>
		</motion.div>
	);
};

export default ProfileDropdown;
