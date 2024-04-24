import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@/config/fonts";
import {useRouter} from 'next/router';
import "@/styles/globals.css";

import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'

// From PostHog
if (typeof window !== 'undefined') { // checks that we are client-side
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
    },
  })
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

	return (
		<PostHogProvider client={posthog}>
			<NextUIProvider navigate={router.push}>
				<NextThemesProvider defaultTheme = 'dark'>
					{/* @ts-expect-error Server Component */}
					<Component {...pageProps} />
				</NextThemesProvider>
			</NextUIProvider>
		</PostHogProvider>
	);
}

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};
