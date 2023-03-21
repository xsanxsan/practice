import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import mobileSideImage from './assets/bg-sidebar-mobile.svg'
import desktopSideImage from './assets/bg-sidebar-desktop.svg'
import './App.css'
import styled from 'styled-components';
import FormSteps from './components/FormSteps/FormSteps';
import FormContent from './components/FormContent/FormContent';
import { FORM_STATE, FormState } from './components/FormContent/Form';
import FormStateContext from './components/FormContent/FormContext';
import { DesktopWrapper } from './components/common/DesktopWrapper'

const MainApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--secondary-magnolia);
  place-content: center;
  @media (min-width: 1024px) {
    align-items: center;
    place-content: center;
  }
`

const Content = styled.div`
  flex-grow: 1;
  background-color: var(--secondary-magnolia);
  position: relative;
  @media (min-width: 1024px) {
    display: flex;
    max-height: 40rem;
    max-width: 70rem;
    width: 100%;
    background-color: var(--secondary-white);
    border-radius: 15px;
    padding: 0.5rem;
    align-content: center;
  }
`

const ContentWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    position: relative;
    flex-direction: row;
    height: 100%;
  }
`

const SideBarImage = styled.div`
  background-image: url(${mobileSideImage});
  background-repeat: no-repeat;
  background-size: cover;
  height: 12em;
  display: flex;
  flex-direction: row;
  @media (min-width: 1024px) {
    background-image: url(${desktopSideImage});
    height: 100%;
    width: 26em;
    border-radius: 15px;
    justify-content: center;
  }
  `

const SpanBadSolution = styled.div`
@media (min-width: 1024px) {
    display: none;
  }
`
function App() {

  const [form, setForm] = useState<FormState>(FORM_STATE)

  return (
    <FormStateContext.Provider
            value={{
              form,
              setForm,
            }}
          >
      <MainApp className="App">
        <Content>
          <SideBarImage>
          <DesktopWrapper><FormSteps /></DesktopWrapper>
          </SideBarImage>
          <ContentWrapper>
            <SpanBadSolution><FormSteps /></SpanBadSolution>
            <FormContent />
          </ContentWrapper>
        </Content>
    </MainApp>
      </FormStateContext.Provider>
  )
}

export default App
