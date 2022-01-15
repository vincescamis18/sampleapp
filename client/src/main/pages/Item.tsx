import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/allReducer";
import {
	itemChangeString,
	itemChangeNumber,
	itemChangeBoolean,
	itemCreateElement,
	updateElement,
	deleteElement,
} from "../redux/actions/itemAction";

const Origin: React.FC = () => {
	const itemState = useSelector((state: RootState) => state.item);
	const dispatch = useDispatch();

	const [string101, setstring101] = useState(itemState.string101);
	const [number101, setnumber101] = useState(itemState.number101);
	const [boolean101, setboolean101] = useState(itemState.boolean101);
	const [createItem101, setCreateItem101] = useState("element05");
	const [updateItem, setUpdateItem] = useState("element03");
	const [updatedItem, setUpdatedItem] = useState("element04");
	const [deleteItem, setDeleteItem] = useState("element05");

	const handleStringChange = (e: React.ChangeEvent<HTMLInputElement>) => setstring101(e.target.value);
	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setnumber101(parseFloat(e.target.value));
	const handleBooleanChange = () => {
		setboolean101(!boolean101);
		dispatch(itemChangeBoolean(!boolean101));
	};

	const handleCreateItemChange = (e: React.ChangeEvent<HTMLInputElement>) => setCreateItem101(e.target.value);
	const handleUpdateItemChange = (e: React.ChangeEvent<HTMLInputElement>) => setUpdateItem(e.target.value);
	const handleUpdatedItemChange = (e: React.ChangeEvent<HTMLInputElement>) => setUpdatedItem(e.target.value);
	const handleDeleteItemChange = (e: React.ChangeEvent<HTMLInputElement>) => setDeleteItem(e.target.value);

	return (
		<div>
			<div>
				<h1>{itemState.string101}</h1>
				<input type="text" value={string101} onChange={handleStringChange} />
				<button onClick={() => dispatch(itemChangeString(string101))}>Change String</button>
			</div>

			<div>
				<h1>{itemState.number101}</h1>
				<input type="number" value={number101} onChange={handleNumberChange} />
				<button onClick={() => dispatch(itemChangeNumber(number101))}>Change Number</button>
			</div>

			<div>
				<h1>{itemState.boolean101 ? "TRUE" : "FALSE"}</h1>
				<input type="checkbox" onClick={handleBooleanChange} />
			</div>

			<div>
				<div>
					<input type="string" value={createItem101} onChange={handleCreateItemChange} />
					<button onClick={() => dispatch(itemCreateElement(createItem101))}>Create Item</button>
				</div>

				<div>
					<input type="string" value={updateItem} onChange={handleUpdateItemChange} />
					<input type="string" value={updatedItem} onChange={handleUpdatedItemChange} />
					<button onClick={() => dispatch(updateElement(updateItem, updatedItem))}>Update Item</button>
				</div>

				<div>
					<input type="string" value={deleteItem} onChange={handleDeleteItemChange} />
					<button onClick={() => dispatch(deleteElement(deleteItem))}>Delete Item</button>
				</div>

				{itemState.array101.map((item: { element: string }) => (
					<h1 key={Math.random()}>{item.element}</h1>
				))}
			</div>
		</div>
	);
};

export default Origin;
