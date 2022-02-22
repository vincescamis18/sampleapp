import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { IUser } from "../redux/actionSchemas/userSchema";
import { IRecord } from "../redux/actionSchemas/recordSchema";

import NavbarV1 from "../components/headers/NavbarV1";
import ViewMemoryV1 from "../components/modal/ViewMemoryV1";

const User: React.FC = () => {
	const { id } = useParams();

	const [recordState, setRecordState] = useState<{ records: IRecord[] }>({
		records: [],
	});
	const [userState, setUserState] = useState<IUser>({
		_id: "",
		surname: "",
		given_name: "",
		user_profile: "",
		email: "",
		location: "",
		bio: "",
		birthday: "",
	});

	const [selectRecord, setSelectRecord] = useState<IRecord>();
	const [triggerViewMemory, setTriggerViewMemory] = useState(false);

	useEffect(() => {
		if (id) {
			// retrive selected user record
			axios
				.get(`/api/records/user/${id}`)
				.then((res: any) => {
					console.log({ records: res.data });
					setRecordState({ records: res.data });
				})
				.catch(err => console.log("err", err));

			// retrive selected user details
			axios
				.get(`/api/userz/details/${id}`)
				.then((res: any) => setUserState(res.data))
				.catch(err => console.log(err));
		}
	}, []);

	// fill the gap of 4 picture per column design to push the picture at the left side
	const emptyImages = () => {
		if (recordState.records.length) {
			const numberOfEmptySlots = recordState.records.length % 4;
			const emptySlots = [];
			for (let a = 0; a < numberOfEmptySlots; a++) emptySlots.push(a);
			return emptySlots.map((item: any, index: number) => (
				<img
					src="https://www.everynation.org.ph/img/logos/icon-check@2x.jpg"
					alt="image"
					key={index}
					className="memory-display-container"
				/>
			));
		}
	};

	const DisplayUserAllMemories = () => (
		<div className="user-memory-parent">
			<div className="user-memory-container">
				{recordState.records.map((record: IRecord, index: number) => (
					<img
						className="cursor-point memory-display-container"
						src={record.images[0].link}
						key={index}
						alt="empty image"
						onClick={() => selectMemory(record)}
					/>
				))}
				{emptyImages()}
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

	// if (!userState._id) return <React.Fragment></React.Fragment>;
	return (
		<div style={{ backgroundColor: "FFFFFF", height: "500vh" }}>
			<NavbarV1 />
			<div className="user-details-parent-container">
				<div className="user-details-top-container">
					<div className="user-details-top-left-container">
						<div></div>
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

			<ViewMemoryV1 modalTigger={triggerViewMemory} record={selectRecord} />
			<DisplayUserAllMemories />
		</div>
	);
};

export default User;
