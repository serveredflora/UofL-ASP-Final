import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

const navigation = [
	{ name: "Home", url: "/" },
	{ name: "Guides", url: "/guides/" },
	{ name: "Blogs", url: "/blogs/" },
	{ name: "Events", url: "/events/" },
	{ name: "Contact", url: "/contact/" },
	{ name: "Account", url: "/account/" },
];

const events = [
	{
		name: "Recycling Bins",
		summary:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		url: "/events/recycling-bins/",
		imgSrc: "https://placehold.co/300x150/154752/DEEFEC/svg",
	},
	{
		name: "Green Fashion",
		summary:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		url: "/events/green-fashion/",
		imgSrc: "https://placehold.co/300x150/154752/DEEFEC/svg",
	},
];

const blogs = [
	{
		name: "Plant Pots",
		summary:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		url: "/blog/plant-plots/",
		imgSrc: "https://placehold.co/150x250/DEEFEC/154752/svg",
	},
	{
		name: "Rent a Plot",
		summary:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		url: "/blog/rent-a-plot/",
		imgSrc: "https://placehold.co/150x250/DEEFEC/154752/svg",
	},
	{
		name: "Plastic Fashion",
		summary:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		url: "/events/plastic-fashion/",
		imgSrc: "https://placehold.co/150x250/DEEFEC/154752/svg",
	},
];

const apps = {
	ios: [
		{
			name: "ios-1",
			iconSrc: "https://placehold.co/64x64/131313/E1E1E1/svg",
			url: "/apps/ios-1/",
		},
		{
			name: "ios-2",
			iconSrc: "https://placehold.co/64x64/131313/E1E1E1/svg",
			url: "/apps/ios-2/",
		},
		{
			name: "ios-3",
			iconSrc: "https://placehold.co/64x64/131313/E1E1E1/svg",
			url: "/apps/ios-3/",
		},
	],
	android: [
		{
			name: "android-1",
			iconSrc: "https://placehold.co/64x64/131313/E1E1E1/svg",
			url: "/apps/android-1/",
		},
		{
			name: "android-2",
			iconSrc: "https://placehold.co/64x64/131313/E1E1E1/svg",
			url: "/apps/android-2/",
		},
		{
			name: "android-3",
			iconSrc: "https://placehold.co/64x64/131313/E1E1E1/svg",
			url: "/apps/android-3/",
		},
	],
	url: "/apps/",
};

const about = {
	summary:
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
	url: "/about/",
	imgSrc: "https://placehold.co/250x150/154752/DEEFEC/svg",
};

const footer = [
	// Column 1
	{
		text: "Column 1",
		elements: [
			{
				text: "Home",
				url: "/",
			},
			{
				text: "About",
				url: "/about/",
			},
		],
	},
	// Column 2
	{
		text: "Column 2",
		elements: [
			{
				text: "Contact",
				url: "/contact",
			},
		],
	},
];

function Navigation({ navigationData }) {
	return (
		<div className="flex flex-row justify-end space-x-8 pt-8 px-8">
			{navigationData.map((option) => (
				<a key={option.name} href={option.url}>
					{option.name}
				</a>
			))}
		</div>
	);
}

function EventHighlights({ eventData }) {
	return (
		<div className="flex flex-col space-y-8">
			{eventData.map((data, i) => (
				<div
					key={data.name}
					className={
						(i % 2 == 0
							? "flex-row"
							: "flex-row-reverse space-x-reverse") +
						" flex justify-center space-x-8 mx-16"
					}
				>
					<div
						className={
							(i % 2 == 0 ? "text-right" : "text-left") +
							" flex flex-col space-y-2 my-auto"
						}
					>
						<h1 className="text-2xl">{data.name}</h1>
						<p>{data.summary}</p>
						<a href={data.url}>View More >></a>
					</div>
					<img src={data.imgSrc}></img>
				</div>
			))}
		</div>
	);
}

// TODO(noah): the scaling of the cards needs work
function BlogPostCards({ blogData }) {
	return (
		<div className="flex flex-col space-y-4 mx-16">
			<h3 className="text-2xl">Latest Blog Posts</h3>
			<div className="grid grid-cols-3 justify-center gap-x-16">
				{blogData.map((data) => (
					<div key={data.name} className="relative overflow-hidden">
						<img
							src={data.imgSrc}
							className="w-full object-cover"
						></img>
						<div className="absolute flex flex-col w-full h-1/2 top-1/2 left-0 p-4 space-y-2 justify-center text-center bg-teal bg-opacity-75 text-teal-light">
							<h1 className="text-2xl">{data.name}</h1>
							<p>{data.summary}</p>
							<a href={data.url}>View More >></a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function AppsBanner({ appData }) {
	return (
		<div className="flex flex-col justify-center space-y-8 p-8 bg-teal text-teal-light">
			<h3 className="text-2xl text-center">Our Recommended Apps</h3>
			<div className="flex flex-row justify-center space-x-16">
				<div className="flex flex-row space-x-4">
					{appData["ios"].map((data) => (
						<a
							key={data.name}
							href={data.url}
							className="rounded-full"
						>
							<img
								src={data.iconSrc}
								className="rounded-full"
							></img>
						</a>
					))}
				</div>
				<div className="flex flex-row space-x-4">
					{appData["android"].map((data) => (
						<a
							key={data.name}
							href={data.url}
							className="rounded-full"
						>
							<img
								src={data.iconSrc}
								className="rounded-full"
							></img>
						</a>
					))}
				</div>
			</div>
			<a href={appData.url} className="ml-auto text-right">
				More >>
			</a>
		</div>
	);
}

function AboutCard({ aboutData }) {
	return (
		<div className="flex flex-col space-y-4 mx-16">
			<h3 className="text-2xl">About Us</h3>
			<div className="flex flex-row space-x-8">
				<img src={aboutData.imgSrc}></img>
				<div className="flex flex-col space-y-2 justify-center">
					<h3>{aboutData.summary}</h3>
					<a href={aboutData.url}>Read More >></a>
				</div>
			</div>
		</div>
	);
}

function Footer({ footerData }) {
	return (
		<div className="bg-teal text-teal-light">
			<div className="flex flex-row space-x-8 justify-center my-8 mx-16">
				{footerData.map((column) => (
					<div key={column.text} className="flex flex-col space-y-2">
						<h3 className="text-2xl">{column.text}</h3>
						{column.elements.map((element) => (
							<a key={element.text} href={element.url}>
								{element.text}
							</a>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

function App() {
	return (
		<div className="flex flex-col space-y-16">
			<Navigation navigationData={navigation}></Navigation>
			{/* Header */}
			{/* TODO: make this a react component */}
			<div className="flex flex-row justify-center space-x-16 mx-16">
				<div className="flex flex-col space-y-2 text-right my-auto">
					<h1 className="text-4xl">Develop Sustainable Habits</h1>
					<a href="/guide/">Start Today >></a>
				</div>
				<img src="https://placehold.co/400x400/154752/DEEFEC/svg"></img>
			</div>
			<EventHighlights eventData={events}></EventHighlights>
			<BlogPostCards blogData={blogs}></BlogPostCards>
			<AppsBanner appData={apps}></AppsBanner>
			<AboutCard aboutData={about}></AboutCard>
			{/* Footer */}
			{/* TODO(noah): ... */}
			<Footer footerData={footer}></Footer>
		</div>
	);
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
