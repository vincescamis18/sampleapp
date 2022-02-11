import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/allReducer";
import { fetchUser } from "../redux/actions/userAction";

import NavbarV1 from "../components/headers/NavbarV1";
import editProfileV1 from "../assets/images/buttons/editProfileV1.png";
import EditProfileV1 from "../components/modal/EditProfileModalV1";

const User: React.FC = () => {
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const [triggerEditProfile, setTriggerEditProfile] = useState(false);

	const getAge = () => {
		if (!userState.birthday) return "";

		const today = new Date();
		const birthDate = new Date(userState.birthday);

		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();

		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

		return age;
	};

	return (
		<div style={{ backgroundColor: "FFFFFF", height: "500vh" }}>
			<NavbarV1 />
			<div className="user-details-parent-container">
				<div className="user-details-top-container">
					<div className="user-details-top-left-container">
						<img
							src={editProfileV1}
							alt="edit button"
							className="cursor-point"
							onClick={() => setTriggerEditProfile(!triggerEditProfile)}
						/>
						<div className="name-age-loc-container">
							<h4>regular contributor</h4>
							<h1>{`${userState.given_name} ${userState.surname}`}</h1>
							<h4>{`${getAge()} | ${userState.location}`}</h4>
						</div>
					</div>
					<img src={userState.user_profile} alt="user profile" className="img-container" />
				</div>
				<div className="user-details-btm-container">
					<div className="bio-parent-container">
						<div className="bio-output-container">
							<span>{userState.bio}</span>
						</div>
					</div>
				</div>
			</div>

			<EditProfileV1 modalTigger={triggerEditProfile} />
		</div>
	);
};

export default User;
