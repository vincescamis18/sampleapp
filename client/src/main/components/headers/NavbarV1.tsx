import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/allReducer";
import { useNavigate } from "react-router-dom";

import ExploreV1 from "../../assets/images/icons/exploreV1.png";
import HomeV1 from "../../assets/images/icons/homeV1.png";
import ProfileV1 from "../../assets/images/icons/profileV1.png";
import SearchV1 from "../../assets/images/icons/searchV1.png";

const NavbarV1: React.FC = () => {
	const navigate = useNavigate();
	const userState = useSelector((state: RootState) => state.user);

	const Profile = () => {
		if (userState.given_name)
			return (
				<React.Fragment>
					<img src={userState.user_profile} alt="profile" className="profile-picture" onClick={() => navigate("/user")} />
					<div>
						<span className="profile-name">{userState.given_name}</span>
					</div>
				</React.Fragment>
			);
		return <img src={ProfileV1} alt="profile" className="unregistered-profile-icon" onClick={() => navigate("/register")} />;
	};

	return (
		<div className="navbar-container">
			<div className="logo" onClick={() => navigate("/")}>
				Logo
			</div>

			<div className="search-container">
				<img src={SearchV1} alt="search" className="search-icon" />
				<input className="search-input" placeholder="Search" type="text" name="" id="" />
			</div>

			<div style={{ display: "flex", alignItems: "center" }}>
				<img src={HomeV1} alt="home" className="home-icon" />
				<img src={ExploreV1} alt="explore" className="compass-icon" />
				<Profile />
			</div>
		</div>
	);
};

export default NavbarV1;
