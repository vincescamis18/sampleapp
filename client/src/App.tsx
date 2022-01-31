import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Origin from "./main/pages/Origin";
import Item from "./main/pages/Item";
import Zample from "./main/pages/Zample";
import Record from "./main/pages/Record";
import User from "./main/pages/User";
import Register from "./main/pages/Register";

function App() {
	const getUser = () => {
		// console.log("getting user"); // Debug
		axios
			.get("http://localhost:5000/auth/login/success", {
				withCredentials: true,
				headers: { Accept: "application/json", "Content-Type": "application/json" },
			})
			.then(res => {
				console.log("user login success", res);
			})
			.catch(err => console.log(err));
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
				<Route path="/user" element={<User />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
