import React, {useContext} from 'react';
import {List} from 'antd';
import styled from 'styled-components';
import {useRouteMatch} from 'react-router-dom';

import {AnchorLinkTitle, Header} from 'src/components/backstage/widgets/shared';
import {IsEcosystemRhsContext} from 'src/components/rhs/rhs_widgets';
import {FullUrlContext} from 'src/components/rhs/rhs';
import {
    buildQuery,
    buildTo,
    buildToForCopy,
    isReferencedByUrlHash,
    useUrlHash,
} from 'src/hooks';
import {formatName} from 'src/helpers';
import {ListData} from 'src/types/list';
import {CopyLinkMenuItem} from 'src/components/commons/copy_link';
import FormattedMarkdown from 'src/components/commons/formatted_markdown';
import {HyperlinkPathContext} from 'src/components/rhs/rhs_shared';

const {Item} = List;
const {Meta} = Item;
const MAX_TEXT_LENGTH = 94;

type Props = {
    data: ListData;
    name: string;
    parentId: string;
    sectionId: string;
    Avatar?: JSX.Element;
    flexGrow?: number;
    marginRight?: string;
};

const ItemsList = ({
    data,
    name = 'default',
    parentId,
    sectionId,
    Avatar,
    flexGrow = 1,
    marginRight = '0',
}: Props) => {
    const isEcosystemRhs = useContext(IsEcosystemRhsContext);
    const fullUrl = useContext(FullUrlContext);
    const {url} = useRouteMatch();
    const urlHash = useUrlHash();
    const hyperlinkPathContext = useContext(HyperlinkPathContext);
    const hyperlinkPath = `${hyperlinkPathContext}.${name}`;

    const {items} = data;
    const id = `${formatName(name)}-${sectionId}-${parentId}-widget`;
    const ecosystemQuery = isEcosystemRhs ? '' : buildQuery(parentId, sectionId);
    const ellipsedText = (text: string) => (text.length < MAX_TEXT_LENGTH ? text : `${text.substring(0, MAX_TEXT_LENGTH).trim()}...`);

    return (
        <Container
            id={id}
            data-testid={id}
        >
            <ListHeader
                flexGrow={flexGrow}
                marginRight={marginRight}
            >
                <AnchorLinkTitle
                    fullUrl={fullUrl}
                    id={id}
                    query={ecosystemQuery}
                    text={name}
                    title={name}
                />
            </ListHeader>
            <List
                itemLayout='horizontal'
                size='small'
                dataSource={items}
                renderItem={(item) => {
                    const itemId = `list-item-${item.id}`;
                    return (
                        <Item
                            id={itemId}
                            actions={[
                                <CopyLinkMenuItem
                                    key={`copy-list-item-${item.id}`}
                                    path={buildToForCopy(buildTo(fullUrl, itemId, ecosystemQuery, url))}
                                    showPlaceholder={false}
                                    svgMarginRight={'0px'}
                                    text={`${hyperlinkPath}.${ellipsedText(item.text)}`}
                                />,
                            ]}
                            style={{
                                backgroundColor: isReferencedByUrlHash(urlHash, itemId) ? 'rgb(244, 180, 0)' : 'var(--center-channel-bg)',
                            }}
                        >
                            {Avatar ? (
                                <Meta
                                    avatar={Avatar}
                                    title={<FormattedMarkdown value={item.text}/>}
                                />) : <Meta title={<FormattedMarkdown value={item.text}/>}/>}
                        </Item>
                    );
                }}
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

const ListHeader = styled(Header)<{flexGrow: number; marginRight: string}>`
    box-shadow: inset 0px -1px 0px rgba(var(--center-channel-color-rgb), 0.16);
    flex-grow: ${(props) => props.flexGrow};
    margin-right: ${(props) => props.marginRight};
`;

export default ItemsList;
