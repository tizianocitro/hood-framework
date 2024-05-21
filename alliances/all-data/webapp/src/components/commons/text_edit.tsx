import React from 'react';
import styled, {css} from 'styled-components';

type TextEditProps = {
    value: string;
    children: React.ReactNode;
    placeholder?: string;
    className?: string;
    noBorder?: boolean;
    disabled?: boolean;
    editStyles?: ReturnType<typeof css>;
};

const TextEdit = (props: TextEditProps) => {
    return (
        <Container className={props.className}>
            {props.children}
        </Container>
    );
};

const HoverMenuContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 8px;
    position: absolute;
    height: 32px;
    right: 2px;
    top: 8px;
    z-index: 1;
`;

const commonTextStyle = css`
    display: block;
    align-items: center;
    border-radius: var(--markdown-textbox-radius, 4px);
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: rgba(var(--center-channel-color-rgb), 0.72);
    padding: var(--markdown-textbox-padding, 12px 30px 12px 16px);

    :hover {
        cursor: text;
    }

    p {
        white-space: pre-wrap;
    }
`;

// Put before ${HoverMenuContainer}
// ${CancelSaveContainer} {
//      padding: 8px 0;
// }
const Container = styled.div`
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: var(--markdown-textbox-radius, 4px);
    padding-bottom: 1%;

    ${HoverMenuContainer} {
        opacity: 0
    }
    &:hover,
    &:focus-within {
        ${HoverMenuContainer} {
            opacity: 1;
        }
    }
`;

export const RenderedText = styled.span`
    ${commonTextStyle}

    p:last-child {
        margin-bottom: 0;
    }
`;

export default styled(TextEdit)`
    ${({editStyles}) => editStyles};
`;
