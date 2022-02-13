import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/allReducer";
import { IRecord } from "../../redux/actionSchemas/recordSchema";

import closeV1 from "../../assets/images/buttons/closeV1.png";
import arrowLeftV1 from "../../assets/images/icons/arrowLeftV1.png";
import arrowRightV1 from "../../assets/images/icons/arrowRightV1.png";

interface IProps {
	modalTigger: boolean;
	record: IRecord | undefined;
}

const ViewMemoryV1 = (props: IProps) => {
	const userState = useSelector((state: RootState) => state.user);

	const [initialLaunch, setInitialLaunch] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [page, setPage] = useState(0);

	// toggle the visibility of modal and prevent the toggle in initial load
	useEffect(() => {
		if (initialLaunch) setInitialLaunch(false);
		else setShowModal(!showModal);
	}, [props.modalTigger]);

	const handleCloseBtn = () => {
		setShowModal(false);
		setShowEdit(false);
		setPage(0);
	};

	const getFormatedDate = () => {
		if (props.record) {
			const date = new Date(props.record?.date);
			const month = date.getMonth() + 1;
			const day = date.getDate();

			// add 0 in front if the number is single
			return `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${date.getFullYear()}`;
		}
	};

	const changePage = (move: string) => {
		// prevent the change page if it reaches the last/end page
		if (props.record) {
			if (move === "next" && props.record?.images.length > page + 1) setPage(page + 1);
			if (move === "back" && page > 0) setPage(page - 1);
		}
	};

	const MultipleImageView = () => (
		<div className="multi-image-container">
			<img src={props.record?.images[page].link} alt="record image" className="image-record" />
			<img className="back-arrow" src={arrowLeftV1} alt="arrow left" onClick={() => changePage("back")} />
			<img className="next-arrow" src={arrowRightV1} alt="arrow right" onClick={() => changePage("next")} />
			<div className="dot-container-middle">
				<div className="dot-container-bottom">
					<div className="dot-container-column">
						{props.record?.images.map((item, index) => (
							<div className={index == page ? "active-dot" : "inactive-dot"}></div>
						))}
					</div>
				</div>
			</div>
		</div>
	);

	if (!userState.surname) return <React.Fragment></React.Fragment>;
	if (!showModal) return <React.Fragment></React.Fragment>;
	return (
		<div className="view-memory-modal-background">
			<div className="view-memory-modal-container">
				<img src={closeV1} alt="close button" className="close-btn" onClick={handleCloseBtn} />
				<div className="image-details-container">
					<div className="image-container">
						{props.record?.images.length === 1 ? (
							<img src={props.record?.images[0].link} alt="record image" className="image-record" />
						) : (
							<MultipleImageView />
						)}
					</div>

					<div className="details-container">
						<div className="no-select option-container">
							<span className="option-btn" onClick={() => setShowEdit(!showEdit)}>
								•••
							</span>
							<div>
								<span className={showEdit ? "showEdit cursor-point" : "hideEdit"} onClick={() => console.log("edit")}>
									Edit
								</span>
							</div>
						</div>

						<div className="picture-name-container">
							<img src={userState.user_profile} alt="user profile" className="display-picture" />
							<span>{`${userState.given_name} ${userState.surname}`}</span>
						</div>
						<p className="title">{props.record?.title}</p>
						<div className="border"></div>
						<div className="owner-date-container">
							<p className="light-text">{props.record?.owner}</p>
							<p className="light-text">{getFormatedDate()}</p>
						</div>
						<span className="light-text">{props.record?.address}</span>
						<p className="description-text">{props.record?.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewMemoryV1;
