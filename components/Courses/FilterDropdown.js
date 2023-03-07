import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {Categories} from "../../pages/gobals";

const FilterDropdown = () => {
	const [short, setShort] = useState("");
	const router = useRouter();

	useEffect(() => {
		const query = router.query;
		router.push({
			pathname: "/courses",
			query: { ...query, short: short },
		});
	}, [short]);

	return (
		<li>
			<select
				className="form-select form-control"
				name="short"
				value={short}
				onChange={(e) => setShort(e.target.value)}
			>
				<option value="">All Categories</option>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				{Categories.map((category) => (
					category.subCategories.map((subCategory)=>(
						// eslint-disable-next-line react/jsx-key
						<option value={subCategory.courseCategoryTitle}>{subCategory.courseCategoryTitle}</option>
					))
				))}

			</select>
		</li>
	);
};

export default FilterDropdown;