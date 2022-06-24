//Twitter show all replies
(function() {
    'use strict';
    const path_regex = /\/.+\/status\//;

    let remove_param = function(state)
    {
        let url = new URL(window.location);
        if (url.pathname.match(path_regex))
        {
            if (url.searchParams.has('s'))
            {
                url.searchParams.delete('s');
                history.replaceState(state, '', url);
                history.go();
            }
        }
    };

    const pushState = history.pushState;

    // In the event that SPA navigation brings us to a page with the target param, then intercept and replace.
    // I think that this may only happen if navigating via mobile.
    history.pushState = function()
    {
        pushState.apply(this, arguments);
        remove_param(this.state);
    };

    remove_param(history.state);

    let path_match = new RegExp('^/.+/status/\\d+$');

    let click_show_more = function()
    {
        if (!window.location.pathname.match(path_match))
        {
            return;
        }
        let nodes = document.querySelector('main[role="main"] section')?.lastChild?.firstChild?.children;
        if (!nodes)
        {
            return;
        }
        for (let node of nodes)
        {
            if (node.querySelector('[data-testid="tweet"]'))
            {
                continue;
            }
            node.querySelector('[role="button"]')?.click()
        }
    };

    setInterval(click_show_more, 500);
})();
