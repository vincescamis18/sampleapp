import React, { useState, useEffect } from "react";

import axios from "axios";
import { IRecordWithCreator } from "../../redux/actionSchemas/recordSchema";

import ViewMemoryV2 from "../modals/ViewMemoryV2";

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
		<div className="display-memory-of-the-day-parent no-select">
			<div className="memory-of-the-day-container">
				{recordState.records.length > 0 ? (
					<React.Fragment>
						<div className="description-container cursor-point" onClick={() => selectMemory(recordState.records[0])}>
							<div className="description-section">
								<h2>MEMORY OF THE DAY</h2>
								<h2 className="text-gap">{recordState.records[0].record_id.title}</h2>
								<h3>{`Submitted by ${recordState.records[0].record_id.creator.given_name} ${recordState.records[0].record_id.creator.surname}`}</h3>
								<h4 className="text-gap">{`${recordState.records[0].record_id.description}`}</h4>
							</div>
						</div>
						<img
							className="cursor-point memory-of-the-day-display-container"
							src={recordState.records[0].record_id.images[0].link}
							alt="record image"
							onClick={() => selectMemory(recordState.records[0])}
						/>
					</React.Fragment>
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
