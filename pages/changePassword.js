import React, {useContext, useEffect, useState} from "react";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/_App/Footer";
import Navbar from "@/components/_App/Navbar";
import { motion } from "framer-motion";
import {fetchUserData, isAuthorized} from "./gobals";
import AppContext from "./AppContext";
import changePasswordForm from "@/components/Authentication/changePasswordForm";
import ChangePasswordForm from "@/components/Authentication/changePasswordForm";

const changePassword = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [register, setRegister] = useState("login");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOn, setIsOn] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user, setUser } = useContext(AppContext);

    const toggleSwitch = () => setIsOn(!isOn);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if(isAuthorized==false && user!=null){
            setUser(null);
        }
    }, []);


    return (
        <>
            <Navbar />
            <PageBanner
                pageTitle="ForgetPassword"
                homePageUrl="/"
                homePageText="Home"
                activePageText="Authentication"
            />
            <div className="register-area ptb-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            {/*<div className="register-img">*/}
                            {/*	<img*/}
                            {/*		src="/images/register-img.png"*/}
                            {/*		alt="Image"*/}
                            {/*	/>*/}
                            {/*</div>*/}
                        </div>
                        <div className="col-lg-7">
                            <div className="register-form" style={{padding: "0px 103px 0px 0px"}}>
                                {register == "register" ? (
                                    <motion.h2
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, x: 0 }}
                                        exit={{ scale: 0 }}
                                    >
                                        Create your account
                                    </motion.h2>
                                ) : (
                                    <motion.h2
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 0.9, x: 0 }}
                                        exit={{ scale: 1 }}
                                    >
                                        Change Password
                                    </motion.h2>
                                )}

                                <ul
                                    className="register-tab nav nav-tabs justify-content-between"
                                    data-ison={isOn}
                                    onClick={toggleSwitch}
                                >
                                    <li
                                        className="nav-item"
                                        role="presentation"
                                    >
                                        <motion.button
                                            className={`nav-link ${
                                                register == "login"
                                                    ? "active"
                                                    : ""
                                            }`}
                                            type="button"
                                            onClick={() => setRegister("login")}
                                            whileHover={{
                                                scale: 1.3,
                                                transition: { duration: 1 },
                                            }}
                                            whileTap={{ scale: 0.8 }}
                                            transition={{
                                                type: "spring",
                                            }}
                                        >
                                            Change Password
                                        </motion.button>
                                    </li>
                                </ul>

                                <div className="tab-content" id="myTabContent">
                                    <ChangePasswordForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default changePassword;
