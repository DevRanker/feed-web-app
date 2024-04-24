import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {Feed} from "@/components/feed";

export default function IndexPage() {
	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>Stay&nbsp;</h1>
					<h1 className={title({ color: "violet" })}>Relevant&nbsp;</h1>
					<br/>
					<h1 className={title()}>Know&nbsp;</h1>
					<h1 className={title({ color: "violet" })}>Dev Trends&nbsp;</h1>
					<br />
					<h4 className={subtitle({ class: "mt-4" })}>
						(Personalization & More Coming soon)
					</h4>
				</div>
				<Feed/>
			</section>
		</DefaultLayout>
	);
}
