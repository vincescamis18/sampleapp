import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/allReducer";

import axios from "axios";
import LoadingScreenV1 from "../loadingScreens/loadingScreeenV1";

import closeV1 from "../../assets/images/buttons/closeV2.png";
import submitBtnV2 from "../../assets/images/buttons/submitBtnV2.png";

interface IProps {
	modalTigger: boolean;
	recordId: string | undefined;
}

const ReportContent = (props: IProps) => {
	const userState = useSelector((state: RootState) => state.user);
	const [initialLaunch, setInitialLaunch] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const choices = [
		"Nudity",
		"Violence",
		"Harassment",
		"Self-Harm",
		"Gross Content",
		"Spam",
		"False Information",
		"Unauthorized Sales",
		"Terrorism",
		"Hate Speech",
		"Others",
	];
	const [selectedType, setSelectedType] = useState<string[]>([]);
	const [description, setDescription] = useState<string>("");

	// toggle the visibility of modal and prevent the toggle in initial load
	useEffect(() => {
		if (initialLaunch) setInitialLaunch(false);
		else setShowModal(!showModal);
	}, [props.modalTigger]);

	const handleCloseBtn = () => {
		setShowModal(false);
		setSelectedType([]);
		setDescription("");
	};

	// Called when item is selected or unselected
	const handleOnPressType = (type: string) => {
		if (!selectedType.includes(type)) {
			// Item is newly selected
			// Add highlight to clinic name and add to selectedType array
			const newSelectedService = [...selectedType, type];
			setSelectedType(newSelectedService);
		} else {
			// Unselect type
			// Remove highlighted clinic name and remove to selectedType array
			let newSelectedService = [...selectedType];
			newSelectedService.splice(newSelectedService.indexOf(type), 1);
			setSelectedType(newSelectedService);
		}
	};

	const handleSubmit = () => {
		if (selectedType.length > 0) {
			if (description) {
				setIsSubmitting(true);
				const body = { type: selectedType, description, reporter: userState._id, record_id: props.recordId };
				axios
					.post("/api/report", body)
					.then(() => {
						setIsSubmitting(false);
						handleCloseBtn();
						console.log("Success");
					})
					.catch(err => console.log(err));
			} else console.log("Please enter a description first");
		} else {
			console.log("Select a service first");
		}
	};

	if (!showModal) return <React.Fragment></React.Fragment>;
	return (
		<React.Fragment>
			<div className="report-parent">
				<LoadingScreenV1 modalTigger={isSubmitting} />
				<div className="report-center">
					<div className="report-container">
						<div className="title-exist">
							<h1>Report Abuse</h1>
							<img src={closeV1} alt="close button" className="cursor-point exit" onClick={handleCloseBtn} />
						</div>
						<div className="report-type-container">
							{choices.map((item, index) => (
								<div
									key={index}
									onClick={() => handleOnPressType(item)}
									className="cursor-point report-type"
									style={{
										backgroundColor: selectedType.includes(item) ? "black" : "gray",
										color: selectedType.includes(item) ? "white" : "white",
									}}
								>
									{item}
								</div>
							))}
						</div>

						<textarea
							name="description"
							id="description"
							placeholder="Description"
							className="description"
							onChange={e => setDescription(e.target.value)}
						/>

						<div className="submit-btn-center">
							<img src={submitBtnV2} alt="submit Button" className="cursor-point" onClick={handleSubmit} />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ReportContent;
