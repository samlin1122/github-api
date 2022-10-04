import { memo } from "react";

const Repo = ({ name, description, language, html_url }) => {
  return (
    <div className="repo">
      <a href={html_url}>{name}</a>
      <p>{description}</p>
      <p>{language}</p>
    </div>
  );
};
function areEqual(prevProps, nextProps) {
  return prevProps.id === nextProps.id;
}
export default memo(Repo, areEqual);
