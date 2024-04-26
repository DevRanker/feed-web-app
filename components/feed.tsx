// @ts-nocheck

import {Accordion, AccordionItem} from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { useState, useEffect } from 'react';
import {marked} from 'marked';

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
	const trendingReposUrl = process.env.NEXT_PUBLIC_TRENDING_REPOSITORIES_URL!;
	const [selectedKeys, setSelectedKeys] = useState(new Set([]));
	const [selectedRepoIndex, setSelectedRepoIndex] = useState();
	const [markdownReady, setMarkdownReady] = useState(false);
	const [markdownHTML, setMarkdownHTML] = useState('<p>a</p>');
	const itemClasses = {
	    trigger: "data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center"
	};

	const getRepoReadme = async (repo_item: String) => {
		const readmeUrl = `https://raw.githubusercontent.com/${repo_item['repo_full_name']}/main/README.md`;
		fetch(readmeUrl)
			.then(res => res.text())
			.then((text) => {
				{/* @ts-expect-error */}
				setMarkdownHTML(marked.parse(text));
				setMarkdownReady(true);
			})
	};

	useEffect(() => {
		if (selectedRepoIndex) {
			setMarkdownReady(false);
			getRepoReadme(trendingRepos[selectedRepoIndex]);
		}
	}, [trendingRepos, selectedRepoIndex])

	useEffect(() => {
		if (selectedKeys.size > 0){
			{/* @ts-expect-error */}
			const [first] = selectedKeys;
			setSelectedRepoIndex(first);						
		}
	}, [selectedKeys])

	useEffect(()=>{

		fetch(trendingReposUrl)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setTrendingRepos(data.repo_list);
				setUpdatedAt(data.update_at);
				setSelectedKeys(new Set(["0"]));

			});
	},[trendingReposUrl]);

	return (
		<div className="inline-block">
			<div className="grid grid-cols-3 gap-3">
				<div className="max-h-[80vh] overflow-auto">
					<Accordion
						variant="bordered"
						selectedKeys={selectedKeys}
						onSelectionChange={setSelectedKeys}
						itemClasses={itemClasses}
					>
						{trendingRepos.map((repo_item, i) => (
							<AccordionItem
								key={i}
								aria-label={repo_item['repo_full_name']}
								startContent={repo_item['rank']}
								title={
									<Link isExternal href={repo_item['repo_link']}>
										{repo_item['repo_full_name']}
									</Link>
								}
								subtitle={
									<span className="flex">
										Up by&nbsp;<strong>{repo_item['new_stars']}&nbsp;</strong><Star/>
									</span>
								}
								>
							</AccordionItem>
						))}
					</Accordion>
				</div>
				<div className="col-span-2">
					{selectedRepoIndex &&
						<Link isExternal
							href={trendingRepos[selectedRepoIndex]['repo_link']}
							className="mb-4 font-extrabold tracking-tight md:text-4xl dark:text-white">{trendingRepos[selectedRepoIndex]['repo_full_name']}
						</Link>
						}
					{markdownReady && <iframe className=" w-full  h-[80vh] overflow-auto border-solid border-2" srcdoc={markdownHTML}></iframe>}
				</div>
			</div>
		</div>
	);
}
