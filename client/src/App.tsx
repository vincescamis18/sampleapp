import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { fetchUser, userFetch } from "./main/redux/actions/userAction";

import Origin from "./main/pages/Origin";
import Home from "./main/pages/Home";
import Item from "./main/pages/Item";
import Zample from "./main/pages/Zample";
import Record from "./main/pages/Record";
import ManageUser from "./main/pages/ManageUser";
import User from "./main/pages/User";
import Register from "./main/pages/Register";

function App() {
	const dispatch = useDispatch();

	const getUser = () => {
		const token = localStorage.getItem("auth-token");
		// console.log("token", token); // Debug
		if (!token) {
			axios
				.get("/auth/login/success", {
					withCredentials: true,
					headers: { Accept: "application/json", "Content-Type": "application/json" },
				})
				.then(res => {
					// console.log("user login success", res.data); // Debug
					localStorage.setItem("auth-token", res.data.token);
					dispatch(userFetch(res.data.user));
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
				<Route path="/" element={<Home />} />
				<Route path="/Origin" element={<Origin />} />
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
