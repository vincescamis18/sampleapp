import React from "react";

import NavbarV1 from "../components/headers/NavbarV1";
import DisplayAllMemoryV1 from "../components/displayMemories/DisplayAllMemoryV1";
import DisplayMemoryOfTheDayV1 from "../components/displayMemories/DisplayMemoryOfTheDayV1";

const Explore: React.FC = () => {
	return (
		<div>
			<NavbarV1 />
			<DisplayMemoryOfTheDayV1 />
			<DisplayAllMemoryV1 />
		</div>
	);
};

export default Explore;
