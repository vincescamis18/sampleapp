import React from "react";
import getWindowDimensions from "../../../utilities/getWindowDimensions";
import getScrollYAxis from "../../../utilities/getScrollYAxis";

const OriginSection01: React.FC = () => {
	const { screenWidth, screenHeight } = getWindowDimensions();
	const scrollYAxis = getScrollYAxis();

	return (
		<div className="origin-section01">
			<h1>Section01</h1>
			<h1>{`screenWidth ${screenWidth}`}</h1>
			<h1>{`screenHeight ${screenHeight}`}</h1>
			<h1>{`scrollYAxis ${scrollYAxis}`}</h1>
		</div>
	);
};

export default OriginSection01;
