import React, {useContext, useReducer} from 'react';
import styled from 'styled-components';
import {FormattedMessage, useIntl} from 'react-intl';

import {addChannelErrorMessageAction, nameErrorMessageAction, selectErrorMessageAction} from 'src/actions';
import {
    setAddChannelErrorMessage,
    setChannelCreation,
    setNameErrorMessage,
    setSelectErrorMessage,
} from 'src/reducer';
import ChannelsList from 'src/components/backstage/widgets/channels/channels_list/channels_list';
import {CreateAChannel} from 'src/components/backstage/widgets/channels/channel_access';
import Header from 'src/components/commons/header';
import {Section} from 'src/components/backstage/widgets/channels/styles';
import {useChannelsList, useUserProps} from 'src/hooks';

import {ORGANIZATION_ID_ALL} from 'src/types/organization';

import {IsEcosystemContext} from 'src/components/backstage/organizations/ecosystem/ecosystem_details';

import {CreateChannel} from './controls';

type Props = {
    parentId: string;
    sectionId: string;
    teamId: string;
    userId: string;
    organizationId: string,
};

const ChannelBox = ({parentId, sectionId, teamId, userId, organizationId}: Props) => {
    const {formatMessage} = useIntl();
    const channels = useChannelsList({section_id: sectionId, parent_id: parentId});
    const [userProps, _setUserProps] = useUserProps();
    const isEcosystem = useContext(IsEcosystemContext);

    const [addChannelErrorMessage, dispacthAddChannelErrorMessage] = useReducer(setAddChannelErrorMessage, '');
    const [selectErrorMessage, dispatchSelectErrorMessage] = useReducer(setSelectErrorMessage, '');
    const [nameErrorMessage, dispatchNameErrorMessage] = useReducer(setNameErrorMessage, '');

    const defaultChannelCreation = {
        teamId: '',
        channelId: '',
        channelMode: 'create_new_channel', // {'create_new_channel', 'link_existing_channel'}
        channelName: '',
        createPublicChannel: false,
    };
    const [channelCreation, dispatchChannelCreation] = useReducer(setChannelCreation, defaultChannelCreation);

    const cleanErrorMessages = () => {
        dispacthAddChannelErrorMessage(addChannelErrorMessageAction(''));
        dispatchSelectErrorMessage(selectErrorMessageAction(''));
        dispatchNameErrorMessage(nameErrorMessageAction(''));
    };

    return (
        (userProps && (userProps.orgId === organizationId || userProps.orgId === ORGANIZATION_ID_ALL || isEcosystem)) ? <>
            <StyledSection>
                <Setting id={'channel-action'}>
                    <CreateAChannel
                        channelCreation={channelCreation}
                        selectErrorMessage={selectErrorMessage}
                        nameErrorMessage={nameErrorMessage}
                        dispatchChannelCreation={dispatchChannelCreation}
                        cleanErrorMessages={cleanErrorMessages}
                    />
                </Setting>
                <CreateChannel
                    channelCreation={channelCreation}
                    parentId={parentId}
                    sectionId={sectionId}
                    teamId={teamId}
                    userId={userId}
                    organizationId={organizationId}
                    addChannelErrorMessage={addChannelErrorMessage}
                    dispacthAddChannelErrorMessage={dispacthAddChannelErrorMessage}
                    dispatchSelectErrorMessage={dispatchSelectErrorMessage}
                    dispatchNameErrorMessage={dispatchNameErrorMessage}
                />
            </StyledSection>
            <ChannelListContainer>
                <Header
                    data-testid='titleAddedChannels'
                    level={5}
                    heading={formatMessage({defaultMessage: 'Related Channels'})}
                    subtitle={formatMessage({defaultMessage: 'All the related channels will show here'})}
                    css={`
                        border-bottom: 1px solid rgba(var(--center-channel-color-rgb), 0.16);
                    `}
                />
                <ChannelsList channels={channels}/>
            </ChannelListContainer>
        </> : <div className='text-center pt-4'>
            <FormattedMessage defaultMessage='You cannot view the channels information for this organization.'/>
        </div>
    );
};

const StyledSection = styled(Section)`
    border: 1px solid rgba(var(--center-channel-color-rgb), 0.08);
    padding: 2rem;
    padding-bottom: 0;
    margin: 0;
    margin-bottom: 20px;
    border-radius: 8px;
`;

const Setting = styled.div`
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ChannelListContainer = styled.div`
    flex: 1 1 auto;
`;

export default ChannelBox;
