export default function CardGrid({ title, data, DetailComponent }) {
  return (
    <div className="component-container-8">
      <h2>{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((entry, index) => (
          <div key={entry.id || index} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={entry.image_path} className="w-full h-48 object-cover" />
            <div className="p-4 text-center w-full h-2/3 bg-teal text-teal-light rounded-b-2xl">
              <DetailComponent data={entry} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
