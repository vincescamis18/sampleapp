import React, { useState } from "react";
import getWindowDimensions from "../../../utilities/getWindowDimensions";
import getScrollYAxis from "../../../utilities/getScrollYAxis";

const OriginSection04: React.FC = () => {
	const { screenWidth, screenHeight } = getWindowDimensions();
	const scrollYAxis = getScrollYAxis();

	const [slide, setSlide] = useState(true);

	const SlideComponentTelativeToScrollValue = () => {
		return { marginLeft: scrollYAxis - screenHeight * 3 };
	};

	const slideComponentUsingTransition = () => {
		return { marginLeft: slide ? 0 : 500, transition: "1s" };
	};

	return (
		<div className="origin-section01">
			<h1>Sample scroll response</h1>
			<h1>{`screenWidth ${screenWidth}`}</h1>
			<h1>{`screenHeight ${screenHeight}`}</h1>
			<h1>{`scrollYAxis ${scrollYAxis}`}</h1>

			<br />

			<div style={SlideComponentTelativeToScrollValue()}>
				<h1>Slide component relative to scroll value</h1>
			</div>

			<div style={slideComponentUsingTransition()}>
				<h1>Slide component using transition</h1>
				<button onClick={() => setSlide(!slide)}>SLIDE ME</button>
			</div>
		</div>
	);
};

export default OriginSection04;
