import React from 'react';
import './App.css';
import Card, { Width } from './components/Card/Card';

function App() {
	let name = '10'

	return (
		<div className="App">
			<Card width={Width.one} />
			<Card className={name} name='vasya'></Card>
		</div>
	)
}

export default App;
