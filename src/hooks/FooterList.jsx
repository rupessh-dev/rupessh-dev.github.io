const FooterList = (data, key) => {
  return (
    <div className="flex flex-nowrap justify-center gap-2">
      {data?.map((item, index) => (
        <div
          className="flex items-center gap-2"
          key={`${key}_${index}`}
        >
          <img src={item.icon} alt={item.name} className="w-4 h-4" />
          {item.name === "Email" || item.name === "GitHub" ? (
            <a href={item.link} className="text-white text-base font-medium leading-normal whitespace-nowrap">
              {item.name}
            </a>
          ) : (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-base font-medium leading-normal whitespace-nowrap"
            >
              {item.name}
            </a>
          )}
          {index !== data?.length - 1 && (
            <span className="text-gray-400 mx-2 select-none">|</span>
          )}
        </div>
      ))}
    </div>
  );
};
export default FooterList;