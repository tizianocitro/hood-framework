import React, {useContext, useMemo} from 'react';
import {Timeline} from 'antd';
import styled from 'styled-components';

import {
    buildIdForUrlHashReference,
    buildQuery,
    isReferencedByUrlHash,
    useUrlHash,
} from 'src/hooks';
import {formatName} from 'src/helpers';
import {TimelineData, TimelineDataItem} from 'src/types/timeline';
import {IsEcosystemRhsContext} from 'src/components/rhs/rhs_widgets';
import {FullUrlContext} from 'src/components/rhs/rhs';
import {AnchorLinkTitle, Header} from 'src/components/backstage/widgets/shared';

import {HyperlinkPathContext} from 'src/components/rhs/rhs_shared';

import {CopyLinkTimelineItem, CopyPosition} from './timeline_item';

type Props = {
    data: TimelineData;
    name: string;
    parentId: string;
    sectionId: string;
};

const ItemsTimeline = ({
    data,
    name = 'default',
    parentId,
    sectionId,
}: Props) => {
    const isEcosystemRhs = useContext(IsEcosystemRhsContext);
    const fullUrl = useContext(FullUrlContext);
    const urlHash = useUrlHash();
    const hyperlinkPathContext = useContext(HyperlinkPathContext);
    const hyperlinkPath = `${hyperlinkPathContext}.${name}`;

    const query = buildQuery(parentId, sectionId);
    const id = `${formatName(name)}-${sectionId}-${parentId}-widget`;

    const items = useMemo<TimelineDataItem[]>(() => (data?.items?.map((item) => {
        const itemId = buildIdForUrlHashReference('timeline-item', item.id);
        return {
            color: isReferencedByUrlHash(urlHash, itemId) ? 'rgb(244, 180, 0)' : 'blue',
            label: (
                <CopyLinkTimelineItem
                    itemId={itemId}
                    item={item}
                    isLabel={true}
                    query={isEcosystemRhs ? '' : query}
                    copyPosition={CopyPosition.Left}
                    style={{display: 'inline-block', iconMarginLeft: '0px'}}
                    hyperlinkPath={hyperlinkPath}
                />
            ),
            children: (
                <CopyLinkTimelineItem
                    itemId={itemId}
                    item={item}
                    query={isEcosystemRhs ? '' : query}
                    style={{iconMarginRight: '0px'}}
                    hyperlinkPath={hyperlinkPath}
                />
            ),
        };
    })), [data.items, urlHash, hyperlinkPath]);

    return (
        <Container
            id={id}
            data-testid={id}
        >
            <Header>
                <AnchorLinkTitle
                    fullUrl={fullUrl}
                    id={id}
                    query={isEcosystemRhs ? '' : query}
                    text={name}
                    title={name}
                />
            </Header>
            <Timeline
                mode='left'
                items={items}
            />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`;

export default ItemsTimeline;
