import { useState, useEffect } from "react";

// Retriving the current screen dimension from window
function getWindowCurrentDimensions() {
	const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
	return {
		screenWidth,
		screenHeight,
	};
}

export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowCurrentDimensions());

	// Get the window dimension everytime the window is resize
	useEffect(() => {
		window.addEventListener("resize", () => setWindowDimensions(getWindowCurrentDimensions()));
		return () => window.removeEventListener("resize", () => setWindowDimensions(getWindowCurrentDimensions()));
	}, []);

	return windowDimensions;
}
