import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

interface IProps {
	modalTigger: boolean;
}

const LoadingScreen = (props: IProps) => {
	const [initialLaunch, setInitialLaunch] = useState(true);
	const [showModal, setShowModal] = useState(false);

	// toggle the visibility of modal and prevent the toggle in initial load
	useEffect(() => {
		if (initialLaunch) setInitialLaunch(false);
		else setShowModal(!showModal);
	}, [props.modalTigger]);

	if (!showModal) return <React.Fragment></React.Fragment>;
	return (
		<div className="loading-parent">
			<div className="loading-container">
				<ReactLoading type="bars" color="#FF4E00" width={150} height={150} />
				<h1>Loading</h1>
			</div>
		</div>
	);
};

export default LoadingScreen;
