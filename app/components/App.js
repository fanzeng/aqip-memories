import React from "react";

import Preface from './Preface';
import datasetLocationData from '../../data/scripts/datasetLocationData';
import DatasetLocationItem from './DatasetLocationItem';
import documentData from '../../data/scripts/documentData';
import DocumentItem from './DocumentItem';
import videoData from '../../data/scripts/videoData';
import VideoItem from './VideoItem';
import codebaseData from '../../data/scripts/codebaseData';
import CodebaseItem from './CodebaseItem';
import instructionData from '../../data/scripts/instructionData';
import InstructionItem from './InstructionItem';

function App() {
	const datasetLocationItems = datasetLocationData.map(item => <DatasetLocationItem key={item.id} item={item} />)
	const documentItems = documentData.map(item => <DocumentItem key={item.id} item={item} />)
	const videoItems = videoData.map(item => <VideoItem key={item.id} item={item} />)
	const codebaseItems = codebaseData.map(item => <CodebaseItem key={item.id} item={item} />)
	const instructionItems = instructionData.map(item => <InstructionItem key={item.id} item={item} />)

	return (
		<div>
			<Preface />
			<section>
				<nav id="codebase"></nav>
				<h2>Code base</h2>
				{codebaseItems}
			</section>			
			<section>
				<nav id="datasets"></nav>
				<h2>Datasets</h2>
				{datasetLocationItems}
			</section>
			<section>
				<nav id="documents"></nav>
				<h2>Documents</h2>
				<div className="flex-container">
					{documentItems}
				</div>
			</section>
			<section>
				<nav id="videos"></nav>
				<h2>Videos</h2>
				<div className="flex-container">
					{videoItems}
				</div>
			</section>
			<section id="instructions">
				<nav id="instructions"></nav>
				<h2>Instructions</h2>
				<div>
					{instructionItems}
				</div>				
			</section>						
		</div>
	);
}
export default App;