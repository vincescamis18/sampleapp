import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { INewUserInput } from "../../redux/actionSchemas/userSchema";
import { RootState } from "../../redux/reducers/allReducer";

interface IProps {
	setUpdatedUser: React.Dispatch<React.SetStateAction<INewUserInput>>;
	updatedUser: INewUserInput;
}

const SingleImageV2 = (props: IProps) => {
	const userState = useSelector((state: RootState) => state.user);

	const [images, setImages] = useState<string>();
	const [error, setError] = useState("");

	useEffect(() => {
		setImages(userState.user_profile);
	}, [userState]);
	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files;
		const maxByteSize = 4194304;

		if (selected) {
			// checks all the image size if it exceeds 4MB
			if (selected[0].size > maxByteSize) {
				props.setUpdatedUser({ ...props.updatedUser, user_profile: null });
				setImages("");
				setError("The size of the image should not exceed above 4MB");
			} else {
				props.setUpdatedUser({ ...props.updatedUser, user_profile: selected });
				setImages(URL.createObjectURL(selected[0]));
				setError("");
			}
		}
	};

	if (userState.isLoading) return <></>;
	return (
		<div>
			<input
				type="file"
				name="record-image"
				id="record-image"
				style={{ width: 0, height: 0 }}
				onChange={handleChangeFile}
				accept="image/png, image/jpeg"
			/>
			<label htmlFor="record-image">
				<img
					src={images}
					alt="record"
					className="cursor-point"
					style={{
						width: "230px",
						height: "230px",
						backgroundColor: "red",
						zIndex: 1,
						borderRadius: "100%",
					}}
				/>
			</label>
			<div>{error && <h1>{error}</h1>}</div>
		</div>
	);
};

export default SingleImageV2;
