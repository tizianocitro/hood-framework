import {ChannelCreation} from './types/channels';
import {pluginId} from './manifest';

const createActionType = (suffix: string): string => {
    return `${pluginId}${suffix}`;
};

export const CHANNEL_CREATION: string = createActionType('_channel_creation');
export const SET_ADD_CHANNEL_ERROR_MESSAGE: string = createActionType('_set_add_channel_error_message');
export const SET_NAME_ERROR_MESSAGE: string = createActionType('_set_name_error_message');
export const SET_SELECT_ERROR_MESSAGE: string = createActionType('_set_select_error_message');
export const EXPORT_CHANNEL: string = createActionType('_export_channel');
export const EDIT_ECOSYSTEM_GRAPH: string = createActionType('_edit_ecosystem_graph');

export interface SetChannelCreationAction {
    type: string;
    channelCreation: ChannelCreation;
}

export interface SetAddChannelErrorMessageAction {
    type: string;
    addChannelErrorMessage: string;
}

export interface SetNameErrorMessageAction {
    type: string;
    nameErrorMessage: string;
}

export interface SetSelectErrorMessageAction {
    type: string;
    selectErrorMessage: string;
}

export interface SetExportAction {
    type: string;
    channelId: string;
}

export interface EditEcosystemGraphAction {
    type: string;
    visible: boolean;
}
