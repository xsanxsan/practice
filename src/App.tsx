import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import mobileSideImage from './assets/bg-sidebar-mobile.svg'
import './App.css'
import styled from 'styled-components';
import Footer from './components/Footer/Footer';
import FormSteps from './components/FormSteps/FormSteps';
import FormContent from './components/FormContent/FormContent';
import { FormStepId, form, FormStep, FORM_STATE, FormState } from './components/FormContent/Form';
import FormStateContext from './components/FormContent/FormContext';
import FormSteps2 from './components/FormSteps/FormSteps copy';
import { useForm } from 'react-hook-form';

const MainApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Content = styled.div`
  flex-grow: 1;
  border: 1px solid red;
  background-color: var(--secondary-magnolia);
  position: relative;
`

const ContentWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`

const SideBarImage = styled.div`
  background-image: url(${mobileSideImage});
  background-repeat: no-repeat;
  background-size: cover;
  height: 12em;
  display: flex;
  flex-direction: row;
  `

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`

function App() {

  const [form, setForm] = useState<FormState>(FORM_STATE)
  const {register, handleSubmit} = useForm({
    reValidateMode: 'onBlur',
    mode: 'onTouched',
    // shouldUseNativeValidation: true
  })
  const onSubmit = (data) => {
    console.log(data);
  }

  const handleNext = () => {
    if (form.currentStep < Object.keys(form.steps).length - 1) 
    setForm((prev) => {return {...prev, currentStep: prev.currentStep+1}})
}

  return (
    <FormStateContext.Provider
            value={{
              form,
              setForm,
            }}
          >
      <MainApp className="App">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <SideBarImage />
          <ContentWrapper>
            <FormSteps />
            <FormContent register={register}/>
          </ContentWrapper>
        </Content>
        
        
        </Form>
    </MainApp>
      </FormStateContext.Provider>
  )
}

export default App
