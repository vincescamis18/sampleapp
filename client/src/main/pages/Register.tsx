import React from "react";

import facebookBtn from "../assets/images/buttons/facebookV1.png";
import googleBtn from "../assets/images/buttons/googleV1.png";

const Register: React.FC = () => {
	const googleAuth = () => window.open("http://localhost:5000/auth/google", "_self");
	// const facebookAuth = () => window.open("http://localhost:5000/auth/facebook", "_self");
	// const githubAuth = () => window.open("http://localhost:5000/auth/github", "_self");

	return (
		<div className="register">
			<div className="right-container">
				<div className="input-container">
					<img src={facebookBtn} alt="FB auth" className="facebookBtn" onClick={() => console.log("FB")} />
					<img src={googleBtn} alt="google auth" className="googleBtn" onClick={googleAuth} />
					<span className="policy-text">
						By contuing, you agree to Memorya Ph’s{" "}
						<b className="policy" onClick={() => console.log("Terms and Conditions")}>
							Terms and Conditions
						</b>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Register;
