import React, { useState } from "react";

import NavbarV1 from "../components/headers/NavbarV1";
import MemoryOfTheDay from "../components/curatorDashboard/MemoryOfTheDay";
import CuratedCollection from "../components/curatorDashboard/CuratedCollection";

const CuratorDashboard = () => {
	const [dashboardSelected, setDashboardSelected] = useState("memory of the day");

	const SideDashboard = () => (
		<React.Fragment>
			<div className="side-menu-container">
				<div className="side-menu-title no-select">
					<span>Curator dashboard</span>
				</div>
				<div className="side-menu-option no-select" onClick={() => setDashboardSelected("memory of the day")}>
					{dashboardSelected == "memory of the day" ? <span className="side-menu-option-selected"></span> : <></>}
					<span>Memory of the Day</span>
				</div>
				<div className="side-menu-option no-select" onClick={() => setDashboardSelected("curated collection")}>
					{dashboardSelected == "curated collection" ? <span className="side-menu-option-selected"></span> : <></>}
					<span>Curated Collection</span>
				</div>
			</div>
			<span className="side-menu-space"></span>
		</React.Fragment>
	);

	const displaySection = () => {
		switch (dashboardSelected) {
			case "memory of the day":
				return <MemoryOfTheDay />;
			case "curated collection":
				return <CuratedCollection />;
		}
	};

	return (
		<React.Fragment>
			<NavbarV1 />
			<div className="dashboard-parent">
				<SideDashboard />
				{displaySection()}
			</div>
		</React.Fragment>
	);
};

export default CuratorDashboard;
