import { useState, useEffect } from "react";
import http from "axios";

function App() {
	const [name, setName] = useState("");
	const [color, setColor] = useState("");
	const [cats, setCats] = useState([]);

	const add = async () => {
		await http.post("http://localhost:3000/api/cats", {
			name,
			color,
		});
		load();
	};
	const load = async () => {
		const response = await http.get("http://localhost:3000/api/cats");
		setCats(response.data);
	};
	const del = async (id) => {
		await http.delete(`http://localhost:3000/api/cats/${id}`);
		load();
	};

	useEffect(() => {
		load();
	}, []);

	return (
		<div className="App">
			<input
				type="text"
				placeholder="Cat name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type="color"
				value={color}
				onChange={(e) => setColor(e.target.value)}
			/>
			<button onClick={() => add()}>Add</button>
			{cats.map((cat) => (
				<div key={cat.id} style={{ backgroundColor: cat.color }}>
					{cat.name}
					<button onClick={() => del(cat.id)}>Delete</button>
				</div>
			))}
		</div>
	);
}

export default App;
