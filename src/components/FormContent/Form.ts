type FormStep = {
    title: string
    description?: string
    // stepId: FormStepId
    label: string
}

type FormStepId = 0 | 1 | 2 | 3

export const formRecords: FormStep[] = [
    {
        title: 'Personal info', 
        description: 'Please provide your name, email address, and phone number.', 
        // stepId: 0,
        label: "1"
    }, 
    {
        title: 'Select your plan', 
        description: 'You have the options of monthly or yearly billing', 
        label: "2"
    },
    {
        title: 'Pick add-ons', 
        description: 'Add-ons help enchance your gaming experience', 
        label: "3"
    },
    {
        title: 'Finishing up', 
        description: 'Double-check everything looks OK before confirming', 
        label: "4"
    }]

    type PlanType = 'Arcade' | 'Advanced' | 'Pro'
    type BillingPlan = 'Monthly' | 'Yearly'

    export type FormStepState = {
        valid: boolean, 
        dirty: boolean,
        values: FormInfoValues | FormPlanValues | FormAddonValues | FormSummary
    }

    export type FormState = {
        currentStep: number;
        steps: Record<FormStepId, FormStepState>
    }

    export type FormInfoValues = {
        name: string,
        email: string,
        phoneNumber: string,
    }

    export type FormPlanValues = {
        selectedPlan: PlanType,
        billingPlan: BillingPlan,
    }

    export type FormAddonValues = {
        onlineService: boolean,
        largerStorage: boolean,
        customizableProfile: boolean,
    }

    export type FormSummary = {}

    const FORM_STATE : FormState = {
        currentStep: 0,
        steps : {
          0: {
            valid: false,
            dirty: false,
            values: {
              name: '',
              email: '',
              phoneNumber: '',
            }
          },
          1: {
            valid: false,
            dirty: false,
            values: {
              selectedPlan: "Arcade",
              billingPlan: "Monthly"
            }
          },
          2: {
            valid: false,
            dirty: false,
            values: {
              onlineService: false,
              customizableProfile: false,
              largerStorage: false
            }
          },
          3: {
            valid: false,
            dirty: false,
            values: {}
          }
        }
      }

export {type FormStep, type FormStepId, FORM_STATE }