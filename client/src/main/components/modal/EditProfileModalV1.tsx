import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/allReducer";
import { updateUser } from "../../redux/actions/userAction";
import { INewUserInput } from "../../redux/actionSchemas/userSchema";

import UploadImage from "../inputs/SingleImageV2";
import saveProfileV1 from "../../assets/images/buttons/saveProfileV1.png";
import editProfileV1 from "../../assets/images/logo/editProfileV1.png";
import closeV1 from "../../assets/images/buttons/closeV1.png";

interface IProps {
	modalTigger: boolean;
}

const EditProfile = (props: IProps) => {
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);

	const [initialLaunch, setInitialLaunch] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [isSubmited, setIsSubmited] = useState(false);

	const [updatedUser, setUpdatedUser] = useState<INewUserInput>({
		surname: "",
		given_name: "",
		user_profile: null,
		email: userState.email,
		location: "",
		bio: "",
		birthday: "",
	});

	// toggle the visibility of modal and prevent the toggle in initial load
	useEffect(() => {
		if (initialLaunch) setInitialLaunch(false);
		else setShowModal(!showModal);
	}, [props.modalTigger]);

	useEffect(() => {
		// handle the submission of the form after clicking the btn and successful api call
		if (isSubmited && !userState.isLoading) setShowModal(!showModal);

		// set the initial value of input
		if (userState.birthday)
			setUpdatedUser({
				...updatedUser,
				surname: userState.surname,
				given_name: userState.given_name,
				location: userState.location,
				bio: userState.bio,
				birthday: new Date(userState.birthday).toISOString().split("T")[0],
			});
	}, [userState]);

	const handleUpdateRecordInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUpdatedUser({
			...updatedUser,
			[e.target.name]: e.target.value,
		});
	};

	if (!userState.surname) return <React.Fragment></React.Fragment>;
	if (!showModal) return <React.Fragment></React.Fragment>;
	return (
		<div className="editProfileModal-background">
			<div className="editProfileModal-container">
				<img src={closeV1} alt="close button" className="close-btn" onClick={() => setShowModal(false)} />
				<div className="top-section-container">
					<div className="top-section-block-01-container">
						<div className="image-input-seperator">
							<div className="block-edit-save-container">
								<img src={editProfileV1} alt="edit profile" className="edit-margin" />
								<img
									src={saveProfileV1}
									alt="save button"
									className="save-btn"
									onClick={() => {
										console.log(updatedUser);
										setIsSubmited(true);
										dispatch(updateUser(updatedUser));
									}}
								/>
							</div>
							<div>
								<input
									type="text"
									name="given_name"
									placeholder="Given Name"
									className="name-input"
									value={updatedUser.given_name}
									onChange={handleUpdateRecordInputChange}
								/>
								<input
									type="text"
									name="surname"
									placeholder="Last Name"
									className="name-input"
									value={updatedUser.surname}
									onChange={handleUpdateRecordInputChange}
								/>
							</div>
						</div>
						<UploadImage updatedUser={updatedUser} setUpdatedUser={setUpdatedUser} />
					</div>

					<div className="top-section-block-02-container">
						<input
							type="date"
							name="birthday"
							value={updatedUser.birthday}
							className="birthday-input"
							onChange={handleUpdateRecordInputChange}
						/>
						<input
							type="text"
							className="location-input"
							name="location"
							placeholder="Location"
							value={updatedUser.location}
							onChange={handleUpdateRecordInputChange}
						/>
					</div>
				</div>

				<div className="btm-section-container">
					<textarea
						name="bio"
						placeholder="Bio"
						value={updatedUser.bio}
						className="bio-input"
						onChange={handleUpdateRecordInputChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
