import React, { useState, useEffect } from "react";

import axios from "axios";
import { IRecordWithCreator } from "../../redux/actionSchemas/recordSchema";

import ViewMemoryV2 from "../modal/ViewMemoryV2";

import EmptyV1 from "../../assets/images/icons/emptyV1.png";

const MemoryOfTheDay: React.FC = () => {
	const [recordState, setRecordState] = useState<any>({ records: [] });
	const [selectRecord, setSelectRecord] = useState<IRecordWithCreator>();
	const [triggerViewMemory, setTriggerViewMemory] = useState(false);

	useEffect(() => {
		axios
			.get(`/api/featured-memory/featured-memory-today`)
			.then(res => {
				console.log("Record-creator", res.data);
				setRecordState({ records: res.data });
			})
			.catch(err => console.log("err", err));
	}, []);

	const DisplayUserAllMemories = () => (
		<div className="display-memory-of-the-day-parent">
			<div className="memory-of-the-day-container">
				{recordState.records.length > 0 ? (
					<img
						className="cursor-point memory-of-the-day-display-container"
						src={recordState.records[0].record_id.images[0].link}
						alt="record image"
						onClick={() => selectMemory(recordState.records[0])}
					/>
				) : (
					<div className="memory-of-the-day-display-container" />
				)}
			</div>
		</div>
	);

	const selectMemory = (record: any) => {
		setTriggerViewMemory(!triggerViewMemory);
		setSelectRecord(record.record_id);
	};

	return (
		<div style={{ backgroundColor: "FFFFFF", paddingBottom: "100px" }}>
			<ViewMemoryV2 modalTigger={triggerViewMemory} record={selectRecord} />
			<DisplayUserAllMemories />
		</div>
	);
};

export default MemoryOfTheDay;
