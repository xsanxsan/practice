type FormStep = {
    title: string
    description?: string
    label: string
    additionalText: string
}

export enum FormStepId {
  PERSONAL_INFO,
  PLAN,
  ADD_ON,
  SUMMARY
}

export const formRecords: FormStep[] = [
    {
        title: 'Personal info', 
        description: 'Please provide your name, email address, and phone number.', 
        label: "1",
        additionalText: "Your info"
    }, 
    {
        title: 'Select your plan', 
        description: 'You have the options of monthly or yearly billing', 
        label: "2",
        additionalText: "Select Plan"
    },
    {
        title: 'Pick add-ons', 
        description: 'Add-ons help enchance your gaming experience', 
        label: "3",
        additionalText: "Add-ons"
    },
    {
        title: 'Finishing up', 
        description: 'Double-check everything looks OK before confirming', 
        label: "4",
        additionalText: "Summary"
    }]

    export const OPlanType = {
        Arcade: 'Arcade',
        Advanced: 'Advanced',
        Pro: 'Pro',
    } as const;
      
    export type PlanType = typeof OPlanType[keyof typeof OPlanType];

    export const OBillingPlan = {
        Monthly: false,
        Yearly: true
      } as const;

    export type BillingPlan = typeof OBillingPlan[keyof typeof OBillingPlan];

    export type FormStepState<T> = {
        valid: boolean, 
        dirty: boolean,
        values: T
    }

    export type FormState = {
        currentStep: number;
        steps: Record<FormStepId.PERSONAL_INFO, FormStepState<FormInfoValues>> & 
        Record<FormStepId.PLAN, FormStepState<FormPlanValues>> & 
        Record<FormStepId.ADD_ON, FormStepState<FormAddonValues>> & Record<FormStepId.SUMMARY, FormStepState<{}>>
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
        customTheme: boolean,
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
              billingPlan: false
            }
          },
          2: {
            valid: false,
            dirty: false,
            values: {
              onlineService: false,
              customTheme: false,
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

      export const calculateTotalPrice = (form: FormState): number => {
        const selectedBillingPlan = form.steps[FormStepId.PLAN].values.billingPlan
        let total = 0;
        switch (form.steps[FormStepId.PLAN].values.selectedPlan) {
          case "Arcade":
            total = total + 9 * 10
            break
          case "Advanced":
            total = total + 12 * 10
            break
          case "Pro": 
            total = total + 15 * 10
            break
        }
        if (form.steps[FormStepId.ADD_ON].values.onlineService) total = total + 1 * 10
        if (form.steps[FormStepId.ADD_ON].values.largerStorage) total = total + 2 * 10
        if (form.steps[FormStepId.ADD_ON].values.customTheme) total = total + 2 * 10
        if (selectedBillingPlan === OBillingPlan.Monthly) {
          return (total + total / 5)/ 12
        }
        return total 
      }
      
export {type FormStep, FORM_STATE }