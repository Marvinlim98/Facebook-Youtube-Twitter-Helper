//Youtube Download Video
(function() {
    'use strict';

    const textStyle = `
.download-button {
    background-color: var(--yt-spec-10-percent-layer);
    color: var(--yt-spec-text-secondary);
    border-radius: 2px;
    padding: var(--yt-button-padding);
    margin: auto var(--ytd-subscribe-button-margin, 4px);
    white-space: nowrap;
    font-size: var(--ytd-tab-system_-_font-size);
    font-weight: var(--ytd-tab-system_-_font-weight);
    letter-spacing: var(--ytd-tab-system_-_letter-spacing);
    text-transform: var(--ytd-tab-system_-_text-transform);
    display: flex;
    flex-direction: row;
    cursor: pointer;
}
.download-text {
    --yt-formatted-string-deemphasize-color: var(--yt-spec-text-secondary);
    --yt-formatted-string-deemphasize_-_margin-left: 4px;
    --yt-formatted-string-deemphasize_-_display: initial;
}`;
    let currentUrl = document.location.href;
    let isPlaylist = currentUrl.includes("playlist");

    css();

    init(10);

    locationChange();

    function init(times) {
        for (let i = 0; i < times; i++) {
            setTimeout(delButton, 500 * i);
            setTimeout(findPanel, 500 * i);
        }
    }

    function delButton() {
        if (!isPlaylist) return;
        document.querySelectorAll("#analytics-button.download-panel").forEach(panel => {
            panel.classList.remove("download-panel");
            panel.querySelector(".download-button").remove();
        });
    }

    function findPanel() {
        if (isPlaylist) return;
        document.querySelectorAll("#analytics-button:not(.download-panel)").forEach(panel => {
            panel.classList.add("download-panel");
            addButton(panel);
        });
    }

    function addButton(panel) {
        // button
        const button = document.createElement("div");
        button.classList.add("download-button");
        button.addEventListener("click", onClick);
        // text
        const text = document.createElement("span");
        text.classList.add("download-text");
        text.innerHTML = getLocalization();
        // append
        panel.insertBefore(button, panel.firstElementChild);
        button.appendChild(text);
    }

    function onClick() {
        const url = document.location.href.replace("youtube", "youtubepp");
        window.open(url);
    }

    function getLocalization() {
        switch (document.querySelector("html").lang) {
            case "zh-Hant-TW":
                return "下載";
            case "zh-Hant-HK":
                return "下載";
            case "zh-Hans-CN":
                return "下载";
            case "ja-JP":
                return "ダウンロード";
            case "ko-KR":
                return "다운로드";
            case "ru-RU":
                return "Скачать вниз";
            default:
                return "DOWNLOAD";
        }
    }

    function css() {
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = textStyle;
        document.head.appendChild(style);
    }

    function locationChange() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(() => {
                if (currentUrl !== document.location.href) {
                    currentUrl = document.location.href;
                    isPlaylist = currentUrl.includes("playlist");
                    init(10);
                }
            });
        });
        const target = document.body;
        const config = { childList: true, subtree: true };
        observer.observe(target, config);
    }

})();


//Youtube Remove Advertisment
let ogVolume=1;
let pbRate = 1;

setInterval(function(){
    if(document.getElementsByClassName("video-stream html5-main-video")[0]!==undefined){
        let ad = document.getElementsByClassName("video-ads ytp-ad-module")[0];
        let vid = document.getElementsByClassName("video-stream html5-main-video")[0];
        if(ad==undefined){
            pbRate = vid.playbackRate;
        }
        let closeAble = document.getElementsByClassName("ytp-ad-overlay-close-button");
        for(let i=0;i<closeAble.length;i++){
            closeAble[i].click();
            //console.log("ad banner closed!")
        }
        if(document.getElementsByClassName("style-scope ytd-watch-next-secondary-results-renderer sparkles-light-cta GoogleActiveViewElement")[0]!==undefined){
            let sideAd=document.getElementsByClassName("style-scope ytd-watch-next-secondary-results-renderer sparkles-light-cta GoogleActiveViewElement")[0];
            sideAd.style.display="none";
            //console.log("side ad removed!")
        }
        if(document.getElementsByClassName("style-scope ytd-item-section-renderer sparkles-light-cta")[0]!==undefined){
            let sideAd_ = document.getElementsByClassName("style-scope ytd-item-section-renderer sparkles-light-cta")[0];
            sideAd_.style.display="none";
            //console.log("side ad removed!")
        }
        if(document.getElementsByClassName("ytp-ad-text ytp-ad-skip-button-text")[0]!==undefined){
            let skipBtn=document.getElementsByClassName("ytp-ad-text ytp-ad-skip-button-text")[0];
            skipBtn.click();
            //console.log("skippable ad skipped!")
        }
        if(document.getElementsByClassName("ytp-ad-message-container")[0]!==undefined){
            let incomingAd=document.getElementsByClassName("ytp-ad-message-container")[0];
            incomingAd.style.display="none";
            //console.log("removed incoming ad alert!")
        }
        if(document.getElementsByClassName("style-scope ytd-companion-slot-renderer")[0]!==undefined){
            document.getElementsByClassName("style-scope ytd-companion-slot-renderer")[0].remove();
            //console.log("side ad removed!")
        }
        if(ad!==undefined){
            if(ad.children.length>0){
                if(document.getElementsByClassName("ytp-ad-text ytp-ad-preview-text")[0]!==undefined){
                    vid.playbackRate=16;
                    //console.log("Incrementally skipped unskippable ad!")
                }
            }
        }
    }
},100)


