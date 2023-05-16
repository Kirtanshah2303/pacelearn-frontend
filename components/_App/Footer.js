import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (

			<div className="copy-right-area bg-color-f6fafb">
				<div className="container">
					<div className="row">

							<div className="single-footer-widget">
								<p>
									© Copyright CHARUSAT | All rights reserved
								</p>
								<a href="index.html" className="logo">
									<img
										src="/images/charusat-logo.png"
										className="main-logo"
										alt="logo"
									/>
									<img
										src="/images/white-logo.png"
										className="white-logo"
										alt="logo"
									/>
								</a>

							</div>


						<div className="col-lg-3 col-sm-6">
							<div className="single-footer-widget pl-40">
								{/*<h3>Quick Link</h3>

								<ul className="import-link">
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/">

											<a>Courses</a>
										</Link>
									</motion.li>
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/about-us">
											<a>About Us</a>
										</Link>
									</motion.li>
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/terms-conditions">
											<a>Terms & Conditions</a>
										</Link>
									</motion.li>
								</ul>*/}
							</div>
						</div>

						<div className="col-lg-3 col-sm-6">
							<div className="single-footer-widget pl-40">
								{/*<h3>Help Center</h3>

								<ul className="import-link">
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/">
										<Link href="/contact-us">
											<a>Support</a>
										</Link>
									</motion.li>
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/faq">
										<Link href="/">
											<a>Get Help</a>
										</Link>
									</motion.li>
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/privacy-policy">
											<a>Privacy Policy</a>
										</Link>
									</motion.li>
								</ul>*/}
							</div>
						</div>

						{/*<div className="col-lg-3 col-sm-6">
							<div className="single-footer-widget">
								<h3>Contact Info</h3>

								<ul className="info">
									<li>
										<span>Call Us:</span>{" "}
										<a href="tel:02697-265011">
										  02697-265011
										</a>
									</li>
									<li>
										<span>Address:</span> CHARUSAT university,
										changa, nadiad.

									</li>
									<li>
										<span>Mail Us:</span>{" "}
										<a href="mailto: info@charusat.ac.in">
										info@charusat.ac.in
										</a>
									</li>
								</ul>
							</div>
						</div>*/}
					</div>
				</div>







			{/*<div className="copy-right-area bg-color-f6fafb">*/}
			{/*	<p style={{textAlign: "center"}}>*/}
			{/*		<h>© Copyright CHARUSAT | All rights reserved</h>*/}

			{/*		<img*/}
			{/*			src="/images/charusat-logo.png"*/}
			{/*			className="shape shape-2"*/}
			{/*			alt="footer"*/}
			{/*		/>*/}
			{/*	</p>*/}
			{/*</div>*/}
			</div>

	);
};

export default Footer;
