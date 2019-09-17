import React from "react"

function DatasetLocationItem(props) {
	return (
		<div className="datasetLocationItem">
			<h4>{props.item.name}</h4>
			<p>{props.item.location}</p>
			<p>{props.item.description}</p>
			<span class="align_right"><a href="#top">top</a></span>
		</div>
	);
}
export default DatasetLocationItem;