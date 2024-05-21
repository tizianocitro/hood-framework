import {SystemConfig} from 'src/types/config';
import {
    EnvironmentConfig,
    Organization,
    PlatformConfig,
    Section,
    ShowOptionsConfig,
} from 'src/types/organization';

export const DEFAULT_PLATFORM_CONFIG_PATH = '/configs/platform';
export const DEFAULT_SYSTEM_CONFIG_PATH = '/configs/system_console';
export const PLATFORM_CONFIG_CACHE_NAME = 'platform-config-cache';

export const END_SYMBOL = ')';
export const START_SYMBOL = '(';
const PATTERN_SYMBOL = ':symbol';

// Match text in form of PATTERN_SYMBOL(...) or PATTERN_SYMBOL(...).OPTION
const PATTERN_PLACEHOLDER = `${PATTERN_SYMBOL}\\(.+?\\)(?:\\.\\S+)?`;

// Match text after PATTERN_SYMBOL( up until the ), if present
const SUGGESTION_PATTERN_PLACEHOLDER = `${PATTERN_SYMBOL}\\((?!.*\\)).*$`;

let platformConfig: PlatformConfig = {
    environmentConfig: {},
    organizations: [],
};
let systemConfig: SystemConfig = {
    ecosystemGraph: true,
    ecosystemGraphAutoSave: true,
    ecosystemGraphAutoSaveDelay: 5,
    ecosystemGraphRSB: false,
};

let symbol = '';
let pattern: RegExp | null = null;
let suggestionPattern: RegExp | null = null;

export const getPlatformConfig = (): PlatformConfig => {
    return platformConfig;
};

export const setPlatformConfig = (config: PlatformConfig) => {
    if (!config) {
        return;
    }
    platformConfig = config;
};

export const getSystemConfig = (): SystemConfig => {
    return systemConfig;
};

export const setSystemConfig = (config: SystemConfig) => {
    if (!config) {
        return;
    }
    systemConfig = config;
};

export const getEnvironmentConfig = (): EnvironmentConfig => {
    return getPlatformConfig().environmentConfig;
};

export const getShowOptionsConfig = (): ShowOptionsConfig => {
    return getPlatformConfig().environmentConfig.showOptionsConfig || {};
};

export const getOrganizations = (): Organization[] => {
    return getPlatformConfig().organizations;
};

export const getOrganizationsNoEcosystem = (): Organization[] => {
    return getOrganizations().filter((o) => !o.isEcosystem);
};

export const getEcosystem = (): Organization => {
    return getOrganizations().filter((o) => o.isEcosystem)[0];
};

export const getOrganizationById = (id: string): Organization => {
    return getOrganizations().filter((o) => o.id === id)[0];
};

export const getOrganizationByName = (name: string): Organization => {
    return getOrganizations().filter((o) => o.name === name)[0];
};

export const getOrganizationBySectionName = (name: string): Organization => {
    return getOrganizations().filter((o) => o.sections.some((s) => s.name === name))[0];
};

export const getOrganizationBySectionId = (id: string): Organization => {
    return getOrganizations().filter((o) => o.sections.some((s) => s.id === id))[0];
};

export const getSectionById = (id: string): Section => {
    return getOrganizations().
        map((o) => o.sections).
        flat().
        filter((s: Section) => s.id === id)[0];
};

export const getStartSymbol = (): string => {
    checkAndSetSymbol();
    return `${symbol}${START_SYMBOL}`;
};

export const getPattern = (): RegExp => {
    if (!pattern) {
        checkAndSetSymbol();
        pattern = new RegExp(PATTERN_PLACEHOLDER.replace(PATTERN_SYMBOL, symbol), 'g');
    }
    return pattern;
};

export const getSuggestionPattern = (): RegExp => {
    if (!suggestionPattern) {
        checkAndSetSymbol();
        suggestionPattern = new RegExp(SUGGESTION_PATTERN_PLACEHOLDER.replace(PATTERN_SYMBOL, symbol), 'g');
    }
    return suggestionPattern;
};

export const getSymbol = (): string => {
    return symbol;
};

// TODO: Read symbol from configuration
const checkAndSetSymbol = () => {
    if (symbol === '') {
        symbol = '&';
    }
};
