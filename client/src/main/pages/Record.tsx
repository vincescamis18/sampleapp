import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/allReducer";
import { fetchItem, createItem, updateItem, deleteItem } from "../redux/actions/recordAction";
import { IRecord } from "../redux/actionSchemas/recordSchema";

const Zample: React.FC = () => {
	const dispatch = useDispatch();
	const recordState = useSelector((state: RootState) => state.record);
	const [newRecord, setNewRecord] = useState({
		image: "",
		title: "",
		date: "",
		owner: "",
		description: "",
		tag: "",
		address: "",
		coordinate: "",
	});
	const [updatedRecord, setUpdatedRecord] = useState({
		_id: "",
		updItem: { image: "", title: "", date: "", owner: "", description: "", tag: "", address: "", coordinate: "" },
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

	const handleUpdateRecordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedRecord({
			...updatedRecord,
			updItem: {
				...updatedRecord.updItem,
				[e.target.name]: e.target.value,
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
			<div>
				<h1>FETCH ITEM</h1>
				{recordState.map((record: IRecord) => (
					<div key={record._id}>
						<img src={record.image} alt="" style={{ height: 200 }} />
						<h2>{`_id: ${record._id}`}</h2>
						<h2>{`title: ${record.title}`}</h2>
						<h2>{`date: ${record.date}`}</h2>
						<h2>{`owner: ${record.owner}`}</h2>
						<h2>{`description: ${record.description}`}</h2>
						<h2>{`tag: ${record.tag}`}</h2>
						<h2>{`address: ${record.address}`}</h2>
						<h2>{`coordinate: ${record.coordinate}`}</h2>
					</div>
				))}
			</div>
			<br />
			<div>
				<h1>CREATE RECORD</h1>
				<h2>image</h2>
				<input type="text" name="image" placeholder="image" onChange={handleNewRecordInputChange} />
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
				<h2>coordinate</h2>
				<input type="text" name="coordinate" placeholder="coordinate" onChange={handleNewRecordInputChange} />
				<br /> <br />
				<input type="button" value="CREATE" onClick={() => dispatch(createItem(newRecord))} />
			</div>

			<br />
			<div>
				<h1>UPDATE RECORD</h1>
				<h2>_id</h2>
				<input type="text" name="_id" placeholder="_id" onChange={handleUpdateRecordIDInputChange} />
				<h2>image</h2>
				<input type="text" name="image" placeholder="image" onChange={handleUpdateRecordInputChange} />
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
				<h2>coordinate</h2>
				<input type="text" name="coordinate" placeholder="coordinate" onChange={handleUpdateRecordInputChange} />
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

export default Zample;
