import React, { useState, useEffect } from "react";

import axios from "axios";
import { IRecordWithCreator } from "../../redux/actionSchemas/recordSchema";

import ViewMemoryV2 from "../../components/modal/ViewMemoryV2";

import EmptyV1 from "../../assets/images/icons/emptyV1.png";

const DisplayAllMemoryV1: React.FC = () => {
	const [recordState, setRecordState] = useState<{ records: IRecordWithCreator[] }>({ records: [] });
	const [selectRecord, setSelectRecord] = useState<IRecordWithCreator>();
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
				<img src={EmptyV1} alt="record empty" key={index} className="all-memory-display-container" />
			));
		}
	};

	const DisplayUserAllMemories = () => (
		<div className="all-memory-parent">
			<div className="all-memory-container">
				{recordState.records?.map((record: IRecordWithCreator, index: number) => (
					<img
						className="cursor-point all-memory-display-container"
						src={record.images[0].link}
						key={index}
						alt="record image"
						onClick={() => selectMemory(record)}
					/>
				))}
				{emptyImages()}
			</div>
		</div>
	);

	const selectMemory = (record: IRecordWithCreator) => {
		setTriggerViewMemory(!triggerViewMemory);
		setSelectRecord(record);
	};

	return (
		<div style={{ backgroundColor: "FFFFFF", paddingBottom: "100px" }}>
			<ViewMemoryV2 modalTigger={triggerViewMemory} record={selectRecord} />
			<DisplayUserAllMemories />
		</div>
	);
};

export default DisplayAllMemoryV1;
