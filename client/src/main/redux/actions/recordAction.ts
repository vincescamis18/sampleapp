import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reducers/allReducer";

import { RecordActionType } from "./allActionTypes";
import {
	RecordActionSchema,
	IRecords,
	IRecord,
	INewRecordInput,
	INewRecordEmpty,
	IUpdateRecordInput,
	IUpdateRecord,
} from "../actionSchemas/recordSchema";
import { projectStorage } from "../../utilities/firebaseConfig";

const recordFetch = (allItem: IRecords): RecordActionSchema => {
	return {
		type: RecordActionType.RECORD_FETCH,
		payload: { allItem },
	};
};

const recordCreate = (newItemArray: IRecords): RecordActionSchema => {
	return {
		type: RecordActionType.RECORD_CREATE,
		payload: { newItemArray },
	};
};

const recordUpdate = (newItemArray: IRecords): RecordActionSchema => {
	return {
		type: RecordActionType.RECORD_UPDATE,
		payload: { newItemArray },
	};
};

const recordDelete = (newItemArray: IRecords): RecordActionSchema => {
	return {
		type: RecordActionType.RECORD_DELETE,
		payload: { newItemArray },
	};
};

export const fetchRecord = () => {
	return (dispatch: Dispatch<RecordActionSchema>) => {
		axios
			.get("/api/records/")
			.then(res => dispatch(recordFetch(res.data)))
			.catch(err => console.log(err));
	};
};

export const createRecord = (newItem: INewRecordInput) => {
	return (dispatch: Dispatch<any>) => {
		if (newItem.images) {
			// Create an empty instance of the record to get the object_id, this will be used in naming the image in cloud
			const emptyRecord: INewRecordEmpty = {
				images: [],
				title: "",
				date: "",
				owner: "",
				description: "",
				tag: "",
				address: "",
				coordinate_x: 0,
				coordinate_y: 0,
				creator: "61f4e54a7248837a21a233d9",
			};

			// Create an empty instance of link object base on the number of image selected
			for (let a = 0; a < newItem.images.length; a++) emptyRecord.images.push({ link: "" });

			// Retrieving the object_id from the created empty instance and save image to cloud
			axios
				.post("/api/records/", emptyRecord)
				.then(res => dispatch(saveImageToCloud(newItem, res.data)))
				.catch(err => console.log(err));
		}
	};
};

const saveImageToCloud = (newItem: INewRecordInput, emptyRecord: IRecord) => {
	return (dispatch: Dispatch<any>) => {
		if (newItem.images) {
			let imageLinks: string[] = [];
			const imageCount = newItem.images.length;

			// loop all the selected images
			for (let a = 0; a < imageCount; a++) {
				// console.log(newItem.image[a]); // Debug

				// name the image using the _id from database
				const storageRef = projectStorage.ref(emptyRecord.images[a]._id);

				// Store the images in the firebase cloud storage
				storageRef
					.put(newItem.images[a])
					.then(res => {
						if (res.state === "success")
							// Retrive the image link that will be saved in the database as link
							storageRef
								.getDownloadURL()
								.then((storageURL: string) => {
									imageLinks.push(storageURL);
									// console.log(storageURL, imageLinks.length, imageCount) // Debug
									// save the created record if all of the image is saved in cloud
									if (imageLinks.length === imageCount) dispatch(saveCreatedRecordToDatabase(newItem, emptyRecord, imageLinks));
								})
								.catch(err => console.log(err));
					})
					.catch(err => console.log(err));
			}
		}
	};
};

const saveCreatedRecordToDatabase = (newItem: INewRecordInput, emptyRecord: IRecord, imageLinks: string[]) => {
	return (dispatch: Dispatch<RecordActionSchema>, getState: () => RootState) => {
		const records = getState().record;
		let newRecord: IUpdateRecord = {
			_id: emptyRecord._id,
			updItem: {
				images: [],
				title: newItem.title,
				date: newItem.date,
				owner: newItem.owner,
				description: newItem.description,
				tag: newItem.tag,
				address: newItem.address,
				coordinate_x: newItem.coordinate_x,
				coordinate_y: newItem.coordinate_y,
				creator: newItem.creator,
			},
		};

		for (let a = 0; a < imageLinks.length; a++)
			newRecord.updItem.images.push({ _id: emptyRecord.images[a]._id, link: imageLinks[a] });

		axios
			.put("/api/records/", newRecord)
			.then(res => {
				const newRecordArray = [{ _id: emptyRecord._id, ...newRecord.updItem }, ...records];
				// console.log(newRecordArray); // Debug
				dispatch(recordCreate(newRecordArray));
			})
			.catch(err => console.log(err));
	};
};
export const updateRecord = (updatedItem: { _id: string; updItem: IUpdateRecordInput }) => {
	return (dispatch: Dispatch<RecordActionSchema>, getState: () => RootState) => {
		const records = getState().record;
		axios
			.put("/api/records/", updatedItem)
			.then(res => {
				// console.log("Successfully updated", res); // Debug
				const index = records.findIndex(element => element._id === updatedItem._id);
				records[index].title = updatedItem.updItem.title;
				records[index].date = updatedItem.updItem.date;
				records[index].owner = updatedItem.updItem.owner;
				records[index].description = updatedItem.updItem.description;
				records[index].tag = updatedItem.updItem.tag;
				records[index].address = updatedItem.updItem.address;
				records[index].coordinate_x = updatedItem.updItem.coordinate_x;
				records[index].coordinate_y = updatedItem.updItem.coordinate_y;
				records[index].creator = updatedItem.updItem.creator;
				const newItemArray = [...records];
				// console.log("newItemArray", newItemArray); // Debug
				dispatch(recordUpdate(newItemArray));
			})
			.catch(err => console.log("err", err));
	};
};

export const deleteRecord = (removeItem: { _id: string }) => {
	return (dispatch: Dispatch<RecordActionSchema>, getState: () => RootState) => {
		const records = getState().record;
		axios
			.delete(`/api/records/${removeItem._id}`)
			.then(res => {
				// console.log("Deleted successfully", removeItem._id ); // Debug
				const newItemArray = records.filter(item => item._id !== removeItem._id);
				dispatch(recordDelete(newItemArray));
			})
			.catch(err => console.log("err", err));
	};
};
