import React from "react"

function DocumentItem(props) {
	return (
		<div className="documentItem flex">
			<h4>{props.item.name}</h4>
			<p>File type: {props.item.type}</p>
			<p>Description: {props.item.description}</p>
			<a href={props.item.location}>Download</a>
			<span class="align_right"><a href="#top">top</a></span>
		</div>
	);
}
export default DocumentItem;