import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const navigation = [
  { name: "Home", url: "/" },
  { name: "Guides", url: "/guides/" },
  { name: "Blogs", url: "/blogs/" },
  { name: "Events", url: "/events/" },
  { name: "Contact", url: "/contact/" },
  { name: "Account", url: "/account" },
];

function Home() {
  return (
    <div className="flex flex-col space-y-16">
      <Header headerData={header} />
      <EventHighlights eventData={events} />
      <BlogPostCards blogData={blogs} />
      <AppsBanner appData={apps} />
      <AboutCard aboutData={about} />
      <Footer footerData={footer} />
    </div>
  );
}

function Account() {
  return (
    <div className="flex flex-col space-y-8 items-center">
      <h2 className="text-2xl font-bold">Account Login</h2>
      <div className="flex flex-col space-y-4">
        <label htmlFor="username" className="text-lg">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <label htmlFor="password" className="text-lg">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Login
      </button>
      <Link to="/register" className="text-blue-500 hover:underline">
        Register
      </Link>
    </div>
  );
}

const events = [
  {
    name: "Recycling Bins",
    summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    url: "/events/recycling-bins/",
    imgSrc: "https://placehold.co/300x150/154752/DEEFEC/svg",
  },
  {
    name: "Green Fashion",
    summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    url: "/events/green-fashion/",
    imgSrc: "https://placehold.co/300x150/154752/DEEFEC/svg",
  },
];

const header = {
  title: "Develop Sustainable Habits",
  url: "/guide/",
  linkText: "Start Today >>",
  imgSrc: "https://placehold.co/400x400/154752/DEEFEC/svg",
};

const blogs = [
  {
    name: "Plant Pots",
    summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    url: "/blog/plant-plots/",
    imgSrc: "https://placehold.co/150x250/DEEFEC/154752/svg",
  },
  {
    name: "Rent a Plot",
    summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    url: "/blog/rent-a-plot/",
    imgSrc: "https://placehold.co/150x250/DEEFEC/154752/svg",
  },
  {
    name: "Plastic Fashion",
    summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    url: "/events/plastic-fashion/",
    imgSrc: "https://placehold.co/150x250/DEEFEC/154752/svg",
  },
];

const apps = {
  platforms: [
    {
      name: "iOS",
      elements: [
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
    },
    {
      name: "Android",
      elements: [
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
    },
  ],
  url: "/apps/",
};

const about = {
  summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  url: "/about/",
  imgSrc: "https://placehold.co/250x150/154752/DEEFEC/svg",
};

const footer = [
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
        <Link key={option.name} to={option.url}>
          {option.name}
        </Link>
      ))}
    </div>
  );
}

function Header({ headerData }) {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center space-y-8 space-y-reverse md:space-x-16 mx-16">
      <div className="flex flex-col space-y-2 md:text-right my-auto">
        <h1 className="text-4xl">{headerData.title}</h1>
        <a href={headerData.url}>{headerData.linkText}</a>
      </div>
      <img src={headerData.imgSrc}></img>
    </div>
  );
}

function EventHighlights({ eventData }) {
  return (
    <div className="flex flex-col space-y-8 mx-16">
      <h3 className="text-2xl">Event Highlights</h3>
      <div className="flex flex-col space-y-16">
        {eventData.map((data, i) => (
          <div
            key={data.name}
            className={
              (i % 2 == 0 ? "md:flex-row" : "md:flex-row-reverse md:space-x-reverse") +
              " flex-col-reverse flex space-y-8 space-y-reverse md:space-y-0 md:space-x-8"
            }
          >
            <div
              className={(i % 2 == 0 ? "md:text-right" : "md:text-left") + " flex flex-col space-y-2 my-auto w-full"}
            >
              <h1 className="text-2xl">{data.name}</h1>
              <p>{data.summary}</p>
              <a href={data.url}>View More >></a>
            </div>
            <img src={data.imgSrc}></img>
          </div>
        ))}
      </div>
    </div>
  );
}

// TODO(noah): the scaling of the cards needs work
function BlogPostCards({ blogData }) {
  return (
    <div className="flex flex-col space-y-8 mx-16">
      <h3 className="text-2xl">Latest Blog Posts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 content-center items-center place-content-center place-items-center md:mx-auto">
        {blogData.map((data) => (
          <div key={data.name} className="relative overflow-hidden w-full h-96 md:min-w-72 md:max-w-72">
            {/* TODO(noah): somehow center img */}
            <img src={data.imgSrc} className="w-full object-center object-cover"></img>
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
      <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-48">
        {appData.platforms.map((platform) => (
          <div key={platform.name} className="flex flex-col space-y-2">
            <h5 className="text-xl text-center">{platform.name}</h5>
            <div className="flex flex-row justify-center space-x-4">
              {platform.elements.map((data) => (
                <a key={`${platform.name}-${data.name}`} href={data.url} className="rounded-full">
                  <img src={data.iconSrc} className="rounded-full" alt={`App icon for ${data.name}`} />
                </a>
              ))}
            </div>
          </div>
        ))}
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
    <Router>
      <div className="flex flex-col space-y-16">
        <Navigation navigationData={navigation} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
