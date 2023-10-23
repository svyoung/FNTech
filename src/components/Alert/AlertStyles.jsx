import styled from 'styled-components';

const handleColorType = color => {
    switch (color) {
      case "success":
        return "border: 0.5px solid #50d722; background: #edffe7;";
      case "danger":
        return "border: 0.5px solid #b23030; background: #ffdbdb;";
      default:
        return "border: 0.5px solid #1785d8; background: #d1e3f9;";
    }
  };

export const AlertWrapper = styled.div`
    display: flex;
    position: relative;
    text-align: left;
    border-radius: 5px;
    padding: 10px 10px;
    margin: 10px 0;
    font-size: 14px;
    ${({ color }) => handleColorType(color)};
`;