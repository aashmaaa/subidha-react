import styled from "styled-components";
import {
  IoMdNotificationsOutline,
  IoIosSearch,
  IoMdContact,
} from "react-icons/io";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icons {
    display: flex;
    gap: 1.5rem;
  }
`;

const StyledLink = styled(Link)`
  font-size: 3rem;
  color: inherit;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-brand-600);
    transition: all 0.3s;
  }

  &.active {
  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <h1> </h1>
      <div className="icons">
        <StyledLink to="/notifications">
          <IoMdNotificationsOutline />
        </StyledLink>
        <StyledLink to="/search">
          <IoIosSearch />
        </StyledLink>
        <StyledLink to="/profile">
          <IoMdContact />
        </StyledLink>
      </div>
    </StyledHeader>
  );
};

export default Header;
