import {Button, Checkbox, Steps} from 'antd';
import React, {Dispatch, SetStateAction, useState} from 'react';
import styled from 'styled-components';
import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';

import {getOrganizationsNoEcosystem} from 'src/config/config';
import {ElementData} from 'src/types/scenario_wizard';

const {Step} = Steps;

type Props = {
    data: any;
    organizationsData: ElementData[];
    setWizardData: Dispatch<SetStateAction<any>>;
};

const TechnologyStep = ({data, organizationsData, setWizardData}: Props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [stepValues, setStepValues] = useState<any>(data);

    const steps = organizationsData.map((step) => {
        const organizations = getOrganizationsNoEcosystem();
        const indexes = organizations.map((organization) => {
            const organizationIds = step.options.map((option) => option.organizationId);
            return organizationIds.indexOf(organization.id);
        });
        const map: Map<number, string> = new Map<number, string>();
        for (let i = 0; i < organizations.length; i++) {
            map.set(indexes[i], organizations[i].name);
        }

        const title = step.title;
        return {
            title,
            content: (
                <CheckboxGroup
                    onChange={(values) => {
                        setStepValues({...stepValues, [title]: values});
                        setWizardData((prev: any) => ({...prev, elements: {...stepValues, [title]: values}}));
                    }}
                    value={stepValues[title]}
                >
                    {step.options.map((option, index) => (
                        <>
                            {map.has(index) && <Text>{map.get(index)}</Text>}
                            <OptionsCheckbox
                                key={`${option.name}-${index}`}
                                value={option}
                            >
                                <div>{option.name}</div>
                                <OptionDescription>{option.description}</OptionDescription>
                            </OptionsCheckbox>
                        </>))}
                </CheckboxGroup>
            ),
        };
    });

    return (
        <Container>
            <OptionSteps
                current={currentStep}
                progressDot={true}
                size='small'
            >
                {steps.map((item) => (
                    <Step
                        key={item.title}
                        title={item.title}
                    />))}
            </OptionSteps>
            <StepsBody>
                {steps[currentStep].content}
            </StepsBody>
            <div style={{width: '100%'}}>
                <Button
                    style={{width: '48%', margin: '2%'}}
                    key='back'
                    type='primary'
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 0}
                    icon={<ArrowLeftOutlined/>}
                />
                <Button
                    style={{width: '48%'}}
                    key='next'
                    type='primary'
                    onClick={() => setCurrentStep(organizationsData.length - 1 === currentStep ? currentStep : currentStep + 1)}
                    disabled={currentStep === steps.length - 1}
                    icon={<ArrowRightOutlined/>}
                />
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`;

const StepsBody = styled.div`
    /* This is to enable scrolling only on steps
    max-height: 300px;
    overflow-y: auto;
    */
`;

const OptionSteps = styled(Steps)`
    margin: 12px 0 12px 0;
`;

const CheckboxGroup = styled(Checkbox.Group)`
    display: flex;
    flex-direction: column;
`;

const OptionsCheckbox = styled(Checkbox)`
    margin-left: 8px;
    margin-top: 2px;
    margin-bottom: 2px;
    border-bottom: 1px solid rgba(var(--center-channel-color-rgb), 0.08);
`;

const OptionDescription = styled.div`
    font-size: 12px;
    color: rgba(var(--center-channel-color-rgb), 0.72);
    margin-top: 2px;
`;

const Text = styled.div`
    text-align: left;
    font-size: 16px;
    font-weight: bolder;
`;

export default TechnologyStep;
