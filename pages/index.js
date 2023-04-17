import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import CoursesList from "@/components/Courses/CoursesList";
import Banner from "@/components/Index/Banner";
import Navbar from "@/components/_App/Navbar";
import Categories from "@/components/Index/Categories";
import Transform from "@/components/Index/Transform";
import Features from "@/components/Index/Features";
import Testimonials from "@/components/Index/Testimonials";
import Partners from "@/components/Index/Partners";
import Teaching from "@/components/Index/Teaching";
import Business from "@/components/Index/Business";
import Footer from "@/components/_App/Footer";
import baseUrl2 from "@/utils/baseUrl2";
import baseUrl from "@/utils/baseUrl";
import { motion } from "framer-motion";
import cookie from "js-cookie";
import AppContext from './AppContext';
import {fetchUserData} from "./gobals";

const index = ({ courses, categories }) => {
	const variants = {
		visible: {
			opacity: 1,
			scale: 1,
			transition: { delay: 0.2, type: "spring", duration: 1 },
		},
		hidden: { opacity: 0, scale: 0 },
	};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { user, setUser } = useContext(AppContext);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		fetchUserData(user,setUser);
	}, []);

	return (
		<>
			<Navbar user={user} />
			<Banner />
			<div className="courses-area pt-100 pb-70">
				<div className="container">
					<motion.div
						className="section-title"
						initial="hidden"
						whileInView="visible"
						variants={variants}
					>
						<span className="top-title">Newly Added Courses</span>
						{/*<h2>Expand Your Career Opportunity With Our Courses</h2>*/}
						<h2>Our Latest Courses</h2>
					</motion.div>
					<CoursesList courses={courses} user={user} />
				</div>
			</div>

			{/*<div className="feature-dcourses-area bg-color-f6fafb pt-100 pb-70">*/}
			{/*	<div className="container">*/}
			{/*		<div className="title-btn d-flex justify-content-between align-items-center">*/}
			{/*			<motion.div*/}
			{/*				className="section-title left-title"*/}
			{/*				initial="hidden"*/}
			{/*				whileInView="visible"*/}
			{/*				variants={variants}*/}
			{/*			>*/}
			{/*				<span className="top-title">Featured Courses</span>*/}
			{/*				<h2>Find Yours From The Featured</h2>*/}
			{/*			</motion.div>*/}
			{/*			<Link href="/courses">*/}
			{/*				<a className="default-btn">View All</a>*/}
			{/*			</Link>*/}
			{/*		</div>*/}
			{/*		<CoursesList courses={courses} user={user} />*/}
			{/*	</div>*/}

			{/*	<img*/}
			{/*		src="/images/courses-shape.png"*/}
			{/*		className="courses-shape"*/}
			{/*		alt="Image"*/}
			{/*	/>*/}
			{/*</div>*/}

			{/*<div className="feature-dcourses-area bg-color-f6fafb pb-70">*/}
			{/*	<div className="container">*/}
			{/*		<div className="title-btn d-flex justify-content-between align-items-center wow animate__animated animate__fadeInUp delay-0-2s">*/}
			{/*			<motion.div*/}
			{/*				className="section-title left-title"*/}
			{/*				initial="hidden"*/}
			{/*				whileInView="visible"*/}
			{/*				variants={variants}*/}
			{/*			>*/}
			{/*				<span className="top-title">*/}
			{/*					Most Viewed Courses*/}
			{/*				</span>*/}
			{/*				<h2>Students Are Also Viewing</h2>*/}
			{/*			</motion.div>*/}
			{/*			<Link href="/courses">*/}
			{/*				<a className="default-btn">View All</a>*/}
			{/*			</Link>*/}
			{/*		</div>*/}
			{/*		<CoursesList courses={courses} user={user} />*/}
			{/*	</div>*/}
			{/*</div>*/}

			{/*<Categories categories={categories} />*/}
			{/*			<Transform />
			<Features />
			<Testimonials />
			<Partners />
			<Teaching />
			<Business />*/}
			<Footer />
		</>
	);
};

// This gets called on every request
export async function getServerSideProps() {
	// Fetch data from external API
	// const res = await fetch(`${baseUrl}/api/home-courses`);
	// const res = await fetch(`${baseUrl2}/api/open-courses`);
	// const res2 = await fetch(`${baseUrl2}/api/open-course-categories`);
	// const { courses, categories } = await res.json();
	// const {courses} = await res.json();
	const {courses} = {
		"courses": [
			{
				"id": 66,
				"courseTitle": "Python Programming",
				"courseDescription": "Python Programming and Applications",
				"courseObjectives": " To use python for different domain of Web Development, general purpose programming, Backend development, Scientific Experimentation, artificial Intelligence etc.",
				"courseSubTitle": "IT374: Python Programming",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_5eoe6pzan",
				"courseCreatedOn": "2021-09-20",
				"courseUpdatedOn": "2021-09-20",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": null,
				"minStudents": 64,
				"maxStudents": 0,
				"courseLevel": {
					"id": 2,
					"title": "Intermediate",
					"description": "Intermediate"
				},
				"courseCategory": {
					"id": 7,
					"courseCategoryTitle": "Programming",
					"logo": "Unbranded violet visualize",
					"isParent": false,
					"parentId": 1,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 57,
					"login": "hemantnyadav",
					"firstName": "Hemant",
					"lastName": "Yadav",
					"email": "hemantyadav.it@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 63,
				"courseTitle": "Java Programming",
				"courseDescription": "This course builds on the skills in Java Fundamentals or Java Foundations to help advance Java programming skills. Students will design object-oriented applications with Java and will create Java programs using hands-on, engaging activities",
				"courseObjectives": "Understand the fundamentals of object-oriented programming in Java, Have the ability to write a computer program to solve specified problems.",
				"courseSubTitle": "Inheritance, Interfaces & Packages",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_6f9gcyuo0",
				"courseCreatedOn": "2019-10-10",
				"courseUpdatedOn": "2019-10-10",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": "2019-10-10",
				"minStudents": 79,
				"maxStudents": 100,
				"courseLevel": {
					"id": 2,
					"title": "Intermediate",
					"description": "Intermediate"
				},
				"courseCategory": {
					"id": 7,
					"courseCategoryTitle": "Programming",
					"logo": "Unbranded violet visualize",
					"isParent": false,
					"parentId": 1,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 18,
					"login": "nishatshaikh",
					"firstName": "Nishat",
					"lastName": "Shaikh",
					"email": "nishatshaikh.it@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 62,
				"courseTitle": "Database Management System",
				"courseDescription": "This course is about databse technology",
				"courseObjectives": "The students will learn the back-end technology",
				"courseSubTitle": "Database",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_4pt220gz5",
				"courseCreatedOn": "2017-02-16",
				"courseUpdatedOn": "2017-02-16",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": "2017-02-16",
				"minStudents": 84,
				"maxStudents": 100,
				"courseLevel": {
					"id": 1,
					"title": "Easy",
					"description": "Easy"
				},
				"courseCategory": {
					"id": 13,
					"courseCategoryTitle": "Data Structures",
					"logo": "None",
					"isParent": false,
					"parentId": 1,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 42,
					"login": "niravbhatt",
					"firstName": "Nirav",
					"lastName": "Bhatt",
					"email": "niravbhatt.it@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 61,
				"courseTitle": "Developing Effective Conversation Skills",
				"courseDescription": "This Course aims to develop basic communication Skills in the students. ",
				"courseObjectives": "Students will understand basic concepts of values and ethics, context of  social and personal spectrum. ",
				"courseSubTitle": "Developing Effective Conversation Skills",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_t3pkuelxi",
				"courseCreatedOn": "2020-08-18",
				"courseUpdatedOn": "2020-08-18",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": "2020-08-18",
				"minStudents": 65,
				"maxStudents": 100,
				"courseLevel": {
					"id": 1,
					"title": "Easy",
					"description": "Easy"
				},
				"courseCategory": {
					"id": 25,
					"courseCategoryTitle": "Communication Skills\n",
					"logo": "None",
					"isParent": false,
					"parentId": 24,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 41,
					"login": "robert82",
					"firstName": "Robert",
					"lastName": "Parmar",
					"email": "robertparmar.cs@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 60,
				"courseTitle": "Java Programming",
				"courseDescription": "This course includes study of API which is offered by JavaSE 11.0- Core Java, all the features related to it . Students will learn basic programming skills.",
				"courseObjectives": "Students will learn basic programming skills, features related to the latest stable version of Java programming. Students will do projects using the different APIS available.",
				"courseSubTitle": "Programming in Java",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_lrclib7vj",
				"courseCreatedOn": "2021-07-25",
				"courseUpdatedOn": "2021-07-25",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": null,
				"minStudents": 94,
				"maxStudents": 100,
				"courseLevel": {
					"id": 2,
					"title": "Intermediate",
					"description": "Intermediate"
				},
				"courseCategory": {
					"id": 7,
					"courseCategoryTitle": "Programming",
					"logo": "Unbranded violet visualize",
					"isParent": false,
					"parentId": 1,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 40,
					"login": "minalmaniar.ce@charusat.ac.in",
					"firstName": "Minal",
					"lastName": "Shah",
					"email": "minalmaniar.ce@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 59,
				"courseTitle": "Responsible Citizen - Mohandas Within You",
				"courseDescription": "This Course aims to instill and strengthen  in students basic values and ethical practices. ",
				"courseObjectives": "Students will understand basic concepts of values and ethics, context of  social and personal spectrum. ",
				"courseSubTitle": "Responsible Citizen - Mohandas Within You",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_usitw6yrl",
				"courseCreatedOn": "2020-08-21",
				"courseUpdatedOn": "2020-08-21",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": "2020-08-21",
				"minStudents": 54,
				"maxStudents": 100,
				"courseLevel": {
					"id": 1,
					"title": "Easy",
					"description": "Easy"
				},
				"courseCategory": {
					"id": 28,
					"courseCategoryTitle": "Values and Ethics\n",
					"logo": "None",
					"isParent": false,
					"parentId": 24,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 41,
					"login": "robert82",
					"firstName": "Robert",
					"lastName": "Parmar",
					"email": "robertparmar.cs@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 57,
				"courseTitle": "How to Understand and Manage Your Emotions?",
				"courseDescription": "The course helps learners to manage their emotions and learn to process a range of feelings, while also learning self-advocacy skills that will help them in college, work, and life.",
				"courseObjectives": "The core objective of the course is to discuss about the importance of the emotional intelligence and motivate to develop the EI skills to cope up with the challenges at personal, professional, and social level.",
				"courseSubTitle": "How to Understand and Manage Your Emotions?",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_uxqsfs4pu",
				"courseCreatedOn": "2020-08-14",
				"courseUpdatedOn": "2020-08-14",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": "2020-08-14",
				"minStudents": 59,
				"maxStudents": 100,
				"courseLevel": {
					"id": 1,
					"title": "Easy",
					"description": "Easy"
				},
				"courseCategory": {
					"id": 27,
					"courseCategoryTitle": "Self Management\n",
					"logo": "None",
					"isParent": false,
					"parentId": 24,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 16,
					"login": "kaushiktrivedi85",
					"firstName": "Kaushik",
					"lastName": "Trivedi",
					"email": "kaushiktrivedi.cs@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": []
			},
			{
				"id": 56,
				"courseTitle": "How to Connect with Audience During Speech?",
				"courseDescription": "The course offers various strategies to connect with the audience and excel during the presentations and public speeches.",
				"courseObjectives": "The core objective of the course is to enable learners use various strategies to connect with the audience during the presentations and public speaking.",
				"courseSubTitle": "How to Connect with Audience During Speech?",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_p9x5nmzbn",
				"courseCreatedOn": "2021-07-24",
				"courseUpdatedOn": "2021-07-24",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": null,
				"minStudents": 78,
				"maxStudents": 100,
				"courseLevel": {
					"id": 1,
					"title": "Easy",
					"description": "Easy"
				},
				"courseCategory": {
					"id": 25,
					"courseCategoryTitle": "Communication Skills\n",
					"logo": "None",
					"isParent": false,
					"parentId": 24,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 16,
					"login": "kaushiktrivedi85",
					"firstName": "Kaushik",
					"lastName": "Trivedi",
					"email": "kaushiktrivedi.cs@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 55,
				"courseTitle": "Reading and Writing as Study Skills",
				"courseDescription": "The course discusses the types of effective reading and provides tips to cultivate good reading habits. Further, the learners have been made aware about the various writing forms required for the communication.",
				"courseObjectives": "The core objective of the course is to assist and guide the learners to be able to read a text and identify specific and global information and speak clearly and effectively.",
				"courseSubTitle": "Reading and Writing as Study Skills",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_1y0ph4o8y",
				"courseCreatedOn": "2020-08-08",
				"courseUpdatedOn": "2020-08-08",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": "2020-08-08",
				"minStudents": 61,
				"maxStudents": 100,
				"courseLevel": {
					"id": 1,
					"title": "Easy",
					"description": "Easy"
				},
				"courseCategory": {
					"id": 25,
					"courseCategoryTitle": "Communication Skills\n",
					"logo": "None",
					"isParent": false,
					"parentId": 24,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 16,
					"login": "kaushiktrivedi85",
					"firstName": "Kaushik",
					"lastName": "Trivedi",
					"email": "kaushiktrivedi.cs@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 54,
				"courseTitle": "Creating a Secure Website for a Free",
				"courseDescription": "This course teach you to use the facility available to create free domain and TLS certificate for short lived website. ",
				"courseObjectives": "Learn secure hosting",
				"courseSubTitle": "Subtitle",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_ftkm09js1",
				"courseCreatedOn": "2021-07-24",
				"courseUpdatedOn": "2021-07-24",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": null,
				"minStudents": 58,
				"maxStudents": 100,
				"courseLevel": null,
				"courseCategory": {
					"id": 14,
					"courseCategoryTitle": "Information Security & Cryptography",
					"logo": "None",
					"isParent": false,
					"parentId": 1,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 3,
					"login": "parthshah.ce@charusat.ac.in",
					"firstName": "Parth",
					"lastName": "Shah",
					"email": "parthshah.ce@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 53,
				"courseTitle": "Effective Use of Body Language",
				"courseDescription": "Body Language is considered as unspoken communication. It is also considered as communication by implication. It is an integral part of us and helps in communicating effectively.",
				"courseObjectives": "The core objective of the course is to nurture the body language clues among the learners for the effective communication.",
				"courseSubTitle": "Effective Use of Body Language",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_qqz37om8j",
				"courseCreatedOn": "2020-08-20",
				"courseUpdatedOn": "2020-08-20",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": "2020-08-20",
				"minStudents": 60,
				"maxStudents": 100,
				"courseLevel": {
					"id": 1,
					"title": "Easy",
					"description": "Easy"
				},
				"courseCategory": {
					"id": 25,
					"courseCategoryTitle": "Communication Skills\n",
					"logo": "None",
					"isParent": false,
					"parentId": 24,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 16,
					"login": "kaushiktrivedi85",
					"firstName": "Kaushik",
					"lastName": "Trivedi",
					"email": "kaushiktrivedi.cs@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": []
			},
			{
				"id": 52,
				"courseTitle": "Time Management as a Key to Academic Success",
				"courseDescription": "The course provides effective tips to the learners to manage their time effectively and keep balance in academic assignments and activities.",
				"courseObjectives": "The core objective of the course to provide effective tips to young learners to enable them to balance their schedule at the university.",
				"courseSubTitle": "Time Management as a Key to Academic Success",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_cdgkf5q3l",
				"courseCreatedOn": "2020-08-13",
				"courseUpdatedOn": "2020-08-13",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": "2020-08-13",
				"minStudents": 78,
				"maxStudents": 100,
				"courseLevel": {
					"id": 1,
					"title": "Easy",
					"description": "Easy"
				},
				"courseCategory": {
					"id": 27,
					"courseCategoryTitle": "Self Management\n",
					"logo": "None",
					"isParent": false,
					"parentId": 24,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 16,
					"login": "kaushiktrivedi85",
					"firstName": "Kaushik",
					"lastName": "Trivedi",
					"email": "kaushiktrivedi.cs@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 51,
				"courseTitle": "Mechanisms and Machines",
				"courseDescription": "It is a fundamental course for better understanding of various machines and mechanisms",
				"courseObjectives": "1. STUDENTS WILL BE ABLE TO UNDERSTAND BASICS OF VELOCITY AND ACCELERATION ANALYSIS. 2. FUNDAMENTAL KNOWLEDGE ABOUT GEAR AND GEAR SYSTEM. ",
				"courseSubTitle": "ME 253",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_hd7ateyuw",
				"courseCreatedOn": "2020-06-24",
				"courseUpdatedOn": "2020-06-24",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": "2020-06-24",
				"minStudents": 93,
				"maxStudents": 100,
				"courseLevel": {
					"id": 2,
					"title": "Intermediate",
					"description": "Intermediate"
				},
				"courseCategory": {
					"id": 19,
					"courseCategoryTitle": "Mechanism and Machines\n",
					"logo": "None",
					"isParent": false,
					"parentId": 3,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 10,
					"login": "zankhansonara",
					"firstName": "Zankhan",
					"lastName": "Sonara",
					"email": "zankhansonara.me@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": []
			},
			{
				"id": 49,
				"courseTitle": "Intelligent Networks",
				"courseDescription": "This course is to understand the concept of modern switching used in Integrated Service Digital Network. ",
				"courseObjectives": "To understand, design and implement Routing Protocol",
				"courseSubTitle": "IN",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_revqrbplw",
				"courseCreatedOn": "2021-07-24",
				"courseUpdatedOn": "2021-07-24",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": null,
				"minStudents": 79,
				"maxStudents": 100,
				"courseLevel": null,
				"courseCategory": {
					"id": 11,
					"courseCategoryTitle": "Communication & Networking",
					"logo": "None",
					"isParent": false,
					"parentId": 1,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 34,
					"login": "chintanbhatt.ce@charusat.ac.in",
					"firstName": "Chintan",
					"lastName": "Bhatt",
					"email": "chintanbhatt.ce@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 44,
				"courseTitle": "Artificial Intelligence",
				"courseDescription": "Artificial Intelligence subject comprises of many components like soft computing, prolog, natural language processing and executive system.",
				"courseObjectives": "Students will learn about Prolog, how artificial system will work, pros and cons of each system.",
				"courseSubTitle": "Controlling execution - The cut predicate",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_ip6y7j4x6",
				"courseCreatedOn": "2016-09-15",
				"courseUpdatedOn": "2016-09-15",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": "2016-09-15",
				"minStudents": 83,
				"maxStudents": 100,
				"courseLevel": {
					"id": 3,
					"title": "Hard",
					"description": "Hard"
				},
				"courseCategory": {
					"id": 8,
					"courseCategoryTitle": "Artificial Intelligence",
					"logo": "bypassing",
					"isParent": false,
					"parentId": 1,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 37,
					"login": "khushboo",
					"firstName": "Khushboo",
					"lastName": "Patel",
					"email": "khushboopatel.ce@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": [
					{
						"id": 2,
						"login": "user",
						"firstName": "User",
						"lastName": "User",
						"email": "user@localhost",
						"activated": true,
						"langKey": "en",
						"imageUrl": "",
						"resetDate": null
					}
				]
			},
			{
				"id": 43,
				"courseTitle": "Listening and Speaking as Study Skills",
				"courseDescription": "The course presents the listening and speaking as study schools to excel at the university.",
				"courseObjectives": "The core objective of the course is to assist and guide the beginner learners to listen and speak effectively and excel in their academia.",
				"courseSubTitle": "Listening and Speaking as Study Skills",
				"coursePreviewURL": null,
				"courseLength": null,
				"courseLogo": "https://charuvidya-charusat.s3.ap-south-1.amazonaws.com/_7n03tzhdu",
				"courseCreatedOn": "2020-08-07",
				"courseUpdatedOn": "2020-08-07",
				"courseRootDir": null,
				"amount": 0,
				"isDraft": false,
				"isApproved": true,
				"isPublished": null,
				"courseApprovalDate": "2020-08-07",
				"minStudents": 71,
				"maxStudents": 100,
				"courseLevel": {
					"id": 1,
					"title": "Easy",
					"description": "Easy"
				},
				"courseCategory": {
					"id": 25,
					"courseCategoryTitle": "Communication Skills\n",
					"logo": "None",
					"isParent": false,
					"parentId": 24,
					"description": null
				},
				"courseType": null,
				"user": {
					"id": 16,
					"login": "kaushiktrivedi85",
					"firstName": "Kaushik",
					"lastName": "Trivedi",
					"email": "kaushiktrivedi.cs@charusat.ac.in",
					"activated": true,
					"langKey": "en",
					"imageUrl": null,
					"resetDate": null
				},
				"reviewer": null,
				"enrolledUsersLists": []
			}
		]
	}
	// const {categories} = await res2.json();
	const {categories} =  {
		"categories": [
			{
				"id": 1,
				"courseCategoryTitle": "Computer Engineering/Information Technology",
				"logo": "Buckinghamshire",
				"isParent": true,
				"parentId": 1,
				"description": null
			},
			{
				"id": 2,
				"courseCategoryTitle": "Civil Engineering",
				"logo": "streamline lime override",
				"isParent": true,
				"parentId": 2,
				"description": null
			},
			{
				"id": 3,
				"courseCategoryTitle": "Mechanical Engineering",
				"logo": "Manager",
				"isParent": true,
				"parentId": 3,
				"description": null
			},
			{
				"id": 5,
				"courseCategoryTitle": "Electronics",
				"logo": "Wooden Mauritius auxiliary",
				"isParent": true,
				"parentId": 5,
				"description": null
			},
			{
				"id": 6,
				"courseCategoryTitle": "Machine Learning",
				"logo": "overriding Home",
				"isParent": false,
				"parentId": 1,
				"description": null
			},
			{
				"id": 7,
				"courseCategoryTitle": "Programming",
				"logo": "Unbranded violet visualize",
				"isParent": false,
				"parentId": 1,
				"description": null
			},
			{
				"id": 8,
				"courseCategoryTitle": "Artificial Intelligence",
				"logo": "bypassing",
				"isParent": false,
				"parentId": 1,
				"description": null
			},
			{
				"id": 9,
				"courseCategoryTitle": "Fluid Mechanics",
				"logo": "deposit",
				"isParent": false,
				"parentId": 3,
				"description": null
			},
			{
				"id": 10,
				"courseCategoryTitle": "Engine Mechanics",
				"logo": "alarm Open-architected",
				"isParent": false,
				"parentId": 3,
				"description": null
			},
			{
				"id": 11,
				"courseCategoryTitle": "Communication & Networking",
				"logo": "None",
				"isParent": false,
				"parentId": 1,
				"description": null
			},
			{
				"id": 12,
				"courseCategoryTitle": "High Performance Computing",
				"logo": "None",
				"isParent": false,
				"parentId": 1,
				"description": null
			},
			{
				"id": 13,
				"courseCategoryTitle": "Data Structures",
				"logo": "None",
				"isParent": false,
				"parentId": 1,
				"description": null
			},
			{
				"id": 14,
				"courseCategoryTitle": "Information Security & Cryptography",
				"logo": "None",
				"isParent": false,
				"parentId": 1,
				"description": null
			},
			{
				"id": 15,
				"courseCategoryTitle": "Software Engineering",
				"logo": "None",
				"isParent": false,
				"parentId": 1,
				"description": null
			},
			{
				"id": 16,
				"courseCategoryTitle": "Compiler Design",
				"logo": "None",
				"isParent": false,
				"parentId": 1,
				"description": null
			},
			{
				"id": 17,
				"courseCategoryTitle": "Design and Analysis\n",
				"logo": "None",
				"isParent": false,
				"parentId": 3,
				"description": null
			},
			{
				"id": 18,
				"courseCategoryTitle": "Manufacturing\n",
				"logo": "None",
				"isParent": false,
				"parentId": 3,
				"description": null
			},
			{
				"id": 19,
				"courseCategoryTitle": "Mechanism and Machines\n",
				"logo": "None",
				"isParent": false,
				"parentId": 3,
				"description": null
			},
			{
				"id": 20,
				"courseCategoryTitle": "Thermal Engineering\n",
				"logo": "None",
				"isParent": false,
				"parentId": 3,
				"description": null
			},
			{
				"id": 21,
				"courseCategoryTitle": "Automobile Engineering\n",
				"logo": "None",
				"isParent": false,
				"parentId": 3,
				"description": null
			}
		]
	};
	// console.log("HAHA Courses is --> "+courses);
	// console.log("HAHA Categories is -->	 "+categories);
	// Pass data to the page via props
	return { props: { courses,categories} };
	// return { props: { courses, categories } };
}

export default index;