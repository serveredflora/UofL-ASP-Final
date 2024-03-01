export default function IconText({ data }) {
  let text = <p className="my-auto">{data.text}</p>;
  if ("icon" in data) {
    let IconComponent = data.icon.Component;
    let iconComponentOutput = <IconComponent className="w-5 h-5 my-auto" />;
    return data.icon.includeText ? (
      <div className="flex flex-row space-x-1">
        {iconComponentOutput}
        {text}
      </div>
    ) : (
      <div className="h-6 py-0.5">{iconComponentOutput}</div>
    );
  } else {
    return text;
  }
}
