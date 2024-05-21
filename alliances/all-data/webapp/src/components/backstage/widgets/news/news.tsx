import React, {
    Dispatch,
    FC,
    SetStateAction,
    useContext,
} from 'react';
import styled from 'styled-components';
import {Alert, Input} from 'antd';
import {SearchProps} from 'antd/es/input';
import {useIntl} from 'react-intl';

// import {FileSearchOutlined} from '@ant-design/icons';

import {AnchorLinkTitle, Header} from 'src/components/backstage/widgets/shared';
import {IsEcosystemRhsContext} from 'src/components/rhs/rhs_widgets';
import {IsRhsContext} from 'src/components/backstage/sections_widgets/sections_widgets_container';
import {FullUrlContext} from 'src/components/rhs/rhs';
import {buildQuery} from 'src/hooks';
import {formatName} from 'src/helpers';
import {NewsError, NewsPostData, NewsQuery} from 'src/types/news';

import NewsPosts from './news_posts';

const {Search} = Input;

type Props = {
    data: NewsPostData | NewsError;
    name: string;
    query: NewsQuery;
    setQuery: Dispatch<SetStateAction<NewsQuery>>;
    parentId: string;
    sectionId: string;
};

const calcTotalItems = (data: NewsPostData): number => {
    if (!data.totalCount) {
        return 1;
    }
    return data.totalCount === 0 ? 1 : data.totalCount;
};

const News: FC<Props> = ({
    data,
    name = '',
    query,
    setQuery,
    parentId,
    sectionId,
}) => {
    const {formatMessage} = useIntl();

    const isEcosystemRhs = useContext(IsEcosystemRhsContext);
    const isRhs = useContext(IsRhsContext);
    const fullUrl = useContext(FullUrlContext);

    const id = `${formatName(name)}-${sectionId}-${parentId}-widget`;
    const ecosystemQuery = isEcosystemRhs ? '' : buildQuery(parentId, sectionId);

    const onSearch: SearchProps['onSearch'] = (
        value: string,
        event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
    ) => {
        setQuery({...query, search: value});
    };

    const hasErrorOccurred = 'message' in data;
    const Body = hasErrorOccurred ?
        (
            <Alert
                message={'An error occurred when requesting your news.\nPlease try again or report the error.'}
                type='warning'
                style={{marginTop: '24px'}}
            />
        ) :
        (
            <NewsPosts
                data={data.items}
                name={name}
                sectionId={sectionId}
                parentId={parentId}
                perPage={query.limit ? parseInt(query.limit, 10) : 10}
                total={calcTotalItems(data)}
                postOptions={{
                    noHyperlinking: true,
                    noActions: true,
                }}
                setQuery={setQuery}
            />
        );

    return (
        <Container
            id={id}
            data-testid={id}
        >
            <Header>
                <AnchorLinkTitle
                    fullUrl={fullUrl}
                    id={id}
                    query={isEcosystemRhs ? '' : ecosystemQuery}
                    text={name}
                    title={name}
                />
            </Header>

            {/* width: isRhs ? 'calc(100% - 32px)' : 'calc(50% - 48px)', */}
            <HorizontalContainer>
                <Search
                    placeholder={formatMessage({defaultMessage: 'Search'})}
                    allowClear={true}
                    enterButton={true}
                    size='middle'
                    onSearch={onSearch}
                    style={{
                        width: isRhs ? '90%' : 'calc(50% - 48px)',
                    }}
                />

                {/* <Tooltip title={formatMessage({defaultMessage: 'Advanced Search'})}>
                    <Button
                        type='primary'
                        icon={<FileSearchOutlined/>}
                        style={{
                            width: '32px',
                            height: '32px',
                            fontSize: '16px',
                            marginLeft: '8px',
                        }}
                    />
                </Tooltip> */}
            </HorizontalContainer>
            {Body}
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`;

export const HorizontalContainer = styled.div<{disable?: boolean}>`
    display: flex;
    flex-direction: ${({disable}) => (disable ? 'column' : 'row')};
    justify-content: 'space-between';
`;

export default News;
