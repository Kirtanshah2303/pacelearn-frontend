import axios from "axios";
import {motion} from "framer-motion";
import Button from "@/utils/Button";
import React from "react";
import Link from "next/link";
import baseUrl2 from "@/utils/baseUrl2";
import toast from "react-hot-toast";

const INITIAL_USER = {
    email: "",
};

const ForgotPasswordForm = ()=>{

    const [user, setUser] = React.useState(INITIAL_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${baseUrl2}/api/account/reset-password/init?mail=${user.email}`;
            const response = await axios.post(url);
            toast.success("Password Reset link is sent to your email", {
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
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                   value={user.email}
                    onChange={handleChange}
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
