//Remove Facebook Advertisment
const debugSpan = (element) => {
    const style = window.getComputedStyle(element);
    return {
        element,
        text: element.innerText,
        top: style.top,
        bottom: style.bottom,
        position: style.position,
        display: style.display,
        order: style.order,
    }
}

const flexContains = async (element, search = 'Sponsored') => {
    const spans = element?.querySelectorAll('span');
    for (const span of spans) {
        //console.log(span)
        // try simple text first (works for suggested content)
        if (span.innerText.includes(search)) {
            return true;
        }
        // try flex search
        if (span.style.display === 'flex') {
            const spans = Array.from(span.children).map(s => debugSpan(s)).filter(s => {
                //console.log({
                //    top: s.top,
                //   bottom: s.bottom,
                //    isVisable: s.top === 'auto' || s.top === '0px' || s.bottom === 'auto' || s.bottom === '0px'
                //});
                return s.top === 'auto' || s.top === '0px' || s.bottom === 'auto' || s.bottom === '0px'
            });
            const ordered = spans.sort((a,b) => parseInt(a.order) < parseInt(b.order) ? -1 : 1)
            const characters = ordered.map(t => t.text);

            //console.log({
            //    ordered,
            //    characters: characters.join('')
            //});

            let match = Array.from(search);
            for (const character of characters) {
                if (match[0] === character) {
                    match.shift();
                }
                if (match.length < 1) {
                    return true;
                }
            }
        }
    }
    return false;
}

const removeFeedItem = (element) => {
    const loc = window.location.href;
    //element.style.border = '1px solid red';
    //return;
    if (loc.includes('watch')) {
        element.innerHTML = `
        <div style="text-align: center; color: red; padding: 1.5em; border: 1px solid red">
                  Sponsored content was removed<br/>
                  <a href="${supportLink}" target="_blank">
                        support me?
                  </a>
                  <br/>
                  <a href="${feedbackLink}" target="_blank">
                        leave feedback?
                  </a>
        </div>`
    } else {
        element.innerHTML = '';
    }
}

(function() {
    'use strict';
    window.addEventListener('playing', function(event) {
        event.stopImmediatePropagation();
    }, true);
    window.addEventListener('ended', function(event) {
        event.stopImmediatePropagation();
    }, true);
    setInterval(() => {
        const loc = window.location.href;
        var feed = document.querySelectorAll('[data-pagelet^="FeedUnit_"]:not(.detected)');
        var sponsored_aside = document.querySelector('[role="complementary"] > div > div > div > div > div:first-child:not(.detected)');
        if (loc.includes('watch')) {
            feed = document.querySelectorAll('#watch_feed > div > div:last-child > div > div > div > div:not(.detected)');
        } else if (feed.length < 1) {
            feed = document.querySelectorAll('[role="feed"] > div:not(.detected)');
        }
        const loadingIndicator = document.querySelectorAll('[data-instancekey^="id-vpuid-"]:not(.detected)');
        for(const i of loadingIndicator) {
            i.classList.add('detected');
            i.querySelector("div").querySelector("div").setAttribute('hidden', 'hidden');
        };
        if (sponsored_aside) {
            // console.log(sponsored_aside);
            flexContains(sponsored_aside, 'Sponsored').then(b => b ? removeFeedItem(sponsored_aside) : '');
        }
        for(const item of feed) {
            item.classList.add('detected');
            flexContains(item, 'Sponsored').then(b => b ? removeFeedItem(item) : '');
            flexContains(item, 'Suggested for you').then(b => b ? removeFeedItem(item) : '');
        }
    }, 500);
})();