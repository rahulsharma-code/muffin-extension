import React, {useEffect, useState} from "react";
import {getActiveTabURL} from './utils.js';
import icon from '../assets/delete.png';
import './app.css';
let tabId;
export default function App() {
	const [clicks, setClicks] = useState([]);
	useEffect(async () => {
		tabId = await getActiveTabURL(); //getting whole tab info here
		tabId = tabId.id + '';
		console.log(tabId);
		chrome.storage.sync.get([tabId] , (obj) => {
			let click =  obj?.[tabId] ? obj[tabId]: [];
			console.log(click);
			setClicks(click);
		});
	},[]);

	const handleClick = (item) => {
		let newClicks = clicks.filter(click => click !== item);
		chrome.storage.sync.set({[tabId]: newClicks}, () => {
			setClicks(newClicks);
		});
	}
	const list = clicks.map((click) => {
		return <div className="item"><span>{click}</span> <img className="image" src={icon} onClick={(e) => {handleClick(click)}} /></div>
	});
 return (
	<>
		<div>Clicked Items</div>
		{list ? <div className="container">{list}</div> : null}
	</>
 );
};