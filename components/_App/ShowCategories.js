import React, { useRef, useState } from 'react';
import { ControlledMenu,SubMenu, MenuItem, useHover, useMenuState } from '@szhsin/react-menu';
import {Categories} from "../../pages/gobals";
import Link from "@/utils/ActiveLink";
import '@szhsin/react-menu/dist/index.css';

const ShowCategories = () => {
    const ref = useRef(null);
    const [menuState, toogle] = useMenuState({ transition: true });
    const { anchorProps, hoverProps } = useHover(menuState.state, toogle);

    return (
        <>
            <div ref={ref} {...anchorProps}>
                <Link
                    href="/"
                    activeClassName="active"
                >
                    <a
                        className="nav-link"
                    >
                        Categories
                    </a>
                </Link>
            </div>

            <ControlledMenu
                {...hoverProps}
                {...menuState}
                anchorRef={ref}
                onClose={() => toogle(false)}
            >

                {
                    Categories.map((category)=>(
                        category.subCategories.length > 0?
                            // eslint-disable-next-line react/jsx-key
                            <SubMenu label={category.courseCategoryTitle}>
                                {category.subCategories.map((subCategory)=>(
                                    // eslint-disable-next-line react/jsx-key
                                    <MenuItem  href={"/category/"+subCategory.id+"/"}>{subCategory.courseCategoryTitle}</MenuItem>
                                ))}
                            </SubMenu>:
                            <MenuItem>{category.courseCategoryTitle}</MenuItem>
                    ))
                }

            </ControlledMenu>
        </>
    );
};
export default ShowCategories;