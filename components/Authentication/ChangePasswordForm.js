import axios from "axios";
import {motion} from "framer-motion";
import Button from "@/utils/Button";
import React from "react";
import Link from "next/link";
import {router} from "next/router";
import baseUrl2 from "@/utils/baseUrl2";
import toast from "react-hot-toast";

const INITIAL_USER = {
    newPassword: "",
};

const ChangePasswordForm = ()=>{

    const [user, setUser] = React.useState(INITIAL_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${baseUrl2}/api/account/reset-password/finish`;
            const {
                newPassword
            } = user;
            const payloadData = {
                newPassword: user.newPassword,
                key:router.query['key']
            };
            const response = await axios.post(url,payloadData);
            toast.success("Your password has been reset successfully", {
                style: {
                    border: "1px solid #4BB543",
                    padding: "16px",
                    color: "#4BB543",
                },
                iconTheme: {
                    primary: "#4BB543",
                    secondary: "#FFFAEE",
                },
            })
            router.push("/")
        }catch (e) {
            toast.error("Something went wrong", {
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
        }
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}

        >
            {/*<div className="form-group">*/}
            {/*    <input*/}
            {/*        type="password"*/}
            {/*        className="form-control"*/}
            {/*        placeholder="Current Password"*/}
            {/*        name="currentPassword"*/}
            {/*        autoFocus*/}
            {/*        // value={user.username}*/}
            {/*        //onChange={handleChange}*/}
            {/*    />*/}
            {/*</div>*/}
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    name="newPassword"
                    value={user.newPassword}
                    onChange={handleChange}
                />
            </div>

            {/*<div className="form-group">*/}
            {/*    <input*/}
            {/*        type="password"*/}
            {/*        className="form-control"*/}
            {/*        placeholder="Confirm New Password"*/}
            {/*        name="confirmPassword"*/}
            {/*        // value={user.username}*/}
            {/*        //onChange={handleChange}*/}
            {/*    />*/}
            {/*</div>*/}

            <Button
                //  loading={loading}
                // disabled={disabled}
                btnText="Change Password"
                btnClass="default-btn"
            />


        </motion.form>

    );

}
export default ChangePasswordForm;
