import React from "react"

function VideoItem(props) {
	return (
		<div className="videoItem flex">
			<h4>{props.item.name}</h4>
			<p>Description: {props.item.description}</p>
			<video width="320" height="240" controls>
				<source src={props.item.location} type="video/mp4"/>
				Your browser does not support the video tag.
			</video>
			<p>
				<a href={props.item.location}>Download</a>
			</p>
			<span class="align_right"><a href="#top">top</a></span>
		</div>
	);
}
export default VideoItem;