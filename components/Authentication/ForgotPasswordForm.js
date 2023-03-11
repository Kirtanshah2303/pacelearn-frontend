import axios from "axios";
import {motion} from "framer-motion";
import Button from "@/utils/Button";
import React from "react";
import Link from "next/link";
const ForgotPasswordForm = ()=>{

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
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="username"
                   // value={user.username}
                    //onChange={handleChange}
                    autoFocus
                />
            </div>

            <Button
              //  loading={loading}
                // disabled={disabled}
                btnText="Reset Password"
                btnClass="default-btn"
            />

            <p style={{textAlign:'center' , marginTop:'30px', fontSize:"20px", fontStyle:"revert-layer"}}>Back to  <Link href={'/auth'} >Login  </Link></p>
         </motion.form>

    );

}
export default ForgotPasswordForm;
