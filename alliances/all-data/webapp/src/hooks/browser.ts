import {
    RefObject,
    useEffect,
    useReducer,
    useState,
} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {getCurrentChannelId} from 'mattermost-webapp/packages/mattermost-redux/src/selectors/entities/common';

// If you need re-renderings based on url hash changes,
// you may need to use const {hash} = useLocation();
// This is to prevent components losing reference to the last non-empty url hash
// when useScrollIntoView cleans it after scrolling
export const useUrlHash = (): string => {
    const {hash: urlHash} = useLocation();
    let renderHash = localStorage.getItem('previousHash') || '';
    renderHash = urlHash && urlHash !== '' ? urlHash : renderHash;
    return renderHash;
};

export const useCleanUrlHash = () => {
    useEffect(() => {
        const hash = localStorage.getItem('previousHash');
        if (!hash) {
            localStorage.setItem('previousHash', '');
            return;
        }
        const element = document.querySelector(hash);
        if (!element) {
            localStorage.setItem('previousHash', '');
        }
    });
};

export const useCleanUrlHashOnChannelChange = () => {
    const channelId = useSelector(getCurrentChannelId);
    useEffect(() => {
        localStorage.setItem('previousHash', '');
    }, [channelId]);
};

type ScrollIntoViewPositions = {
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
};

export const useScrollIntoView = (hash: string, positions?: ScrollIntoViewPositions) => {
    useCleanUrlHash();
    const DOMReady = useDOMReadyById(hash);

    // When first loading the page, the element with the ID corresponding to the URL
    // hash is not mounted, so the browser fails to automatically scroll to such section.
    // To fix this, we need to manually scroll to the component
    useEffect(() => {
        const options = buildOptions(positions);
        const previousHash = localStorage.getItem('previousHash');
        if (DOMReady && (hash !== '' || previousHash)) {
            setTimeout(() => {
                let urlHash = hash;
                if (urlHash === '' && previousHash) {
                    urlHash = previousHash;
                }
                document.querySelector(urlHash)?.scrollIntoView(options);
                localStorage.setItem('previousHash', urlHash);
                window.location.hash = '';
            }, 300);
        }
    }, [hash, DOMReady]);

    useCleanUrlHashOnChannelChange();
};

// Doc: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
const buildOptions = (positions: ScrollIntoViewPositions | undefined): ScrollIntoViewOptions => {
    let options: ScrollIntoViewOptions = {
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
    };
    if (positions) {
        const {block, inline} = positions;
        options = {...options, block, inline};
    }
    return options;
};

// export const useScrollIntoViewWithCustomTime = (hash: string, time: number) => {
//     useEffect(() => {
//         if (hash !== '') {
//             setTimeout(() => {
//                 document.querySelector(hash)?.scrollIntoView({behavior: 'smooth'});
//             }, time);
//         }
//     }, [hash]);
// };

export const useOnScreen = (ref: RefObject<HTMLDivElement | null>, options?: IntersectionObserverInit): boolean => {
    const current = ref.current;
    const [isIntersecting, setIntersecting] = useState(false);

    const observer: IntersectionObserver = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting);
    }, options);

    useEffect(() => {
        if (current) {
            observer.observe(current);
        }
        return () => {
            if (current) {
                observer.disconnect();
            }
        };
    }, [current]);

    return isIntersecting;
};

// How many attempts will we do to check if the DOM has been loaded?
const MAX_PATIENCE = 1000;

// How much time will we wait between each attempt?
const DOM_CHECK_INTERVAL_MS = 500;

/**
 * Boilerplate to add a state signalling when a specific DOM node on the Mattermost side of the webapp is ready.
 *
 * @param id The ID attribute of the DOM element you want to be ready.
 * @returns A state variable that can be used to execute code when the DOM node is ready.
 */
export const useDOMReadyById = (id: string): boolean => {
    const [DOMReady, setDOMReady] = useState(false);

    // Apparently this is the best way to force an update of the component: https://legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
    const [patience, forceUpdate] = useReducer((x) => x + 1, 0);

    if (!DOMReady && id) {
        if (document.getElementById(id.replace('#', '')) === null) {
            setTimeout(() => {
                if (!DOMReady && id && patience < MAX_PATIENCE) {
                    forceUpdate();
                }
            }, DOM_CHECK_INTERVAL_MS);
        } else {
            setDOMReady(true);
        }
    }

    return DOMReady;
};
