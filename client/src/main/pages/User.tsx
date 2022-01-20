import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/allReducer";
import { fetchItem, createItem, updateItem, deleteItem } from "../redux/actions/userAction";
import { IUser } from "../redux/actionSchemas/userSchema";

import UploadImage from "../components/inputs/uploadImage";

const User: React.FC = () => {
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const [newRecord, setNewRecord] = useState({
		first_name: "",
		last_name: "",
		middle_name: "",
		user_profile: "",
		province: "",
		city: "",
		barangay: "",
		email: "",
		contact_number: "",
		firebase_id: "",
	});
	const [updatedRecord, setUpdatedRecord] = useState({
		_id: "",
		updItem: {
			first_name: "",
			last_name: "",
			middle_name: "",
			user_profile: "",
			province: "",
			city: "",
			barangay: "",
			email: "",
			contact_number: "",
			firebase_id: "",
		},
	});
	const [deletedRecord, setDeletedRecord] = useState({ _id: "" });

	useEffect(() => {
		dispatch(fetchItem());
	}, []);

	useEffect(() => {
		console.log(updatedRecord);
	}, [updatedRecord]);

	const handleNewRecordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
	};
	const handleNewRecordInputNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewRecord({ ...newRecord, [e.target.name]: parseFloat(e.target.value) });
	};

	const handleUpdateRecordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedRecord({
			...updatedRecord,
			updItem: {
				...updatedRecord.updItem,
				[e.target.name]: e.target.value,
			},
		});
	};
	const handleUpdateRecordInputNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedRecord({
			...updatedRecord,
			updItem: {
				...updatedRecord.updItem,
				[e.target.name]: parseFloat(e.target.value),
			},
		});
	};

	const handleUpdateRecordIDInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedRecord({ ...updatedRecord, [e.target.name]: e.target.value });
	};

	const handleDeleteRecordIDInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDeletedRecord({ ...deletedRecord, [e.target.name]: e.target.value });
	};

	return (
		<div style={{ backgroundColor: "black", height: "300vh", color: "white" }}>
			<UploadImage />
			<div>
				<h1>FETCH ITEM</h1>
				{userState.map((user: IUser) => (
					<div key={user._id}>
						<img src={user.user_profile} alt="" style={{ height: 200 }} />
						<h2>{`_id: ${user._id}`}</h2>
						<h2>{`first_name: ${user.first_name}`}</h2>
						<h2>{`last_name: ${user.last_name}`}</h2>
						<h2>{`middle_name: ${user.middle_name}`}</h2>
						<h2>{`province: ${user.province}`}</h2>
						<h2>{`city: ${user.city}`}</h2>
						<h2>{`barangay: ${user.barangay}`}</h2>
						<h2>{`email: ${user.email}`}</h2>
						<h2>{`contact_number: ${user.contact_number}`}</h2>
						<h2>{`firebase_id: ${user.firebase_id}`}</h2>
					</div>
				))}
			</div>
			<br />
			<div>
				<h1>CREATE RECORD</h1>
				<h2>first_name</h2>
				<input type="text" name="first_name" placeholder="first_name" onChange={handleNewRecordInputChange} />
				<h2>last_name</h2>
				<input type="text" name="last_name" placeholder="last_name" onChange={handleNewRecordInputChange} />
				<h2>middle_name</h2>
				<input type="text" name="middle_name" placeholder="middle_name" onChange={handleNewRecordInputChange} />
				<h2>user_profile</h2>
				<input type="text" name="user_profile" placeholder="user_profile" onChange={handleNewRecordInputChange} />
				<h2>province</h2>
				<input type="text" name="province" placeholder="province" onChange={handleNewRecordInputChange} />
				<h2>city</h2>
				<input type="text" name="city" placeholder="city" onChange={handleNewRecordInputChange} />
				<h2>barangay</h2>
				<input type="text" name="barangay" placeholder="barangay" onChange={handleNewRecordInputChange} />
				<h2>email</h2>
				<input type="text" name="email" placeholder="email" onChange={handleNewRecordInputChange} />
				<h2>contact_number</h2>
				<input type="text" name="contact_number" placeholder="contact_number" onChange={handleNewRecordInputChange} />
				<h2>firebase_id</h2>
				<input type="text" name="firebase_id" placeholder="firebase_id" onChange={handleNewRecordInputChange} />
				<br /> <br />
				<input type="button" value="CREATE" onClick={() => dispatch(createItem(newRecord))} />
			</div>

			<br />
			<div>
				<h1>UPDATE RECORD</h1>
				<h2>_id</h2>
				<input type="text" name="_id" placeholder="_id" onChange={handleUpdateRecordIDInputChange} />
				<h2>first_name</h2>
				<input type="text" name="first_name" placeholder="first_name" onChange={handleUpdateRecordInputChange} />
				<h2>last_name</h2>
				<input type="text" name="last_name" placeholder="last_name" onChange={handleUpdateRecordInputChange} />
				<h2>middle_name</h2>
				<input type="text" name="middle_name" placeholder="middle_name" onChange={handleUpdateRecordInputChange} />
				<h2>user_profile</h2>
				<input type="text" name="user_profile" placeholder="user_profile" onChange={handleUpdateRecordInputChange} />
				<h2>province</h2>
				<input type="text" name="province" placeholder="province" onChange={handleUpdateRecordInputChange} />
				<h2>city</h2>
				<input type="text" name="city" placeholder="city" onChange={handleUpdateRecordInputChange} />
				<h2>barangay</h2>
				<input type="text" name="barangay" placeholder="barangay" onChange={handleUpdateRecordInputChange} />
				<h2>email</h2>
				<input type="text" name="email" placeholder="email" onChange={handleUpdateRecordInputChange} />
				<h2>contact_number</h2>
				<input type="text" name="contact_number" placeholder="contact_number" onChange={handleUpdateRecordInputNumberChange} />
				<h2>firebase_id</h2>
				<input type="text" name="firebase_id" placeholder="firebase_id" onChange={handleUpdateRecordInputChange} />
				<br /> <br />
				<input type="button" value="UPDATE" onClick={() => dispatch(updateItem(updatedRecord))} />
			</div>

			<br />

			<div>
				<h1>DELETE RECORD</h1>
				<h2>_id</h2>
				<input type="text" name="_id" placeholder="_id" onChange={handleDeleteRecordIDInputChange} />
				<br /> <br />
				<input type="button" value="DELETE" onClick={() => dispatch(deleteItem(deletedRecord))} />
			</div>
		</div>
	);
};

export default User;
