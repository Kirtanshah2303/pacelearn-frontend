import React, { useState, useEffect } from "react";
import controls from "@/utils/RTEControl";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@mantine/rte"), {
    ssr: false,
    loading: () => null,
});
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Button from "@/utils/Button";
import baseUrl2 from "@/utils/baseUrl2";

const INITIAL_VALUE = {
    id : "",
    sectionTitle: "",
    sectionDescription: ""
};

const EditCourseSection = ({ courseData }) => {
    const { charuvidhya_users_token } = parseCookies();
    const [section, setSection] = useState(INITIAL_VALUE);
    //const [parentCategories, setParentCategories] = useState([]);
   // const [level, setLevel] = useState([]);
    //const [disabled, setDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
   // const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const {
            id,
            sectionTitle,
            sectionDescription
        }  = courseData
        setSection({
            id,
            sectionTitle,
            sectionDescription
        });
    }, [courseData]);

    // useEffect(() => {
    //     const isCourse = Object.values(course).every((el) => Boolean(el));
    //     isCourse ? setDisabled(false) : setDisabled(true);
    // }, [course]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const payload = {
    //             headers: { Authorization: "Bearer "+ charuvidhya_users_token },
    //         };
    //         // const response = await axios.get(
    //         // 	`${baseUrl}/api/categories`,
    //         // 	payload
    //         // );
    //
    //         fetch(`${baseUrl2}/api/course-category/parent-categories`,{
    //             headers: { Authorization: "Bearer "+ charuvidhya_users_token },
    //         }).then(response => response.json().then(result => {
    //             console.log(result.parentCategories)
    //             setParentCategories(result.parentCategories)
    //         }))
    //
    //         fetch(`${baseUrl2}/api/course-levels`,{
    //             headers: { Authorization: "Bearer "+ charuvidhya_users_token },
    //         }).then(response => response.json().then(result => {
    //             console.log(result.levels)
    //             setLevel(result.levels)
    //         }))
    //
    //         // setCategories(response.data.categories);
    //     };
    //     fetchData();
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;


         if (name === "sectionTitle"){
            console.log("In course category  " + JSON.parse(value))
            setSection((prevState) => ({ ...prevState, [name]: JSON.parse(value) }));
        }
        else if (name === "sectionDescription"){
            console.log("In course Level  " + JSON.parse(value))
            setSection((prevState) => ({ ...prevState, [name]: JSON.parse(value) }));
        }
        else {
            console.log("Change Log Name is --> "+name+ " and Value is ----> "+value)
            setSection((prevState) => ({ ...prevState, [name]: value }));
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // setLoading(true);
            // let photo;
            // if (course.image) {
            // 	photo = await handleImageUpload();
            //
            // 	photo = photo.replace(/^http:\/\//i, "https://");
            // }

            const {
                id,
                sectionTitle,
                sectionDescription
            } = courseData;
            const payloadData = {
                id,
                sectionTitle,
                sectionDescription
            };

            const payloadHeader = {
                headers: { Authorization: "Bearer " + charuvidhya_users_token },
            };

            const url = `${baseUrl2}/api/courses/${courseData.id}`;
            const response = await axios.put(url, payloadData, payloadHeader);
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

            router.push(`/instructor/courses`);
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
                            Section Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Section Title"
                            name="sectionTitle"
                            value={section.sectionTitle}
                            onChange={handleChange}
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
                            name="sectionDescription"
                            value={section.sectionDescription}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                <div className="col-12">
                    <Button
                        loading={loading}
                        // disabled={disabled}
                        btnText="Update Section"
                        btnClass="default-btn"
                    />
                </div>
            </div>
        </form>
    );
};

export default EditCourseSection;
