import React, { useEffect, useState } from "react";

import NavbarV1 from "../components/headers/NavbarV1";
import DisplayAllMemoryV1 from "../components/displayMemories/DisplayAllMemoryV1";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExploreV2: React.FC = () => {
	const navigate = useNavigate();
	const [allCuratedCollection, setAllCuratedCollection] = useState<any>();
	const [allUsers, setallUsers] = useState([]);
	const [selectedTab, setSelectedTab] = useState("Memories");

	useEffect(() => {
		axios
			.get(`/api/compiled-memory/details-record/`)
			.then(res => setAllCuratedCollection(res.data))
			.catch(err => console.log("err", err));
	}, []);

	useEffect(() => {
		axios
			.get(`/api/userz/rank/`)
			.then(res => {
				setallUsers(res.data.users);
				console.log(res.data.users);
			})
			.catch(err => console.log("err", err));
	}, []);

	const TabSelection = () => (
		<div className="center-tab-parent">
			<div className="tab-parent-container no-select">
				<div className="tab-option" onClick={() => setSelectedTab("Memories")}>
					{selectedTab == "Memories" ? <span className="tab-option-selected"></span> : <span></span>}
					<span>Memories</span>
				</div>
				<div className="tab-option" onClick={() => setSelectedTab("Curated Collection")}>
					{selectedTab == "Curated Collection" ? <span className="tab-option-selected"></span> : <span></span>}
					<span>Curated Collections</span>
				</div>
				<div className="tab-option" onClick={() => setSelectedTab("Contributors")}>
					{selectedTab == "Contributors" ? <span className="tab-option-selected"></span> : <span></span>}
					<span>Contributors</span>
				</div>
			</div>
		</div>
	);
	const DisplayAllCuratedCollection = () => (
		<div style={{ marginTop: "40px", marginBottom: "100px" }}>
			<div className="container-center">
				<div className="container-width-explore">
					<div className="curated-collection-parent">
						<div className="display-all-curation-parent">
							<div>
								{allCuratedCollection?.map((collection: any, index: number) => (
									<div
										className="cursor-point colection-container colection-container-idle"
										onClick={() => navigate(`/collection/${collection._id}`)}
										key={index}
									>
										<div className="collection-img-container">
											<img className="collection-img-container" src={collection.images[0].link} alt="record image" />
										</div>

										<div className="collection-info-container">
											<h1>{collection.title}</h1>
											<p>{collection.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const DisplayAllUsers = () => (
		<div className="center-all-users-parent">
			{allUsers?.map((user: any) => (
				<div className="user-item no-select" key={user._id} onClick={() => navigate(`/profile/${user._id}`)}>
					<div className="user-details-container ">
						<img src={user.user_profile} alt="profile" className="user-image-container" />
						<h1>{user.given_name + " " + user.surname}</h1>
					</div>
					<h1>{user.post}</h1>
				</div>
			))}
		</div>
	);

	return (
		<div className="explore">
			<NavbarV1 />
			<TabSelection />
			{selectedTab == "Memories" ? <DisplayAllMemoryV1 userId={""} /> : <span></span>}
			{selectedTab == "Curated Collection" ? <DisplayAllCuratedCollection /> : <span></span>}
			{selectedTab == "Contributors" ? <DisplayAllUsers /> : <span></span>}
		</div>
	);
};

export default ExploreV2;
