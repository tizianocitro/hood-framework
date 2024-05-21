import React, {useContext} from 'react';
import styled from 'styled-components';

import {AnchorLinkTitle, Header} from 'src/components/backstage/widgets/shared';
import {IsEcosystemRhsContext} from 'src/components/rhs/rhs_widgets';
import {FullUrlContext} from 'src/components/rhs/rhs';
import {buildQuery} from 'src/hooks';
import {formatName} from 'src/helpers';
import {AccordionData} from 'src/types/accordion';
import ItemsList from 'src/components/backstage/widgets/list/list';

type Props = {
    data: AccordionData;
    name: string;
    parentId: string;
    sectionId: string;
};

const AssignmentPart = ({
    data,
    name = '',
    parentId,
    sectionId,
}: Props) => {
    const isEcosystemRhs = useContext(IsEcosystemRhsContext);
    const fullUrl = useContext(FullUrlContext);

    const id = `${formatName(name)}-${sectionId}-${parentId}-widget`;
    const ecosystemQuery = isEcosystemRhs ? '' : buildQuery(parentId, sectionId);

    const descriptionItems = data?.descriptionParts?.map((part: string, index: number) => ({
        id: `desc-${index}`,
        text: part,
    })) ?? [];
    const instructionsItems = data?.instructions?.map((part: string, index: number) => ({
        id: `instruction-${index}`,
        text: part,
    })) ?? [];
    const registrationAccessItems = data?.registrationAccessProcess?.map((part: string, index: number) => ({
        id: `registration-access-${index}`,
        text: part,
    })) ?? [];
    const registrationItems = data?.registration?.map((part: string, index: number) => ({
        id: `registration-${index}`,
        text: part,
    })) ?? [];
    const attackItems = data?.attackParts?.map((part: string, index: number) => ({
        id: `attack-${index}`,
        text: part,
    })) ?? [];
    const questionsItems = data?.questions?.map((part: string, index: number) => ({
        id: `question-${index}`,
        text: part,
    })) ?? [];
    const openQuestionsItems = data?.openQuestions?.map((part: string, index: number) => ({
        id: `open-question-${index}`,
        text: part,
    })) ?? [];
    const educationItems = data?.educationMaterial?.map((part: string, index: number) => ({
        id: `education-${index}`,
        text: part,
    })) ?? [];

    return (
        <Container
            id={id}
            data-testid={id}
        >
            <Header>
                <AnchorLinkTitle
                    fullUrl={fullUrl}
                    id={id}
                    query={ecosystemQuery}
                    text={name}
                    title={name}
                />
            </Header>
            {(descriptionItems && descriptionItems.length > 0) &&
                <ItemsList
                    data={{items: descriptionItems ?? []}}
                    name={data?.descriptionName ?? ''}
                    sectionId={sectionId}
                    parentId={parentId}
                />}
            {(registrationAccessItems && registrationAccessItems.length > 0) &&
                <ItemsList
                    data={{items: registrationAccessItems ?? []}}
                    name={data?.registrationAccessProcessName ?? ''}
                    sectionId={sectionId}
                    parentId={parentId}
                />}
            {(registrationItems && registrationItems.length > 0) &&
                <ItemsList
                    data={{items: registrationItems ?? []}}
                    name={data?.registrationName ?? ''}
                    sectionId={sectionId}
                    parentId={parentId}
                />}
            {(attackItems && attackItems.length > 0) &&
                <ItemsList
                    data={{items: attackItems ?? []}}
                    name={data?.attackName ?? ''}
                    sectionId={sectionId}
                    parentId={parentId}
                />}
            {(instructionsItems && instructionsItems.length > 0) &&
                <ItemsList
                    data={{items: instructionsItems ?? []}}
                    name={data?.instructionName ?? ''}
                    sectionId={sectionId}
                    parentId={parentId}
                />}
            {(questionsItems && questionsItems.length > 0) &&
                <ItemsList
                    data={{items: questionsItems ?? []}}
                    name={data?.questionName ?? ''}
                    sectionId={sectionId}
                    parentId={parentId}
                />}
            {(openQuestionsItems && openQuestionsItems.length > 0) &&
                <ItemsList
                    data={{items: openQuestionsItems ?? []}}
                    name={data?.openQuestionName ?? ''}
                    sectionId={sectionId}
                    parentId={parentId}
                />}
            {(educationItems && educationItems.length > 0) &&
                <ItemsList
                    data={{items: educationItems ?? []}}
                    name={data?.educationName ?? ''}
                    sectionId={sectionId}
                    parentId={parentId}
                />}
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`;

export default AssignmentPart;
