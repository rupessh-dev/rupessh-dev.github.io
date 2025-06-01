const CategoryTitle = ({ title, navid }) => {
    return (
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5" id={navid}>
            {title}
        </h2>
    );
};
export default CategoryTitle;