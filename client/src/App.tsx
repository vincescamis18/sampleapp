import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Origin from "./main/pages/Origin";
import Item from "./main/pages/Item";
import Zample from "./main/pages/Zample";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Origin />} />
				<Route path="/item" element={<Item />} />
				<Route path="/zample" element={<Zample />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
