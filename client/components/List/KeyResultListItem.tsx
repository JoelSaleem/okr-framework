import { ListTitle } from "./ListTitle";
import { ListContainer } from "./ListContainer";

interface ListItemProps {
  id: number;
  title: string;
  target: number;
  current: number;
  withHover?: boolean;
  onClick?: () => void;
}

export const KeyResultListItem: React.FC<ListItemProps> = ({
  id,
  title,
  current,
  target,
  withHover = false,
  onClick = () => {},
}) => {
  const renderPercentage = () => {
    let percentage: number = 0;

    if (target !== 0) {
      percentage = Math.round((current / target) * 100);
    }
    return (
      <>
        <ListTitle>Percentage</ListTitle>
        <span>{percentage}%</span>
      </>
    );
  };
  return (
    <ListContainer withHover={withHover} onClick={onClick}>
      <ListTitle>Title:</ListTitle> <span>{title}</span>
      <ListTitle>Progress</ListTitle>
      <span>
        {current} / {target}
      </span>
      {renderPercentage()}
    </ListContainer>
  );
};
