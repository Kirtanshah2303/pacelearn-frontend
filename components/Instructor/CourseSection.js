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


const  INITIAL_VALUE ={
    section_Title: "",
    section_Description: "",

};

//const handleSubmit = async (e) => {
    //e.preventDefault();
    /*try {
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
        /!*const {
            id,
            sectionTitle,
            sectionDescription,
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
                `/instructor/course/upload/${response.data.id}`
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
        /!*setLoading(false);*!/
    }*/
//};

const CourseSection = ({btnText}) =>{
    const [course, setCourse] = useState(INITIAL_VALUE);
return(
   // <form //onSubmit={handleSubmit}>
    <form className="row">
        <div className="col-md-6">
            <div className="form-group">
                <label className="form-label fw-semibold">
                    Section Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Section Title"
                    name="sectionTitle"
                    value={course.sectionTitle}
                    //onChange={handleChange}
                />
            </div>
        </div>

        <div className="col-md-6">
            <div className="form-group">
                <label className="form-label fw-semibold">
                    Section Description
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Section Description"
                    name="sectionDescrition"
                    value={course.sectionDescrition}
                    //onChange={handleChange}
                />
            </div>
        </div>
        <div className="col-12">
            <Button
                //loading={loading}
                // disabled={disabled}
                btnText={btnText || "Save"}
                btnClass="default-btn"
            />
        </div>
    </form>);
    //</form>)

    };


        export default CourseSection;