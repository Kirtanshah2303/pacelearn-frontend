import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "@/utils/ActiveLink";
import {motion} from "framer-motion";
import {Categories} from "../../pages/gobals";

const ShowCategories = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleHover = (Categories) => {
        setIsHovered(true);
        setSelectedCategory(Categories);
    };

    const handleLeave = () => {
        setIsHovered(false);
        setSelectedCategory(null);
    };

    return (
        <>
            <motion.li
                className="nav-item"
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.5 },
                }}
                whileTap={{ scale: 0.9 }}
                key={Categories.courseCategoryTitle}
                onMouseEnter={() => handleHover(Categories)}
                onMouseLeave={handleLeave}
            >

                <Link
                    href="#"
                    activeClassName="active"
                >
                    <a
                        className="nav-link"
                    >
                        Categories
                    </a>
                </Link>
                {isHovered  && (<ul className="submenu dropdown-menu">
                {Categories.map((Categories) => (

                    <li key={Categories.courseCategoryTitle}>
                        <a className="dropdown-item" style={{"white-space": "normal"}} href="#">
                            {Categories.courseCategoryTitle}
                        </a>
                        {Categories.subCategories && (
                            <ul className="sub-submenu dropdown-menu" >
                                {Categories.subCategories.map((subSubcategory) => (
                                    <li key={subSubcategory.courseCategoryTitle}>
                                        <a className="dropdown-item" href="#">
                                            {subSubcategory.courseCategoryTitle}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
                    </ul>)}

            </motion.li>
        </>
    );
};

export default ShowCategories;
