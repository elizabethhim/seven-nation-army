import React from 'react';

const Repo = (props) => {
	return (
		<li>
			<a href={props.html_url} target="_blank" rel="noopener noreferrer">
				{props.name}
			</a>
		</li>
	)
}

export default Repo;