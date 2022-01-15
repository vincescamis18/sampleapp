import React from "react";
import OriginSection01 from "../components/sections/origin/OriginSection01";
import OriginSection02 from "../components/sections/origin/OriginSection02";
import OriginSection03 from "../components/sections/origin/OriginSection03";
import OriginAnimationSample from "../components/sections/origin/OriginAnimationSample";

const Origin: React.FC = () => {
	return (
		<div className="origin">
			<OriginSection01 />
			<OriginSection02 />
			<OriginSection03 />
			<OriginAnimationSample />
		</div>
	);
};

export default Origin;
