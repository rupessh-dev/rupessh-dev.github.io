import EducationList from "../../hooks/EducationList";
const Education = ({ data, CategoryTitle }) => {
  return (
    <>
      <CategoryTitle title="Education" navid="education"/>
      {EducationList(data?.education, "education")}
    </>
  );
};

export default Education;
