import axios from "axios";
import {motion} from "framer-motion";
import Button from "@/utils/Button";
import React from "react";
import Link from "next/link";
const ChangePasswordForm = ()=>{

    // handleSubmit {
    //     e.preventDefault();
    // }

    return (
        <motion.form
            // onSubmit={handleSubmit}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}

        >
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Current Password"
                    name="currentPassword"
                    autoFocus
                    // value={user.username}
                    //onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    name="newPassword"
                    // value={user.username}
                    //onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm New Password"
                    name="confirmPassword"
                    // value={user.username}
                    //onChange={handleChange}
                />
            </div>

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
