import { Link } from "react-router-dom";

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
  title: "Environmental Living Guide",
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

function Header({ data }) {
  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-end space-y-8 space-y-reverse md:space-y-0 md:space-x-16 adaptive-margin">
      <div className="flex flex-col justify-center md:items-end space-y-2 md:text-right">
        <h1>{data.title}</h1>
        <Link to={data.url} className="w-max">
          {data.linkText}
        </Link>
      </div>
      <img src={data.imgSrc} className="rounded-2xl"></img>
    </div>
  );
}

function EventHighlights({ data }) {
  return (
    <div className="flex flex-col space-y-8 adaptive-margin">
      <h2>Event Highlights</h2>
      <div className="flex flex-col space-y-16">
        {data.map((data, i) => (
          <div
            key={data.name}
            className={
              (i % 2 ? "md:flex-row" : "md:flex-row-reverse md:space-x-reverse") +
              " flex-col-reverse flex space-y-8 space-y-reverse md:space-y-0 md:space-x-8"
            }
          >
            <div
              className={
                (i % 2 ? "md:items-end md:text-right" : "md:text-left") +
                " flex flex-col space-y-2 my-auto w-full"
              }
            >
              <h1>{data.name}</h1>
              <p>{data.summary}</p>
              <Link to={data.url} className="w-max">
                View More >>
              </Link>
            </div>
            <img src={data.imgSrc} className="rounded-2xl"></img>
          </div>
        ))}
      </div>
    </div>
  );
}

// TODO(noah): the scaling of the cards needs work
function BlogPostCards({ data }) {
  return (
    <div className="flex flex-col space-y-8 adaptive-margin">
      <h2>Latest Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 content-center items-center place-content-center place-items-center md:mx-auto">
        {data.map((data) => (
          <div
            key={data.name}
            className="relative overflow-hidden w-full h-96 md:w-72 md:h-[32rem] rounded-2xl"
          >
            {/* TODO(noah): somehow center img */}
            <img src={data.imgSrc} className="w-full object-center object-cover"></img>
            <div className="absolute flex flex-col w-full h-1/2 top-1/2 left-0 p-4 space-y-2 justify-around items-center text-center bg-teal bg-opacity-75 text-teal-light">
              <h2>{data.name}</h2>
              <p>{data.summary}</p>
              <Link to={data.url} className="button w-max">
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppsBanner({ data }) {
  return (
    <div className="flex flex-col justify-center space-y-8 p-8 bg-teal text-teal-light">
      <h2 className="text-center">Our Recommended Apps</h2>
      <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-48">
        {data.platforms.map((platform) => (
          <div key={platform.name} className="flex flex-col space-y-4">
            <h3 className="text-center">{platform.name}</h3>
            <div className="flex flex-row justify-center space-x-4">
              {platform.elements.map((data) => (
                <Link
                  key={`${platform.name}-${data.name}`}
                  to={data.url}
                  className="rounded-full"
                >
                  <img
                    src={data.iconSrc}
                    className="rounded-full"
                    alt={`App icon for ${data.name}`}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Link to={data.url} className="ml-auto text-right w-max">
        View More >>
      </Link>
    </div>
  );
}

function AboutCard({ data }) {
  return (
    <div className="flex flex-col space-y-4 adaptive-margin">
      <h2>About Us</h2>
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <img src={data.imgSrc} className="rounded-2xl"></img>
        <div className="flex flex-col space-y-2 justify-center">
          <p>{data.summary}</p>
          <Link to={data.url} className="w-max">
            Read More >>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col space-y-16">
      <Header data={header} />
      <EventHighlights data={events} />
      <BlogPostCards data={blogs} />
      <AppsBanner data={apps} />
      <AboutCard data={about} />
    </div>
  );
}
