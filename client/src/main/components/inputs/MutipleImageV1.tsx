import React, { useState } from "react";
import { INewRecordInput } from "../../redux/actionSchemas/recordSchema";

interface IProps {
	setNewRecord: React.Dispatch<React.SetStateAction<INewRecordInput>>;
	newRecord: INewRecordInput;
}

const MultipleImageV1 = (props: IProps) => {
	const [images, setImages] = useState<string[]>([]);
	const [error, setError] = useState("");

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files;
		const maxByteSize = 4194304;
		let isValidInput = true;

		if (selected) {
			// checks if the images exceeds 4 photos
			if (selected.length > 4) {
				isValidInput = false;
				props.setNewRecord({ ...props.newRecord, images: null });
				setImages([]);
				setError("The number of the image should not exceed to 4 images");
			} else {
				// checks all the image size if it exceeds 4MB
				for (let a = 0; a < selected.length; a++) {
					console.log("multiple: ", selected[a].size);
					if (selected[a].size > maxByteSize) {
						isValidInput = false;
						props.setNewRecord({ ...props.newRecord, images: null });
						setImages([]);
						setError("The size of the image should not exceed above 4MB");
						break;
					}
				}
			}
			if (isValidInput) {
				// Convert the iamges to url to display the selected image in client side
				const currentImage = [];
				for (let a = 0; a < selected.length; a++) if (selected[a]) currentImage.push(URL.createObjectURL(selected[a]));
				props.setNewRecord({ ...props.newRecord, images: selected });
				setImages(currentImage);
				setError("");
				console.log("isValidInput", isValidInput);
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
				multiple
			/>

			{images.map((image: string, index: number) => (
				<img src={image} key={index} alt="record" style={{ height: 300, width: 300 }} />
			))}
			<div>{error && <h1>{error}</h1>}</div>
			<br />
			<label htmlFor="record-image">UPLOAD IMAGE 101</label>
		</div>
	);
};

export default MultipleImageV1;
