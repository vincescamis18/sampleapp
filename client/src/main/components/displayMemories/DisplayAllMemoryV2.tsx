import React, { useState, useEffect } from "react";

import axios from "axios";
import { IRecordWithCreator } from "../../redux/actionSchemas/recordSchema";

import ViewMemoryV3 from "../../components/modal/ViewMemoryV2";

import EmptyV1 from "../../assets/images/icons/emptyV1.png";
import SearchV1 from "../../assets/images/icons/searchV1.png";

interface IProps {
	setSelectRecord: React.Dispatch<React.SetStateAction<IRecordWithCreator | undefined>>;
	selectRecord: IRecordWithCreator | undefined;
	setMemoryOfTheDay: () => void;
}

const DisplayAllMemoryV2 = (props: IProps) => {
	const [recordState, setRecordState] = useState<{ records: IRecordWithCreator[] }>({ records: [] });

	const [viewRecord, setViewRecord] = useState<IRecordWithCreator>();
	const [triggerViewMemory, setTriggerViewMemory] = useState(false);

	useEffect(() => {
		axios
			.get(`/api/records/record-creator`)
			.then(res => {
				console.log("Record-creator", res.data);
				setRecordState({ records: res.data });
			})
			.catch(err => console.log("err", err));
	}, []);

	// fill the gap of 4 picture per column design to push the picture at the left side
	const emptyImages = () => {
		if (recordState.records?.length) {
			const numberOfEmptySlots = recordState.records?.length % 4;
			const emptySlots = [];
			for (let a = 0; a < numberOfEmptySlots; a++) emptySlots.push(a);
			return emptySlots.map((item: any, index: number) => (
				<img src={EmptyV1} alt="record empty" key={index} className="all-memory-v2-display-container" />
			));
		}
	};

	const DisplayUserAllMemories = () => (
		<div className="all-memory-v2-center">
			<div className="all-memory-v2-container">
				{recordState.records?.map((record: IRecordWithCreator, index: number) => (
					<div key={index} className="checkbox-memory-container">
						<div
							className={` cursor-point checkbox-container ${props.selectRecord?._id == record._id ? "checkbox-active" : ""}`}
							onClick={() => (props.setSelectRecord ? props.setSelectRecord(record) : "")}
						></div>
						<img
							className="cursor-point all-memory-v2-display-container"
							src={record.images[0].link}
							alt="record image"
							onClick={() => selectMemory(record)}
						/>
					</div>
				))}
				{emptyImages()}
			</div>
		</div>
	);

	const selectMemory = (record: IRecordWithCreator) => {
		setTriggerViewMemory(!triggerViewMemory);
		setViewRecord(record);
	};

	return (
		<div className="all-memory-v2-parent">
			<ViewMemoryV3 modalTigger={triggerViewMemory} record={viewRecord} />
			<div className="search-submit-container">
				<div className="search-container">
					<img src={SearchV1} alt="search" className="search-icon" />
					<input className="search-input" placeholder="Search" type="text" name="" id="" />
				</div>
				<input type="button" value="Set" onClick={props.setMemoryOfTheDay} className="submit-btn" />
			</div>
			<DisplayUserAllMemories />
		</div>
	);
};

export default DisplayAllMemoryV2;
