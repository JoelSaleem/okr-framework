export const Card: React.FC = ({ children }) => {
  return (
    <div className="shadow-3 pa3 bg-light-purple br3 flex flex-auto">
      {children}
    </div>
  );
};
