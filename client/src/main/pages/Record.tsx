import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/allReducer";
import { fetchItem, createItem, updateItem, deleteItem } from "../redux/actions/zampleAction";

const Zample: React.FC = () => {
	const dispatch = useDispatch();
	const itemState = useSelector((state: RootState) => state.zample);
	const [newItem, setNewItem] = useState({ name: "", price: 0 });
	const [updatedItem, setUpdatedItem] = useState({ _id: "", updItem: { name: "", price: 0 } });
	const [deletedItem, setDeletedItem] = useState({ _id: "" });

	useEffect(() => {
		dispatch(fetchItem());
	}, []);

	useEffect(() => {
		console.log(updatedItem);
	}, [updatedItem]);

	useEffect(() => console.log("itemState: ", itemState), [itemState]);

	const handleNewItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewItem({ ...newItem, [e.target.name]: e.target.value });
	};

	const handleUpdateItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedItem({
			...updatedItem,
			updItem: {
				...updatedItem.updItem,
				[e.target.name]: e.target.value,
			},
		});
	};

	const handleUpdateItemIDInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
	};

	const handleDeleteItemIDInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDeletedItem({ ...deletedItem, [e.target.name]: e.target.value });
	};

	return (
		<div style={{ backgroundColor: "black", height: "100vh", color: "white" }}>
			<div>
				<h1>FETCH ITEM</h1>
				{itemState.map(item => (
					<h1 key={item._id}>{`${item._id} | ${item.name} | ${item.price}`}</h1>
				))}
			</div>
			<br />

			<div>
				<h1>CREATE ITEM</h1>
				<input type="text" name="name" id="" placeholder="name" onChange={handleNewItemInputChange} />
				<input type="number" name="price" id="" placeholder="price" onChange={handleNewItemInputChange} />
				<input type="button" value="Create" onClick={() => dispatch(createItem(newItem))} />
			</div>
			<br />

			<div>
				<h1>UPDATE ITEM</h1>
				<input type="text" name="name" placeholder="name" onChange={handleUpdateItemInputChange} />
				<input type="number" name="price" placeholder="price" onChange={handleUpdateItemInputChange} />
				<input type="text" name="_id" placeholder="_id" onChange={handleUpdateItemIDInputChange} />
				<input type="button" value="Update" onClick={() => dispatch(updateItem(updatedItem))} />
			</div>
			<br />

			<div>
				<h1>DELETE ITEM</h1>
				<input type="text" name="_id" placeholder="_id" onChange={handleDeleteItemIDInputChange} />
				<input type="button" value="Delete" onClick={() => dispatch(deleteItem(deletedItem))} />
			</div>
		</div>
	);
};

export default Zample;
