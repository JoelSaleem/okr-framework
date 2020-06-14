export const Card: React.FC = ({ children }) => {
  console.log("card rendered");
  return <div className="shadow-3 pa3 bg-light-purple br3 ">{children}</div>;
};