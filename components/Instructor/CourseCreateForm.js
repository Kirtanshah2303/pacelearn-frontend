import React, { useState, useEffect } from "react";
import controls from "@/utils/RTEControl";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@mantine/rte"), {
	ssr: false,
	loading: () => null,
});
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl2 from "@/utils/baseUrl2";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Button from "@/utils/Button";

const INITIAL_VALUE = {
	id : "",
	courseTitle: "",
	courseDescription: "",
	courseObjectives: "",
	courseSubTitle : "",
	// courseLength: "",
	courseLogo: "",
	courseLevel : {},
	courseParentCategory : {},
	courseCategory : {},
	courseType : {}
	// requirements: "",
	// what_you_will_learn: "",
	// who_is_this_course_for: "",
	// catId: "",
};

const CourseCreateForm = ({ btnText, is_class , parentCategories , level }) => {
	const { edmy_users_token } = parseCookies();
	let bearer = "bearer " + edmy_users_token
	const [course, setCourse] = useState(INITIAL_VALUE);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	// const [parentCategories, setParentCategories] = useState([]);
	const [categories, setCategories] = useState([]);
	// const [level, setLevel] = useState([]);
	const [imagePreview, setImagePreview] = React.useState("");
	const router = useRouter();

	useEffect(() => {
		const isCourse = Object.values(course).every((el) => Boolean(el));
		isCourse ? setDisabled(false) : setDisabled(true);
		console.log("HAHA this is for demo")
	}, [course]);

	useEffect(() => {
		const fetchData = async () => {
			const payload = {
				headers: { Authorization: "bearer " + edmy_users_token },
			};
			// const response = await axios.get(
			// 	`${baseUrl2}/api/course-category/parent-categories`,
			// 	payload
			// );

			// fetch(`${baseUrl2}/api/course-category/parent-categories`,{
			// 	headers: { Authorization: edmy_users_token },
			// }).then(response => response.json().then(result => {
			// 	console.log(result.parentCategories)
			// 	setParentCategories(result.parentCategories)
			// }))
			//
			// fetch(`${baseUrl2}/api/course-levels`,{
			// 	headers: { Authorization: edmy_users_token },
			// }).then(response => response.json().then(result => {
			// 	console.log(result.levels)
			// 	setParentCategories(result.parentCategories)
			// }))

			console.log("Categories are --> "+parentCategories)

			// fetch(`${baseUrl2}/api/course-levels`,{
			// 	headers: { Authorization: edmy_users_token },
			// }).then(response => response.json().then(setLevel(response.data.levels)))

			// const response2 = await axios.get(
			// 	`${baseUrl2}/api/course-levels`,
			// 	payload
			// );



			// setParentCategories(response.data.parentcategories);
			// setLevel(response2.data.levels);
		};

		fetchData();
	}, []);

	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === "image") {
			const image = files[0].size / 1024 / 1024;
			if (image > 2) {
				toast.error(
					"The photo size greater than 2 MB. Make sure less than 2 MB.",
					{
						style: {
							border: "1px solid #ff0033",
							padding: "16px",
							color: "#ff0033",
						},
						iconTheme: {
							primary: "#ff0033",
							secondary: "#FFFAEE",
						},
					}
				);
				e.target.value = null;
				return;
			}
			setCourse((prevState) => ({
				...prevState,
				image: files[0],
			}));
			setImagePreview(window.URL.createObjectURL(files[0]));
		}
		else if (name === "courseCategory"){
			console.log("In course category  " + JSON.parse(value))
			setCourse((prevState) => ({ ...prevState, [name]: JSON.parse(value) }));
		}
		else if (name === "courseLevel"){
			console.log("In course Level  " + JSON.parse(value))
			setCourse((prevState) => ({ ...prevState, [name]: JSON.parse(value) }));
		}
		else {
			console.log("Change Log Name is --> "+name+ " and Value is ----> "+value)
			setCourse((prevState) => ({ ...prevState, [name]: value }));
		}
	};

	const handleCategoryChange = (e) => {
		// const { courseCategoryTitle } = e.target.data;
		// e.currentTarget
		const { name, value, files } = e.target;
		console.log("change ---> "+value)

		setCourse((prevState) => ({ ...prevState, [name]: value }));
		//
		const payload = {
			headers: { Authorization: edmy_users_token },
		};
		// const response3 = axios.get(
		// 	`${baseUrl2}/api/course-category/sub-categories/${value}`,
		// 	payload
		// );
		fetch(`${baseUrl2}/api/course-category/sub-categories/${value}`,{
			headers: { Authorization: edmy_users_token },
		}).then(response => response.json().then(result => {
			console.log(result.subcategory)
			setCategories(result.subcategory);
		}))





	};

	// const handleImageUpload = async () => {
	// 	const data = new FormData();
	// 	data.append("file", course.courseLogo);
	// 	data.append("upload_preset", process.env.UPLOAD_PRESETS);
	// 	data.append("cloud_name", process.env.CLOUD_NAME);
	// 	let response;
	// 	if (course.image) {
	// 		response = await axios.post(process.env.CLOUDINARY_URL, data);
	// 	}
	// 	const imageUrl = response.data.url;
	//
	// 	return imageUrl;
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			// let photo;
			// if (course.courseLogo) {
			// 	photo = await handleImageUpload();
			//
			// 	photo = photo.replace(/^http:\/\//i, "https://");
			// }

			// const {
			// 	title,
			// 	short_desc,
			// 	overview,
			// 	latest_price,
			// 	before_price,
			// 	lessons,
			// 	duration,
			// 	access_time,
			// 	requirements,
			// 	what_you_will_learn,
			// 	who_is_this_course_for,
			// 	catId,
			// } = course;


			// Custom Edit
			const {
				id,
				courseTitle,
				courseDescription,
				courseObjectives,
				courseLogo,
				courseSubTitle,
				courseLength,
				courseLevel,
				courseCategory,
			} = course;
			const payloadData = {
				id,
				courseTitle,
				courseDescription,
				courseObjectives,
				courseLogo,
				courseSubTitle,
				courseLevel,
				courseCategory
			};

			const payloadHeader = {
				headers: { Authorization: "Bearer " + edmy_users_token },
			};

			const url = `${baseUrl2}/api/courses`;
			const response = await axios.post(url, payloadData, payloadHeader);
			setLoading(false);

			toast.success(response.data.message, {
				style: {
					border: "1px solid #4BB543",
					padding: "16px",
					color: "#4BB543",
				},
				iconTheme: {
					primary: "#4BB543",
					secondary: "#FFFAEE",
				},
			});

			if (is_class) {
				router.push(`/instructor/courses`);
			} else {
				console.log("Response data is --> "+response.data.id)
				router.push(
					`/instructor/course/section/${response.data.id}`
				);
			}
		} catch (err) {
			// console.log(err);
			let {
				response: {
					data: { message },
				},
			} = err;
			toast.error(message, {
				style: {
					border: "1px solid #ff0033",
					padding: "16px",
					color: "#ff0033",
				},
				iconTheme: {
					primary: "#ff0033",
					secondary: "#FFFAEE",
				},
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Course Title
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Course Title"
							name="courseTitle"
							value={course.courseTitle}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Course Sub Title
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Course Sub Title"
							name="courseSubTitle"
							value={course.courseSubTitle}
							onChange={handleChange}
						/>
					</div>
				</div>

				{/*<div className="col-md-6">*/}
				{/*	<div className="form-group">*/}
				{/*		<label className="form-label fw-semibold">*/}
				{/*			Lessons*/}
				{/*		</label>*/}
				{/*		<input*/}
				{/*			type="number"*/}
				{/*			className="form-control"*/}
				{/*			placeholder="5"*/}
				{/*			name="lessons"*/}
				{/*			value={course.lessons}*/}
				{/*			onChange={handleChange}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}

				{/*<div className="col-md-6">*/}
				{/*	<div className="form-group">*/}
				{/*		<label className="form-label fw-semibold">*/}
				{/*			Latest Price*/}
				{/*		</label>*/}
				{/*		<input*/}
				{/*			type="number"*/}
				{/*			className="form-control"*/}
				{/*			placeholder="29.99"*/}
				{/*			aria-describedby="latest_price_help"*/}
				{/*			name="latest_price"*/}
				{/*			value={course.latest_price}*/}
				{/*			onChange={handleChange}*/}
				{/*		/>*/}
				{/*		<div id="latest_price_help" className="form-text">*/}
				{/*			The latest price will show as the course price.*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}

				{/*<div className="col-md-6">*/}
				{/*	<div className="form-group">*/}
				{/*		<label className="form-label fw-semibold">*/}
				{/*			Regular Price*/}
				{/*		</label>*/}
				{/*		<input*/}
				{/*			type="number"*/}
				{/*			className="form-control"*/}
				{/*			placeholder="49.99"*/}
				{/*			aria-describedby="before_price_help"*/}
				{/*			name="before_price"*/}
				{/*			value={course.before_price}*/}
				{/*			onChange={handleChange}*/}
				{/*		/>*/}
				{/*		<div id="before_price_help" className="form-text">*/}
				{/*			Regular price will show like this <del>49.99</del>.*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}

				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Duration
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="4 Hours or 2 Weeks"
							name="courseLength"
							value={course.courseLength}
							onChange={handleChange}
						/>
					</div>
				</div>

				{/*<div className="col-md-6">*/}
				{/*	<div className="form-group">*/}
				{/*		<label className="form-label fw-semibold">*/}
				{/*			Access Time*/}
				{/*		</label>*/}
				{/*		<select*/}
				{/*			className="form-select"*/}
				{/*			name="access_time"*/}
				{/*			value={course.access_time}*/}
				{/*			onChange={handleChange}*/}
				{/*		>*/}
				{/*			<option value="">Select</option>*/}
				{/*			<option value="Lifetime">Lifetime</option>*/}
				{/*			<option value="Three Months">Three Months</option>*/}
				{/*			<option value="Six Months">Six Months</option>*/}
				{/*			<option value="1 Year">1 Year</option>*/}
				{/*		</select>*/}
				{/*	</div>*/}
				{/*</div>*/}

				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Course Image
						</label>
						<input
							type="file"
							className="form-control file-control"
							name="courseLogo"
							onChange={handleChange}
							required={true}
						/>
						<div className="form-text">
							Upload image size 750x500!
						</div>

						<div className="mt-2">
							<img
								src={
									imagePreview
										? imagePreview
										: "/images/courses/course-1.jpg"
								}
								alt="image"
								className="img-thumbnail w-100px me-2"
							/>
						</div>
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Course Level
						</label>
						<select
							className="form-select"
							name="courseLevel"
							value={course.courseLevel}
							onChange={handleChange}
						>
							<option value="">Select</option>
							{level.length > 0 &&
							level.map((cat) => (
								<option key={cat.id} value={JSON.stringify(cat)}>
									{cat.title}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Course Category
						</label>
						<select
							className="form-select"
							name="coursePatentCategory"
							value={course.courseCategoryTitle}
							onChange={handleCategoryChange}
						>
							<option value="">Select</option>
							{parentCategories.length > 0 &&
								parentCategories.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.courseCategoryTitle}
									</option>
								))}
						</select>
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Course Sub Category
						</label>
						<select
							className="form-select"
							name="courseCategory"
							value={course.courseCategoryTitle}
							onChange={handleChange}
						>
							<option value="">Select</option>
							{categories.length > 0 &&
							categories.map((cat) => (
								<option key={cat.id} value={JSON.stringify(cat)}>
									{cat.courseCategoryTitle}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="col-md-12">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Description
						</label>
						<textarea
							className="form-control"
							name="courseDescription"
							value={course.courseDescription}
							rows="4"
							onChange={handleChange}
						/>
						<div className="form-text">
							The description will highlight all available areas.
						</div>
					</div>
				</div>

				<div className="col-md-12">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Objectives
						</label>
						<textarea
							className="form-control"
							name="courseObjectives"
							value={course.courseObjectives}
							rows="4"
							onChange={handleChange}
						/>
						<div className="form-text">
							The Objectives will highlight all available areas.
						</div>
					</div>
				</div>

				{/*<div className="col-md-6">*/}
				{/*	<div className="form-group">*/}
				{/*		<label className="form-label fw-semibold">*/}
				{/*			courseObjectives*/}
				{/*		</label>*/}
				{/*		<RichTextEditor*/}
				{/*			controls={controls}*/}
				{/*			value={course.overview}*/}
				{/*			onChange={(e) =>*/}
				{/*				setCourse((prevState) => ({*/}
				{/*					...prevState,*/}
				{/*					overview: e,*/}
				{/*				}))*/}
				{/*			}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}
				{/*<div className="col-md-6">*/}
				{/*	<div className="form-group">*/}
				{/*		<label className="form-label fw-semibold">*/}
				{/*			Requirements*/}
				{/*		</label>*/}
				{/*		<RichTextEditor*/}
				{/*			controls={controls}*/}
				{/*			value={course.requirements}*/}
				{/*			onChange={(e) =>*/}
				{/*				setCourse((prevState) => ({*/}
				{/*					...prevState,*/}
				{/*					requirements: e,*/}
				{/*				}))*/}
				{/*			}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}
				{/*<div className="col-md-6">*/}
				{/*	<div className="form-group">*/}
				{/*		<label className="form-label fw-semibold">*/}
				{/*			What You Will Learn*/}
				{/*		</label>*/}
				{/*		<RichTextEditor*/}
				{/*			controls={controls}*/}
				{/*			value={course.what_you_will_learn}*/}
				{/*			onChange={(e) =>*/}
				{/*				setCourse((prevState) => ({*/}
				{/*					...prevState,*/}
				{/*					what_you_will_learn: e,*/}
				{/*				}))*/}
				{/*			}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}
				{/*<div className="col-md-6">*/}
				{/*	<div className="form-group">*/}
				{/*		<label className="form-label fw-semibold">*/}
				{/*			Who Is This Course For?*/}
				{/*		</label>*/}
				{/*		<RichTextEditor*/}
				{/*			controls={controls}*/}
				{/*			value={course.who_is_this_course_for}*/}
				{/*			onChange={(e) =>*/}
				{/*				setCourse((prevState) => ({*/}
				{/*					...prevState,*/}
				{/*					who_is_this_course_for: e,*/}
				{/*				}))*/}
				{/*			}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}

				<div className="col-12">
					<Button
						loading={loading}
						// disabled={disabled}
						btnText={btnText || "Create Course"}
						btnClass="default-btn"
					/>
				</div>
			</div>
		</form>
	);
};

export default CourseCreateForm;
