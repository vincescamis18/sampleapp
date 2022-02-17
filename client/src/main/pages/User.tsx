import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/reducers/allReducer";
import { fetchRecord } from "../redux/actions/recordAction";

import NavbarV1 from "../components/headers/NavbarV1";
import EditProfileV1 from "../components/modal/EditProfileModalV1";
import ViewMemoryV1 from "../components/modal/ViewMemoryV1";

import editProfileV1 from "../assets/images/buttons/editProfileV1.png";
import filterBtnV1 from "../assets/images/buttons/filterBtnV1.png";
import addBtnV1 from "../assets/images/buttons/addBtnV1.png";
import { IRecord } from "../redux/actionSchemas/recordSchema";

const User: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const recordState = useSelector((state: RootState) => state.record);
	const [selectRecord, setSelectRecord] = useState<IRecord>();
	const [triggerEditProfile, setTriggerEditProfile] = useState(false);
	const [triggerViewMemory, setTriggerViewMemory] = useState(false);
	const [userMemories, setUserMemories] = useState<IRecord[]>();

	useEffect(() => {
		dispatch(fetchRecord());
	}, []);

	useEffect(() => {
		// retrieve all the memory of the user
		if (recordState.records.length > 0 && userState._id) {
			let allUserMemories = recordState.records.filter((record: any) => record.creator == userState._id);
			setUserMemories(allUserMemories);
		}
	}, [recordState, userState]);

	// fill the gap of 4 picture per column design to push the picture at the left side
	const emptyImages = () => {
		if (userMemories?.length) {
			const numberOfEmptySlots = userMemories?.length % 4;
			const emptySlots = [];
			for (let a = 0; a < numberOfEmptySlots; a++) emptySlots.push(a);
			return emptySlots.map(() => (
				<img src="https://www.everynation.org.ph/img/logos/icon-check@2x.jpg" alt="image" className="memory-display-container" />
			));
		}
	};

	const DisplayUserAllMemories = () => (
		<div className="user-memory-parent">
			<div className="user-memory-container">
				{userMemories?.map((record: IRecord, index: number) => (
					<React.Fragment key={index}>
						{record.creator === userState._id ? (
							<img
								className="cursor-point memory-display-container"
								src={record.images[0].link}
								alt="image"
								onClick={() => selectMemory(record)}
							/>
						) : (
							<React.Fragment></React.Fragment>
						)}
					</React.Fragment>
				))}
				{emptyImages()}
			</div>
		</div>
	);

	const SideMenu = () => (
		<div className="side-menu-parent">
			<div className="side-menu-container">
				<img src={filterBtnV1} alt="filter" className="cursor-point filter-btn" />
				<img src={addBtnV1} alt="add" className="cursor-point add-btn" onClick={() => navigate("/upload-memory")} />
			</div>
		</div>
	);

	const getAge = () => {
		if (!userState.birthday) return "";

		const today = new Date();
		const birthDate = new Date(userState.birthday);

		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();

		// checks if their birthday is not passed
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

		return age;
	};

	const selectMemory = (record: IRecord) => {
		setTriggerViewMemory(!triggerViewMemory);
		setSelectRecord(record);
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
							{userState.location ? <h4>{`${getAge()} | ${userState.location}`}</h4> : <React.Fragment></React.Fragment>}
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
			<ViewMemoryV1 modalTigger={triggerViewMemory} record={selectRecord} />
			<SideMenu />
			<DisplayUserAllMemories />
		</div>
	);
};

export default User;
