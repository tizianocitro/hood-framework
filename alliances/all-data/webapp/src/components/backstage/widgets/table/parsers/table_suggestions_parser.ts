import {fetchTableData} from 'src/clients';
import {TOKEN_SEPARATOR} from 'src/constants';
import {formatUrlWithId, getAndRemoveOneFromArray, getWidgetTokens} from 'src/helpers';
import {Widget} from 'src/types/organization';
import {HyperlinkSuggestion, ParseOptions, SuggestionsData} from 'src/types/parser';
import {RowPair, TableData, TableRowData} from 'src/types/table';

const MAX_NUMBER_OF_TOKENS = 2;

const emptySuggestions = {suggestions: []};

export const parseTableWidgetSuggestions = async (
    hyperlinkSuggestion: HyperlinkSuggestion,
    widget: Widget,
    options?: ParseOptions,
): Promise<SuggestionsData> => {
    if (getWidgetTokens(options?.clonedTokens, widget).length >= MAX_NUMBER_OF_TOKENS) {
        return emptySuggestions;
    }

    const headerOrRowName = parseHeaderOrRowName(options?.reference as string);
    const data = await getTableData(hyperlinkSuggestion, widget);
    if (!data) {
        return emptySuggestions;
    }
    const {headers, rows} = data;
    const isHeaderNameGiven = headers.some(({name}) => name === headerOrRowName);
    if (isHeaderNameGiven) {
        const suggestions = await parseRowSuggestions(headerOrRowName, data);
        return suggestions;
    }
    const isRowNameGiven = rows.some(({name}) => name === headerOrRowName);
    if (isRowNameGiven) {
        return emptySuggestions;
    }
    const suggestions = await parseHeaderSuggestions(data);
    return suggestions;
};

const parseHeaderSuggestions = async (data: TableData): Promise<SuggestionsData> => {
    const suggestions = data.headers.
        map(({name}) => ({
            id: name,
            text: name,
        }));
    return {suggestions};
};

const parseRowSuggestions = async (
    headerName: string,
    data: TableData,
): Promise<SuggestionsData> => {
    const {headers, rows} = data;
    const index = headers.findIndex(({name}) => name === headerName);
    if (index === -1) {
        return emptySuggestions;
    }
    const suggestions = rows.map(({id, values}) => ({
        id,
        text: values[index].value,
    }));
    return {suggestions};
};

// Needed to understand if to provide all suggestions for the header or for the row
const parseHeaderOrRowName = (reference: string): string => {
    const tokens = reference.
        split(TOKEN_SEPARATOR).
        filter((token) => token !== '');
    return tokens[tokens.length - 1];
};

export const parseTableWidgetSuggestionsWithHint = async (
    hyperlinkSuggestion: HyperlinkSuggestion,
    tokens: string[],
    widget: Widget,
): Promise<SuggestionsData> => {
    if (tokens.length < 1 || tokens.length > MAX_NUMBER_OF_TOKENS) {
        return emptySuggestions;
    }
    const data = await getTableData(hyperlinkSuggestion, widget);
    if (!data) {
        return emptySuggestions;
    }
    const headerName = getAndRemoveOneFromArray(tokens, 0);
    if (!headerName) {
        return emptySuggestions;
    }
    let suggestions = await parseHeaderSuggestionsWithHint(data, headerName);
    if (tokens.length < 1) {
        return suggestions;
    }
    suggestions = await parseRowSuggestionsWithHint(tokens, data, headerName);
    return suggestions;
};

const parseHeaderSuggestionsWithHint = async (data: TableData, headerName: string): Promise<SuggestionsData> => {
    const suggestions = data.headers.
        filter(({name}) => name.includes(headerName)).
        map(({name}) => ({
            id: name,
            text: name,
        }));
    return {suggestions};
};

const parseRowSuggestionsWithHint = async (
    tokens: string[],
    data: TableData,
    headerName: string,
): Promise<SuggestionsData> => {
    const value = getAndRemoveOneFromArray(tokens, 0);
    if (!value) {
        return emptySuggestions;
    }
    const {headers, rows} = data;
    const index = headers.findIndex(({name}) => name === headerName);
    if (index === -1) {
        return emptySuggestions;
    }
    const rowPairs = findRowPairsWithHint(rows, index, value);
    if (rowPairs.length < 1) {
        return emptySuggestions;
    }
    return {suggestions: rowPairs};
};

const findRowPairsWithHint = (rows: TableRowData[], index: number, value: string): RowPair[] => {
    // Finds the row where the value at the same index of the requested column
    // is equal to the value provided
    const rowsByValue = rows.filter(({values}) => values[index].value.includes(value));
    if (!rowsByValue) {
        return [];
    }
    return rowsByValue.map(({id, values}) => ({
        id,
        text: values[index].value,
    }));
};

const getTableData = async (
    {object}: HyperlinkSuggestion,
    {url}: Widget,
): Promise<TableData | null> => {
    let widgetUrl = url as string;
    if (object) {
        widgetUrl = formatUrlWithId(widgetUrl, object.id);
    }
    const data = await fetchTableData(widgetUrl);
    if (!data) {
        return null;
    }
    return data;
};
