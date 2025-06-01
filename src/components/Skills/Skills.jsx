import SkillHeading from "../../hooks/SkillHeading";
import SkillList from "../../hooks/SkillList";
const Skills = ({ data, CategoryTitle }) => {
  return (
    <>
      <CategoryTitle title="Skills" navid="skills"/>
      {SkillHeading("Frontend")}
      {SkillList(data?.frontendSkills, "frontendSkills")}
      {SkillHeading("Backend")}
      {SkillList(data?.backendSkills, "backendSkills")}
      {SkillHeading("API and Tools")}
      {SkillList(data?.apiSkillsAndTools, "apiSkillsAndTools")}
      {SkillHeading("Database")}
      {SkillList(data?.databaseSkills, "databaseSkills")}
      {SkillHeading("Cloud")}
      {SkillList(data?.cloudSkills, "cloudSkills")}
      {SkillHeading("Monitoring")}
      {SkillList(data?.monitoringTools, "monitoringTools")}
      {SkillHeading("CI/CD")}
      {SkillList(data?.ciCdSkills, "ciCdSkills")}
      {SkillHeading("Development Tools & Code Editors")}
      {SkillList(data?.developmentEditorTools, "developmentEditorTools")}
      {SkillHeading("Analytics and Engagement")}
      {SkillList(data?.analyticsEngagementTools, "analyticsEngagementTools")}
      {SkillHeading("Feature Management & Requests")}
      {SkillList(data?.featureManagementRequestsTools, "featureManagementRequestsTools")}
      {SkillHeading("Hosting and Domains")}
      {SkillList(data?.hostingDomainTools, "hostingDomainTools")}
      {SkillHeading("AI")}
      {SkillList(data?.ai, "ai")}
      {SkillHeading("Collaboration & Productivity Tools")}
      {SkillList(data?.collaborationProductivityTools, "collaborationProductivityTools")}
    
    </>
  );
};
export default Skills;
