import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { fetchUser } from "./main/redux/actions/userAction";

import Origin from "./main/pages/Origin";
import Item from "./main/pages/Item";
import Zample from "./main/pages/Zample";
import Record from "./main/pages/Record";
import ManageUser from "./main/pages/ManageUser";
import User from "./main/pages/User";
import Register from "./main/pages/Register";

function App() {
	const dispatch = useDispatch();

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
					console.log("user login success", res.data);
					localStorage.setItem("auth-token", res.data.token);
				})
				.catch(err => console.log(err));
		} else dispatch(fetchUser());
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
				<Route path="/user" element={<User />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
