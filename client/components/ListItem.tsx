import styled from "styled-components";
import { Theme } from "../themes";

const ListContainer = styled.div<{ withHover: boolean; onClick: () => void }>`
  display: flex;
  flex-direction: column;
  text-align: start;
  padding: 12px;
  height: 70px;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  cursor: ${({ withHover }) => {
    return withHover ? "pointer" : "default";
  }};

  &:hover {
    background: ${({
      theme,
      withHover,
    }: {
      theme: Theme;
      withHover?: boolean;
    }) => {
      return withHover ? theme.CardHighlight : theme.CardColour;
    }};
    transition: background 0.2s linear;
    -webkit-transition: background 0.2s linear;
  }
`;

const ListTitle = styled.div`
  font-weight: 500;
`;

interface ListItemProps {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  withHover?: boolean;
  onClick?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  id,
  title,
  description,
  createdAt,
  withHover = false,
  onClick = () => {},
}) => {
  return (
    <ListContainer key={id} withHover={withHover} onClick={onClick}>
      <ListTitle>Title:</ListTitle> <span>{title}</span>
      <ListTitle>Description:</ListTitle> <span>{description}</span>
      <ListTitle>Created At:</ListTitle>
      <span>{new Date(createdAt).toString()}</span>
    </ListContainer>
  );
};
