import React from "react"

function codebaseItem(props) {
	return (
		<div className="codebaseItem">
			<h4>{props.item.name}</h4>
			<a href={props.item.location}>{props.item.location}</a>
			<p>{props.item.description}</p>
			<span class="align_right"><a href="#top">top</a></span>
		</div>
	);
}
export default codebaseItem;