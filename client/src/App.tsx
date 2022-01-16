import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Origin from "./main/pages/Origin";
import Item from "./main/pages/Item";
import Zample from "./main/pages/Zample";
import Record from "./main/pages/Record";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Origin />} />
				<Route path="/item" element={<Item />} />
				<Route path="/zample" element={<Zample />} />
				<Route path="/record" element={<Record />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
