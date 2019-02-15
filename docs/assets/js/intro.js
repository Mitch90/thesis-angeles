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
};

let filterArray = [];
let filterValue = '';

document.addEventListener("DOMContentLoaded", event => {
    // check if the person has been here already
    if (localStorage.getItem('filters') == null) {
        // if not save a new variable in localStorage
        localStorage.setItem('filters', JSON.stringify(filters));

    } else {
        // otherwise retrieve past session
        // console.log('Retrieving filters from cache');
        let cachedFilters = JSON.parse(localStorage.getItem('filters'));

        filters = cachedFilters;

        for (const key in cachedFilters) {
            $(`#${key}`).prop('checked', cachedFilters[key].checked);
        }
    }

    filterArray = Object.keys(filters).filter(el => !filters[el].checked).map(el => `:not(.${el})`);

    if (filterArray.length) {
        filterValue = `.case${filterArray.join('')}`;
    } else {
        filterValue = '*';
    }

    var imagesToLoad = document.querySelectorAll('img[data-src]');
    var loadImages = function (image) {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = function () {
            image.removeAttribute('data-src');
        };
    };

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (items, observer) {
            items.forEach(function (item) {
                if (item.isIntersecting) {
                    loadImages(item.target);
                    observer.unobserve(item.target);
                }
            });
        });
        imagesToLoad.forEach(function (img) {
            observer.observe(img);
        });
    } else {
        imagesToLoad.forEach(function (img) {
            loadImages(img);
        });
    }

});

$(function () {

    let $checkboxes = $('.filter__choice input');
    let $caseContainer = $('.case__container');

    // setup isotope
    $caseContainer.isotope({
        itemSelector: '.case',
        percentPosition: true,
        layoutMode: 'masonry',
        filter: filterValue
    });

    // define behaviour on filter change
    $checkboxes.on('change', el => {
        let checkId = el.currentTarget.id;
        filters[checkId].checked = !filters[checkId].checked;
        // console.log(filters);

        localStorage.setItem('filters', JSON.stringify(filters));

        let inclusives = [];
        $checkboxes.each((i, elem) => {
            if (!elem.checked) {
                inclusives.push(`:not(${elem.value})`);
            }
        });

        let newFilterValue = inclusives.length ? `.case${inclusives.join('')}` : '*';
        // console.log(newFilterValue);

        $caseContainer.isotope({
            filter: newFilterValue
        });

    });

    // define behaviour for buttons
    $('.filter__header button').on('click', e => {
        // let eventType = e.currentTarget.attributes.name.nodeValue;
        // if (eventType == 'reset') {
        //     $checkboxes.prop('checked', false);
        //     for (const key in filters) {
        //         filters[key].checked = false;
        //     }
        //     $caseContainer.isotope({ filter: '.none' });
        // } else {
        //     $checkboxes.prop('checked', true);
        //     for (const key in filters) {
        //         filters[key].checked = true;
        //     }
        //     $caseContainer.isotope({ filter: '*' });
        // }
        $checkboxes.prop('checked', true);
        for (const key in filters) {
            filters[key].checked = true;
        }
        $caseContainer.isotope({
            filter: '*'
        });
        localStorage.setItem('filters', JSON.stringify(filters));

    })

    // define behaviour for shrinking header
    $(window).scroll(function () {

        let $navTitle = $('.intro__nav h1');
        let scale = Math.max(1, 3 - 0.01 * $(this).scrollTop());
        let margin = Math.max(18, 28 - 0.05 * $(this).scrollTop());
        let height = Math.max(107, 310 - 1 * $(this).scrollTop());

        $navTitle.css('transform', 'scale(' + scale + ')');
        $navTitle.css('margin-top', margin + 'px');
        $('.intro__nav').css('height', height + 'px');
    });
});