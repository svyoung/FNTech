import './App.css';
import TaxTypeList from './components/TaxType/TaxTypeList';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="fn-title">FNTECH</h1>
      </header>
      <ContentWrapper>
        <TaxTypeList />
      </ContentWrapper>
    </div>
  );
}

export default App;
