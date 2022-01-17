import React, { useState, useEffect } from "react";
import { projectStorage } from "./firebaseConfig";

const useStorage = (file: any) => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		if (file) {
			const storageRef = projectStorage.ref(file.name);

			storageRef.put(file).on(
				"state_change",
				(snap: any) => setProgress((snap.bytesTransferred / snap.totalBytes) * 100),
				(err: any) => setError(err),
				async () => {
					const storageUrl: any = await storageRef.getDownloadURL();
					setUrl(storageUrl);
					console.log(storageUrl);
				}
			);
		}
	}, []);

	return { progress, error, url };
};

export default useStorage;
