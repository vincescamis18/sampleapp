import React, { useState } from "react";
import { projectStorage } from "../../utilities/firebaseConfig";

const UploadImage: React.FC = () => {
	const [file, setFile] = useState<any>(null);
	const [error, setError] = useState("");
	const allowedTypes = ["image/png", "image/jpeg"];

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		let selected: File;
		// checks if there is a selected file
		if (e.target.files) {
			selected = e.target.files[0];
			// checks the selected type if valid image type
			if (selected && allowedTypes.includes(selected.type)) {
				console.log("selected success");
				setFile(selected);
				setError("");
			} else {
				console.log("invalid selection");
				setFile(null);
				setError("selected invalid type");
			}
		}
	};

	const handleStoreImage = (file: File) => {
		const storageRef = projectStorage.ref(file.name);
		storageRef
			.put(file)
			.then(res => {
				if (res.state === "success")
					storageRef
						.getDownloadURL()
						.then((storageURL: string) => console.log(storageURL))
						.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	};

	return (
		<div>
			<h1>Upload</h1>
			<form action="">
				<input type="file" name="" id="" onChange={handleChangeFile} />
				<div>
					{error && <h1>{error}</h1>}
					{file && <h1>{file.name}</h1>}
				</div>
				<input type="button" value="SEND IMAGE" onClick={() => handleStoreImage(file)} />
			</form>
		</div>
	);
};

export default UploadImage;
