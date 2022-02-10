import React, { useState } from "react";
import { INewUserInput } from "../../redux/actionSchemas/userSchema";

interface IProps {
	setUpdatedUser: React.Dispatch<React.SetStateAction<INewUserInput>>;
	updatedUser: INewUserInput;
}

const SingleImageV1 = (props: IProps) => {
	const [images, setImages] = useState<string>();
	const [error, setError] = useState("");

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
			{images ? <img src={images} alt="record" style={{ height: 300, width: 300 }} /> : <></>}
			<div>{error && <h1>{error}</h1>}</div>
			<br />
			<label htmlFor="record-image">UPLOAD IMAGE 101</label>
		</div>
	);
};

export default SingleImageV1;
