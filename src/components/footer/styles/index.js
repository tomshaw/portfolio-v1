// ==========================================================================
// Styles
// ==========================================================================
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledList = styled.ul`
  padding-left: 25px;
  margin-top: 20px;
`;

const StyledItem = styled.li`
  list-style-type: square;
  color: #231f20 !important; 
  font-family: "Roboto","sans-serif";
  font-size: 1.5rem;
  margin: 0.3rem 0;
`;

const StyledLink = styled(Link)`
  color: #231f20 !important; 
  font-family: "Roboto","sans-serif";
  font-size: 1.5rem;
`;

export {
  StyledList, 
  StyledItem, 
  StyledLink
}