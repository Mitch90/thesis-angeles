let filters = {
    "investigative": {
        "label": "Investigative",
        "checked": true
    },
    "memory-doc": {
        "label": "Memory and documentation",
        "checked": true
    },
    "monitoring": {
        "label": "Monitoring",
        "checked": true
    },
    "report": {
        "label": "Report",
        "checked": true
    },
    "social-movement": {
        "label": "Social movement cohesion",
        "checked": true
    },
    "human-rights": {
        "label": "Human Rights",
        "checked": true
    },
    "policymaking": {
        "label": "Policymaking",
        "checked": true
    },
    "surveillance": {
        "label": "Surveillance",
        "checked": true
    },
    "transparency": {
        "label": "Transparency & accountability",
        "checked": true
    },
    "memory": {
        "label": "Memory",
        "checked": true
    },
    "collaboration": {
        "label": "Collaboration with orgs",
        "checked": true
    },
    "sources": {
        "label": "Existing sources",
        "checked": true
    },
    "governmental": {
        "label": "Governmental",
        "checked": true
    },
    "research": {
        "label": "Own research",
        "checked": true
    },
    "appropriated": {
        "label": "Appropriated data",
        "checked": true
    },
    "whistle": {
        "label": "Whistle-blowers",
        "checked": true
    },
    "crowdsourced": {
        "label": "Crowdsourced",
        "checked": true
    }
}

$(function () {

    // check if the person has been here already
    if(localStorage.getItem('filters') == null) {
        // if not save a new variable in localStorage
        localStorage.setItem('filters', JSON.stringify(filters));
    } else {
        // otherwise retrieve past session
        console.log('saved: ', JSON.parse(localStorage.getItem('filters')));
    }

    $(window).scroll(function () {

        let $navTitle = $('.intro__nav h1');
        let scale = Math.max(1, 3 - 0.01 * $(this).scrollTop());
        let margin = Math.max(18, 28 - 0.05 * $(this).scrollTop());
        let height = Math.max(107, 310 - 1 * $(this).scrollTop());

        $navTitle.css('transform', 'scale(' + scale + ')');
        $navTitle.css('margin-top', margin + 'px');
        $('.intro__nav').css('height', height + 'px');
    });


    $('.filter__choice input').on('change', el => {
        console.log(el.currentTarget);

    });
});