import {Accordion, AccordionItem} from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { useState, useEffect } from 'react';


export function Star() {
	return (
		<svg aria-hidden="true"
			viewBox="0 0 16 16"
			stroke="currentColor"
			className="item-center w-4 h-4 mr-1 text-gray-300"
			>
				<path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
		</svg>
	);
}

export function Feed() {
	const [trendingRepos, setTrendingRepos] = useState([]);
	const [updateAt, setUpdatedAt] = useState(0);

	useEffect(()=>{
		fetch('/api/trending_repositories')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setTrendingRepos(data.repo_list);
				setUpdatedAt(data.update_at);
			});
	},[]);

	return (
		<div className="inline-block max-w-lg w-full">
			<Accordion  variant="bordered" hideIndicator>
				{trendingRepos.map((repo_item, i) => (
					<AccordionItem
						key={repo_item.rank}
						aria-label={repo_item.repo_full_name}
						startContent={repo_item.rank}
						title={
							<Link isExternal href={repo_item.repo_link}>
								{repo_item.repo_full_name}
							</Link>
						}
						subtitle={
							<span class="flex">
								Up by&nbsp;<strong>{repo_item.new_stars}&nbsp;</strong><Star/>
							</span>
						}
						>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
