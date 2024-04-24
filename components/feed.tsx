import {Accordion, AccordionItem} from "@nextui-org/react";
import { Link } from "@nextui-org/link";


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
	const item = {
		repo_id: 772699441,
		repo_full_name: "meta-llama/llama3",
		repo_link: "https://github.com/meta-llama/llama3",
		repo_github_url: "https://api.github.com/repos/meta-llama/llama3",
		new_stars: "59",
		rank: "1"
	}

	return (
		<div className="inline-block max-w-lg w-full">
			<Accordion  variant="bordered" hideIndicator>
				<AccordionItem
					key="1"
					aria-label="Accordion 1"
					startContent={1}
					title={
						<Link isExternal href={item.repo_link}>
							{item.repo_full_name}
						</Link>
					}
					subtitle={
						<span class="flex">
							Up by&nbsp;<strong>{item.new_stars}&nbsp;</strong><Star/>
						</span>
					}
					>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
