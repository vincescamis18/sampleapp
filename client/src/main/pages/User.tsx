import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/allReducer";
import { fetchUser, updateUser } from "../redux/actions/userAction";

import UploadImage from "../components/inputs/uploadImage";

const User: React.FC = () => {
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const [updatedUser, setUpdatedUser] = useState({
		surname: "",
		given_name: "",
		user_profile: "",
		email: userState.email,
		location: "",
		bio: "",
		birthday: "",
	});

	useEffect(() => {
		dispatch(fetchUser());
	}, []);

	const handleUpdateRecordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedUser({
			...updatedUser,
			[e.target.name]: e.target.value,
		});
	};

	const handleUpdateRecordInputNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedUser({
			...updatedUser,
			[e.target.name]: parseFloat(e.target.value),
		});
	};

	return (
		<div style={{ backgroundColor: "black", height: "300vh", color: "white" }}>
			<UploadImage />
			<div>
				<h1>FETCH ITEM</h1>

				<div>
					<img src={userState.user_profile} alt="" style={{ height: 200 }} />
					<h2>{`_id: ${userState._id}`}</h2>
					<h2>{`surname: ${userState.surname}`}</h2>
					<h2>{`given_name: ${userState.given_name}`}</h2>
					<h2>{`email: ${userState.email}`}</h2>
					<h2>{`location: ${userState.location}`}</h2>
					<h2>{`bio: ${userState.bio}`}</h2>
					<h2>{`birthday: ${userState.birthday}`}</h2>
				</div>
			</div>
			<br />
			<div>
				<h1>UPDATE RECORD</h1>
				<h2>surname</h2>
				<input type="text" name="surname" placeholder="surname" onChange={handleUpdateRecordInputChange} />
				<h2>given_name</h2>
				<input type="text" name="given_name" placeholder="given_name" onChange={handleUpdateRecordInputChange} />
				<h2>user_profile</h2>
				<input type="text" name="user_profile" placeholder="user_profile" onChange={handleUpdateRecordInputChange} />
				<h2>location</h2>
				<input type="text" name="location" placeholder="location" onChange={handleUpdateRecordInputChange} />
				<h2>bio</h2>
				<input type="text" name="bio" placeholder="bio" onChange={handleUpdateRecordInputChange} />
				<h2>birthday</h2>
				<input type="date" name="birthday" placeholder="birthday" onChange={handleUpdateRecordInputChange} />
				<br /> <br />
				<input type="button" value="UPDATE" onClick={() => dispatch(updateUser(updatedUser))} />
			</div>

			<br />
		</div>
	);
};

export default User;
