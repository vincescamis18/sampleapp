import { useState, useEffect } from "react";

export default function useScrollYAxis() {
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		window.addEventListener("scroll", () => setScrollPosition(window.pageYOffset), { passive: true });
		return () => {
			window.removeEventListener("scroll", () => setScrollPosition(window.pageYOffset));
		};
	}, []);

	return scrollPosition;
}
