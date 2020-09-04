import styled from "styled-components";

export const Code = styled.code`
  font-size: 4rem;
  color: ${({ theme }) => theme.color_secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  zoom: 0.9;
  text-shadow: 0 0 35px ${({ theme }) => theme.color_secondary};

  span {
    color: ${({ theme }) => theme.color_primary};
  }
`;
