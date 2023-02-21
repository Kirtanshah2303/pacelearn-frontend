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
    id : "",
    sectionTitle: "",
    sectionDescription: "",

};



const CourseSection = ({courseId}) => {
    const { edmy_users_token } = parseCookies();
    const [section, setSection] = useState(INITIAL_VALUE);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log("Change Log Name is --> "+name+ " and Value is ----> "+value)
        setSection((prevState) => ({ ...prevState, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Custom Edit
            const {
                id,
                sectionTitle,
                sectionDescription
            } = section;
            const payloadData = {
                id,
                sectionTitle,
                sectionDescription
            };

            const payloadHeader = {
                headers: { Authorization: "Bearer " + edmy_users_token },
            };

            const url = `${baseUrl2}/api/course/${courseId}/course-sections`;
            // const response = (await axios.post(url, payloadData, payloadHeader));
            fetch(url,{
                method : "POST",
                headers : {
                    Authorization: "Bearer " + edmy_users_token,
                    "Content-Type" : 'application/json'
                },
                body : JSON.stringify(payloadData)
            }).then(response => {
                response.json().then(response => {
                    console.log("Get response is --> "+response.title)
                    setLoading(false);

                    toast.success("Submitted successfully", {
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

                    // if (is_class) {
                    //     router.push(`/instructor/courses`);
                    // } else {
                        console.log("Response data is --> "+response.id)
                        router.push(
                            `/instructor/course/upload/${response.id}`
                        );
                    // }
                })
            }).catch(error => {
                console.log("Error is --> "+error)
            })


            // console.log("Get response is --> "+response)
            // setLoading(false);
            //
            // toast.success("Submitted successfully", {
            //     style: {
            //         border: "1px solid #4BB543",
            //         padding: "16px",
            //         color: "#4BB543",
            //     },
            //     iconTheme: {
            //         primary: "#4BB543",
            //         secondary: "#FFFAEE",
            //     },
            // });
            //
            // if (is_class) {
            //     router.push(`/instructor/courses`);
            // } else {
            //     console.log("Response data is --> "+response.data.id)
            //     router.push(
            //         `/instructor/course/upload/${response.data.id}`
            //     );
            // }
        } catch (err) {
            // console.log(err);
            // let {
            //     response: {
            //         data: { message },
            //     },
            // } = err;
            toast.error(err, {
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


return(
    <form className="row" onSubmit={handleSubmit}>
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
                btnText={"Save"}
                btnClass="default-btn"
            />
        </div>
    </form>);

    };


export default CourseSection;