import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Origin from "./main/pages/Origin";
import Item from "./main/pages/Item";
import Zample from "./main/pages/Zample";
import Record from "./main/pages/Record";
import ManageUser from "./main/pages/ManageUser";
import Register from "./main/pages/Register";

function App() {
	const getUser = () => {
		// console.log("getting user"); // Debug
		const token = localStorage.getItem("auth-token");
		// console.log(token);
		if (!token) {
			console.log("doesnt have");
			axios
				.get("/auth/login/success", {
					withCredentials: true,
					headers: { Accept: "application/json", "Content-Type": "application/json" },
				})
				.then(res => {
					console.log("user login success", res);
					console.log("user login success", res.data);
					// delete res.data.user.__v;
					console.log("user login success", res.data.user);
					console.log("user login success", res.data.token);
					localStorage.setItem("auth-token", res.data.token);
				})
				.catch(err => console.log(err));
		} else {
			console.log("Check the token");
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Origin />} />
				<Route path="/item" element={<Item />} />
				<Route path="/zample" element={<Zample />} />
				<Route path="/record" element={<Record />} />
				<Route path="/manage_user" element={<ManageUser />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
