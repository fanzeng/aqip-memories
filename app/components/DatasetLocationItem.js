import React from "react"

function DatasetLocationItem(props) {
	let urlJSX;
	if (props.item.location.substring(0, 3) === "hpc") {
		urlJSX = (<p>{props.item.location}</p>);
	} else {
		urlJSX = (<a href={props.item.location}>{props.item.location}</a>);
	}

	return (
		<div className="datasetLocationItem">
			<h4>{props.item.name}</h4>
			{urlJSX}
			<p>{props.item.description}</p>
			<span class="align_right"><a href="#top">top</a></span>
		</div>
	);
}
export default DatasetLocationItem;