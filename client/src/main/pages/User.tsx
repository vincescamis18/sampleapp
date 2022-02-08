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
		surname: "",
		given_name: "",
		user_profile: "",
		province: "",
		city: "",
		barangay: "",
		email: "",
		contact_number: "",
	});
	const [updatedRecord, setUpdatedRecord] = useState({
		_id: "",
		updItem: {
			surname: "",
			given_name: "",
			user_profile: "",
			province: "",
			city: "",
			barangay: "",
			email: "",
			contact_number: "",
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

						<h2>{`surname: ${user.surname}`}</h2>
						<h2>{`given_name: ${user.given_name}`}</h2>
						<h2>{`province: ${user.province}`}</h2>
						<h2>{`city: ${user.city}`}</h2>
						<h2>{`barangay: ${user.barangay}`}</h2>
						<h2>{`email: ${user.email}`}</h2>
						<h2>{`contact_number: ${user.contact_number}`}</h2>
					</div>
				))}
			</div>
			<br />
			<div>
				<h1>CREATE RECORD</h1>
				<h2>surname</h2>
				<input type="text" name="surname" placeholder="surname" onChange={handleNewRecordInputChange} />
				<h2>given_name</h2>
				<input type="text" name="given_name" placeholder="given_name" onChange={handleNewRecordInputChange} />
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
				<br /> <br />
				<input type="button" value="CREATE" onClick={() => dispatch(createItem(newRecord))} />
			</div>

			<br />
			<div>
				<h1>UPDATE RECORD</h1>
				<h2>_id</h2>
				<input type="text" name="_id" placeholder="_id" onChange={handleUpdateRecordIDInputChange} />
				<h2>surname</h2>
				<input type="text" name="surname" placeholder="surname" onChange={handleUpdateRecordInputChange} />
				<h2>given_name</h2>
				<input type="text" name="given_name" placeholder="given_name" onChange={handleUpdateRecordInputChange} />
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
