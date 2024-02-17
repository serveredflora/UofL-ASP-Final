import React from "react";
import ReactDOM from "react-dom";

const App = () => {
	return (
		<div className="text-center bg-slate-700 text-white p-4">
			<h1 className="text-4xl">Hello World!</h1>
			<h3>This is being rendered on the client-side via React!</h3>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
