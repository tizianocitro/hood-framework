export interface TableData {
    headers: TableHeaderData[];
    rows: TableRowData[];
    caption: string;
}

export interface TableHeaderData {
    dim: 1 | 2 | 3 | 4 | 6 | 8 | 12;
    name: string;
}

export interface TableRowData {
    id: string;
    name: string;
    values: TableValue[];
}

interface TableValue {
    dim: 1 | 2 | 3 | 4 | 6 | 8 | 12;
    value: string;
}

export type RowPair = Pick<TableRowData, 'id'> & {text: string};
