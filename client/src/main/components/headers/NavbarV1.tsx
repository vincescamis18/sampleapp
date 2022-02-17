import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/allReducer";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/userAction";
import ExploreV1 from "../../assets/images/icons/exploreV1.png";
import HomeV1 from "../../assets/images/icons/homeV1.png";
import ProfileV1 from "../../assets/images/icons/profileV1.png";
import SearchV1 from "../../assets/images/icons/searchV1.png";
import ProfileV2 from "../../assets/images/icons/profileV2.png";
import ProfileCardV1 from "../../assets/images/icons/profileCardV1.png";
import ExitV1 from "../../assets/images/icons/exitV1.png";

const NavbarV1: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	const Profile = () => {
		if (userState.given_name)
			return (
				<React.Fragment>
					<img src={userState.user_profile} alt="profile" className="profile-picture" />
					<div className="dropdown">
						<div className="dropbtn">{userState.given_name}</div>
						<div className="dropdown-content">
							<div className="option" onClick={() => navigate("/user")}>
								<img src={ProfileV2} alt="profile" />
								<span>Profile</span>
							</div>

							<div className="option">
								<img src={ProfileCardV1} alt="account" />
								<span>Account</span>
							</div>

							<div className="option last-option">
								<img src={ExitV1} alt="exit" />
								<span onClick={handleLogout}>Log out</span>
							</div>
						</div>
					</div>
				</React.Fragment>
			);
		return <img src={ProfileV1} alt="profile" className="unregistered-profile-icon" onClick={() => navigate("/register")} />;
	};

	if (userState.isLoading) return <div className="navbar-container"></div>;
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
