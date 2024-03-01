import { Link } from "react-router-dom";

export default function CardGrid({ title, data, DetailComponent }) {
  return (
    <div className="flex flex-col space-y-8 adaptive-margin">
      <h2>{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 content-center items-center place-content-center place-items-center md:mx-auto">
        {data.map((entry) => (
          <div key={entry.name} className="flex flex-col w-full h-[32rem] md:w-[300px]">
            <img
              src={entry.imgSrc}
              className="w-full h-1/3 object-center object-cover rounded-t-2xl"
            />
            <div className="p-4 text-center w-full h-2/3 bg-teal text-teal-light rounded-b-2xl">
              <DetailComponent data={entry} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
