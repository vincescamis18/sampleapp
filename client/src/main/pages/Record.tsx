import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/allReducer";
import { fetchRecord, createRecord, updateRecord, deleteRecord } from "../redux/actions/recordAction";
import { IRecord, INewRecordInput } from "../redux/actionSchemas/recordSchema";

import UploadImage from "../components/inputs/uploadImage";
import MutipleImageV1 from "../components/inputs/MutipleImageV1";

const Zample: React.FC = () => {
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const recordState = useSelector((state: RootState) => state.record);
	const [newRecord, setNewRecord] = useState<INewRecordInput>({
		images: null,
		title: "",
		date: "",
		owner: "",
		description: "",
		tag: "",
		address: "",
		coordinate_x: 0,
		coordinate_y: 0,
		creator: "",
	});
	const [updatedRecord, setUpdatedRecord] = useState({
		_id: "",
		updItem: {
			title: "",
			date: "",
			owner: "",
			description: "",
			tag: "",
			address: "",
			coordinate_x: 0,
			coordinate_y: 0,
			creator: "",
		},
	});
	const [deletedRecord, setDeletedRecord] = useState({ _id: "" });

	useEffect(() => {
		if (userState._id) dispatch(fetchRecord(userState._id));
	}, [userState]);

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
		<div style={{ backgroundColor: "black", height: "500vh", color: "white" }}>
			<UploadImage />
			<div>
				<h1>FETCH ITEM</h1>
				{recordState.records.map((record: IRecord) => (
					<div key={record._id}>
						{record.images.map(image => (
							<img key={image._id} alt="record" src={image.link} style={{ height: 200 }} />
						))}
						<h2>{`_id: ${record._id}`}</h2>
						<h2>{`title: ${record.title}`}</h2>
						<h2>{`date: ${record.date}`}</h2>
						<h2>{`owner: ${record.owner}`}</h2>
						<h2>{`description: ${record.description}`}</h2>
						<h2>{`tag: ${record.tag}`}</h2>
						<h2>{`address: ${record.address}`}</h2>
						<h2>{`coordinate_x: ${record.coordinate_x}`}</h2>
						<h2>{`coordinate_y: ${record.coordinate_y}`}</h2>
						<h2>{`creator: ${record.creator}`}</h2>
					</div>
				))}
			</div>
			<br />
			<div>
				<h1>CREATE RECORD</h1>
				<MutipleImageV1 setNewRecord={setNewRecord} newRecord={newRecord} />
				<h2>title</h2>
				<input type="text" name="title" placeholder="title" onChange={handleNewRecordInputChange} />
				<h2>date</h2>
				<input type="date" name="date" onChange={handleNewRecordInputChange} />
				<h2>description</h2>
				<input type="text" name="description" placeholder="description" onChange={handleNewRecordInputChange} />
				<h2>owner</h2>
				<input type="text" name="owner" placeholder="owner" onChange={handleNewRecordInputChange} />
				<h2>tag</h2>
				<input type="text" name="tag" placeholder="tag" onChange={handleNewRecordInputChange} />
				<h2>address</h2>
				<input type="text" name="address" placeholder="address" onChange={handleNewRecordInputChange} />
				<h2>coordinate_x</h2>
				<input type="number" name="coordinate_x" placeholder="coordinate_x" onChange={handleNewRecordInputNumberChange} />
				<h2>coordinate_y</h2>
				<input type="number" name="coordinate_y" placeholder="coordinate_y" onChange={handleNewRecordInputNumberChange} />
				<h2>creator</h2>
				<input type="text" name="creator" placeholder="creator" onChange={handleNewRecordInputChange} />
				<br /> <br />
				<input type="button" value="CREATE" onClick={() => dispatch(createRecord(newRecord))} />
			</div>

			<br />
			<div>
				<h1>UPDATE RECORD</h1>
				<h2>_id</h2>
				<input type="text" name="_id" placeholder="_id" onChange={handleUpdateRecordIDInputChange} />
				<h2>title</h2>
				<input type="text" name="title" placeholder="title" onChange={handleUpdateRecordInputChange} />
				<h2>date</h2>
				<input type="date" name="date" onChange={handleUpdateRecordInputChange} />
				<h2>description</h2>
				<input type="text" name="description" placeholder="description" onChange={handleUpdateRecordInputChange} />
				<h2>owner</h2>
				<input type="text" name="owner" placeholder="owner" onChange={handleUpdateRecordInputChange} />
				<h2>tag</h2>
				<input type="text" name="tag" placeholder="tag" onChange={handleUpdateRecordInputChange} />
				<h2>address</h2>
				<input type="text" name="address" placeholder="address" onChange={handleUpdateRecordInputChange} />
				<h2>coordinate_x</h2>
				<input type="number" name="coordinate_x" placeholder="coordinate_x" onChange={handleUpdateRecordInputNumberChange} />
				<h2>coordinate_y</h2>
				<input type="number" name="coordinate_y" placeholder="coordinate_y" onChange={handleUpdateRecordInputNumberChange} />
				<h2>creator</h2>
				<input type="text" name="creator" placeholder="creator" onChange={handleUpdateRecordInputChange} />
				<br /> <br />
				<input type="button" value="UPDATE" onClick={() => dispatch(updateRecord(updatedRecord))} />
			</div>

			<br />

			<div>
				<h1>DELETE RECORD</h1>
				<h2>_id</h2>
				<input type="text" name="_id" placeholder="_id" onChange={handleDeleteRecordIDInputChange} />
				<br /> <br />
				<input type="button" value="DELETE" onClick={() => dispatch(deleteRecord(deletedRecord))} />
			</div>
		</div>
	);
};

export default Zample;
