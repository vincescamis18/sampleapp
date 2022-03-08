import React from "react";

import NavbarV1 from "../components/headers/NavbarV1";

const CuratorDashboard = () => {
	const SideDashboard = () => (
		<React.Fragment>
			<div className="side-menu-container">
				<div className="side-menu-title no-select">
					<span>Curator dashboard</span>
				</div>
				<div className="side-menu-option no-select">
					<span>Memory of the Day</span>
				</div>
				<div className="side-menu-option no-select">
					<span>Curated Collection</span>
				</div>
			</div>
			<span className="side-menu-space"></span>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<NavbarV1 />
			<div className="dashboard-parent">
				<SideDashboard />
			</div>
		</React.Fragment>
	);
};

export default CuratorDashboard;
