import React from "react"

function instructionItem(props) {
	return (
		<div className="instructionItem">
			<h4>{props.item.name}</h4>
			<p>Catogory: {props.item.catogory}</p>
			<p>Description:</p>
			<p>{props.item.description}</p>
			<span class="align_right"><a href="#top">top</a></span>
		</div>
	);
}
export default instructionItem;