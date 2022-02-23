import React, { useState, useEffect } from "react";

import axios from "axios";
import { IRecordWithCreator } from "../redux/actionSchemas/recordSchema";

import NavbarV1 from "../components/headers/NavbarV1";
import ViewMemoryV2 from "../components/modal/ViewMemoryV2";

import EmptyV1 from "../assets/images/icons/emptyV1.png";

const Explore: React.FC = () => {
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
				<img src={EmptyV1} alt="record empty" key={index} className="memory-display-container" />
			));
		}
	};

	const DisplayUserAllMemories = () => (
		<div className="user-memory-parent">
			<div className="user-memory-container">
				{recordState.records?.map((record: IRecordWithCreator, index: number) => (
					<img
						className="cursor-point memory-display-container"
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
		<div style={{ backgroundColor: "FFFFFF", height: "500vh" }}>
			<NavbarV1 />
			<ViewMemoryV2 modalTigger={triggerViewMemory} record={selectRecord} />
			<DisplayUserAllMemories />
		</div>
	);
};

export default Explore;
