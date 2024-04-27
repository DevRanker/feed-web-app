// @ts-nocheck

import {Accordion, AccordionItem, Avatar} from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { useState, useEffect } from 'react';
import {marked} from 'marked';
import {Star} from '@/components/svgs/star';
import {Fork} from '@/components/svgs/fork';
import {SuggestedRepos} from '@/components/suggested_repos';

export function Feed() {
	const [trendingRepos, setTrendingRepos] = useState([]);
	const [updateAt, setUpdatedAt] = useState(0);
	const trendingReposUrl = process.env.NEXT_PUBLIC_TRENDING_REPOSITORIES_URL!;
	const [selectedKeys, setSelectedKeys] = useState(new Set([]));
	const [selectedRepoIndex, setSelectedRepoIndex] = useState();
	const [selectedRepo, setSelectedRepo] = useState();
	const [markdownReady, setMarkdownReady] = useState(false);
	const [markdownHTML, setMarkdownHTML] = useState('<p>a</p>');
	const itemClasses = {
	    trigger: "data-[hover=true]:bg-default-100 rounded-lg flex items-center"
	};

	const getRepoReadme = async (repo_item: String) => {
		const readmeUrl = `https://raw.githubusercontent.com/${repo_item['repo_full_name']}/${repo_item['repository_details']['default_branch']}/README.md`;

		fetch(readmeUrl)
			.then(res => res.text())
			.then((text) => {
				{/* @ts-expect-error */}
				setMarkdownHTML(marked.parse(text));
				setMarkdownReady(true);
			});
	};

	useEffect(() => {
		if (selectedRepo) {
			setMarkdownReady(false);
			getRepoReadme(selectedRepo);
		}
	}, [trendingRepos, selectedRepo])

	useEffect(() => {
		if (selectedKeys.size > 0){
			{/* @ts-expect-error */}
			const [selectedIndex] = selectedKeys;
			setSelectedRepoIndex(selectedIndex);
			setSelectedRepo(trendingRepos[selectedIndex]);
		} else {
			setSelectedRepo(trendingRepos[selectedRepoIndex]);
		}
	}, [selectedKeys])

	useEffect(()=>{

		fetch(trendingReposUrl)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setTrendingRepos(
					data.repo_list.filter((repo_item) => {
						if (repo_item['also_starred'].length == 0 ) {
							return false
						}
						if (repo_item['repository_details']['language'] != undefined) {
							return true;
						}
						return false;
					})
				);
				setUpdatedAt(data.update_at);
				setSelectedKeys(new Set(["1"]));
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
								startContent={i+1}
								title={
									<span className="flex justify-between">
										<span className="flex">
											<Avatar radius="full" size="sm" src={repo_item['repository_details']['owner_avatar_url']} />
											<Link className='pl-1' isExternal href={repo_item['repo_link']}>
												{repo_item['repo_full_name']}
											</Link>
										</span>
										<span><Star starCount={repo_item['new_stars']} prefix="+&nbsp;"/></span>
									</span>
								}
								subtitle={
									<>
										<span className="flex">
											{repo_item['repository_details']['description']}
										</span>
										<span className="flex justify-between pt-1">
											<span className="flex">
												<Star starCount={repo_item['repository_details']['stargazers_count']}/>
												&nbsp;&nbsp;
												<Fork forkCount={repo_item['repository_details']['forks_count']}/>
											</span>
											<span className="flex">
											{repo_item['repository_details']['language']} 
											{repo_item['repository_details']['license'] && ` [${repo_item['repository_details']['license']['spdx_id']}]`}
											</span>
										</span>
									</>
								}
								>
								<SuggestedRepos
									suggested_repos={repo_item['also_starred'].slice(0,4)}
									selectRepoHook={setSelectedRepo}
								/>
							</AccordionItem>
						))}
					</Accordion>
				</div>
				<div className="col-span-2">
					{selectedRepo &&
						<>
							<span className="flex items-center">
								<Avatar isBordered radius="full" size="sm" src={selectedRepo['repository_details']['owner_avatar_url']} />
								<Link isExternal
									href={selectedRepo['repo_link']}
									className="px-2 font-extrabold tracking-tight md:text-4xl dark:text-white">{selectedRepo['repo_full_name']}
								</Link>
							</span>
							<p><b>{selectedRepo['repository_details']['description']}</b></p>
						</>
						}
					{markdownReady && <iframe className=" w-full  h-[80vh] overflow-auto border-solid border-2" srcDoc={markdownHTML}></iframe>}
				</div>
			</div>
		</div>
	);
}