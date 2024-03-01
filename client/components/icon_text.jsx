// TODO(noah): ensure text is vertically aligned with icon...

export default function IconText({ data }) {
  let text = <p>{data.text}</p>;
  if ("icon" in data) {
    let IconComponent = data.icon.Component;
    let iconComponentOutput = <IconComponent className="w-5 h-5 mt-0.5" />;
    return data.icon.includeText ? (
      <div className="flex flex-row space-x-1">
        {iconComponentOutput}
        {text}
      </div>
    ) : (
      iconComponentOutput
    );
  } else {
    return text;
  }
}
