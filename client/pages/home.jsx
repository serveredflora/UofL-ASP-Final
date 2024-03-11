import { Link } from "react-router-dom";
import CardGrid from "../components/card_grid.jsx";

// TODO - dynamically populate the home-page with content data (pre-cache the data on the server side?)

const events = [
  {
    name: "Recycling Bins",
    summary: "The effects of junk mail are far-reaching. Register for email billing for your electric bill, student loan payments, water bills, and anything else currently flooding your mailbox. ",
    url: "https://www.treehugger.com/how-to-opt-out-junk-mail-why-you-should-5215233",
    imgSrc: "/pic/event.jpg",
  },
  {
    name: "Green Fashion",
    summary: "Learn how design can be used to create a greener world, from sustainable architecture and tiny homes to eco-friendly remodeling and urban planning.",
    url: "https://www.treehugger.com/design-4846024",
    imgSrc: "pic/event0.jpg",
  },
];

const header = {
  title: "Environmental Living Guide",
  url: "/content/",
  linkText: "Start Today >>",
  imgSrc: "pic/home.jpg",
};

const blogs = [
  {
    name: "Plant Pots",
    summary: "Do You Suffer From 'Scope Creep' in Your Garden?",
    url: "https://www.treehugger.com/scope-creep-in-your-garden-7967724",
    image_path: "pic/blog0.jpg",
  },
  {
    name: "Eat the dandelion greens",
    summary: "Though they can ruthlessly invade flower beds and vegetable gardens, weeds are wonderful in other ways.",
    url: "https://www.treehugger.com/eat-dandelions-edible-garden-weeds-4858806",
    image_path: "pic/blog2.jpg",
  },
  {
    name: "Plastic Fashion",
    summary: "Green clothing is taking over the runways worldwide—not only as a fashion statement but as a way of life. ",
    url: "https://velvety.com.au/blogs/blog/what-is-green-fashion-1",
    image_path: "pic/blog1.jpg",
  },
];

const apps = {
  platforms: [
    {
      name: "iOS",
      elements: [
        {
          name: "Olio",
          iconSrc: "/pic/oilo.png",
          url: "https://olioapp.com/en/",
        },
        {
          name: "Refill",
          iconSrc: "/pic/refill.png",
          url: "https://www.refill.org.uk/",
        },
        {
          name: "ailuna",
          iconSrc: "/pic/icon.png",
          url: "https://ailuna.com/",
        },
      ],
    },
    {
      name: "Android",
      elements: [
        {
          name: "Olio",
          iconSrc: "/pic/oilo.png",
          url: "https://olioapp.com/en/",
        },
        {
          name: "Karma",
          iconSrc: "/pic/icon2.png",
          url: "https://www.karma.life/en",
        },
        {
          name: "Reco",
          iconSrc: "/pic/icon1.png",
          url: "https://www.reco.shop/blogs/reco-blog/green-apps-for-an-eco-friendly-lifestyle",
        },
      ],
    },
  ],
  url: "/apps/",
};

const about = {
  summary: "We are a socially responsible company driven to provide everyone with actionable information and services so that everyone can live a sustainable life.",
  url: "/about/",
  imgSrc: "/pic/about us.jpg",
};

function Header({ data }) {
  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-end space-y-8 space-y-reverse md:space-y-0 md:space-x-16 adaptive-margin object-fill h-48 w-96">
      <div className="flex flex-col justify-center md:items-end space-y-2 md:text-right object-fill h-48 w-96">
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
    <div className="component-container-8">
      <h2>Event Highlights</h2>
      <div className="flex flex-col space-y-16">
        {data.map((data, i) => (
          <div
            key={data.name}
            className={
              (i % 2 ? "md:flex-row " : "md:flex-row-reverse md:space-x-reverse ") + "flex-col-reverse flex space-y-8 space-y-reverse md:space-y-0 md:space-x-8"
            }
          >
            <div className={(i % 2 ? "md:items-end md:text-right " : "md:text-left ") + "flex flex-col space-y-2 my-auto w-full"}>
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

function BlogPostCardDetail({ data }) {
  return (
    <div className="flex flex-col space-y-2 w-full h-full">
      <h2>{data.name}</h2>
      <p>{data.summary}</p>
      <Link to={data.url} className="self-center button button-light w-max !mt-auto">
        View More
      </Link>
    </div>
  );
}

function BlogPostCards({ data }) {
  return <CardGrid title="Latest Blog Posts" data={data} DetailComponent={BlogPostCardDetail} />;
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
                <Link key={`${platform.name}-${data.name}`} to={data.url} className="rounded-full">
                  <img src={data.iconSrc} className="rounded-full object-scale-down h-16 w-16" alt={`App icon for ${data.name}`} />
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
    <div className="component-container-4">
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
      {/* TODO(noah): add some video section (reuse event highlight list) */}
      <AboutCard data={about} />
    </div>
  );
}
