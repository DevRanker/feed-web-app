export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "DevRanker",
	description: "Keep up with the best Open-Source Projects & Developers",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/DevRanker/feed-web-app",
		twitter: "https://twitter.com/devranker",
		docs: "#",
		discord: "#",
    sponsor: "#"
	},
};
