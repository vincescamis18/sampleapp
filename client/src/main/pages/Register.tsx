import React from "react";

const Register: React.FC = () => {
	const google = () => {
		window.open("http://localhost:5000/auth/google", "_self");
	};

	// const github = () => {
	// 	window.open("http://localhost:5000/auth/github", "_self");
	// };

	// const facebook = () => {
	// 	window.open("http://localhost:5000/auth/facebook", "_self");
	// };

	return (
		<div className="origin">
			<div>
				<h1>Register101</h1>
				<input type="button" value="google" onClick={google} />
				{/* <input type="button" value="github" onClick={github} />
				<input type="button" value="facebook" onClick={facebook} /> */}
			</div>
		</div>
	);
};

export default Register;
