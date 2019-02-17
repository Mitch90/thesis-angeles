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

$(function () {
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
            if (cachedFilters[key].checked) {
                $(`#${key}`).addClass('filter--selected');
            }
        }
    }

    d3.json('/assets/data/cases.json').then(projects => {

        // console.log(projects);
        const project = document.querySelector('.project__title').innerText;
        const type = document.querySelector('p[data-type]').getAttribute('data-type');
        const topic = document.querySelector('p[data-topic]').getAttribute('data-topic');
        const acquisitionArray = [];
        document.querySelectorAll('p[data-acquisition]').forEach(el => {
            const acquisition = el.getAttribute('data-acquisition');
            acquisitionArray.push(acquisition);
        });
        const relatedTypes = projects.filter(p => p.type == type && p.project != project);
        const relatedTopics = projects.filter(p => p.topic == topic && p.project != project);
        let acquisitions = [];
        acquisitionArray.forEach(a => {
            let match = projects.filter(p => {
                let projectAcquisitions = p.acquisition.split(', ');
                return projectAcquisitions.indexOf(a) != -1 && p.project != project
            });
            acquisitions = acquisitions.concat(match);
        });
        const relatedAcquisitions = [...new Set(acquisitions)];
        // console.log(relatedTypes.length, relatedTopics.length, relatedAcquisitions.length);
        if (relatedTypes.length > 0) {
            selectProject(relatedTypes, 'type', 1);
        } else {
            if (relatedTopics.length > 0) {
                selectProject(relatedTopics, 'topic', 1);
            } else if (relatedAcquisitions.length > 0) {
                selectProject(relatedAcquisitions, 'acquisition', 1);
            }
        }
        if (relatedTopics.length > 0) {
            selectProject(relatedTopics, 'topic', 2);
        } else {
            if (relatedTypes.length > 0) {
                selectProject(relatedTypes, 'type', 2);
            } else if (relatedAcquisitions.length > 0) {
                selectProject(relatedAcquisitions, 'acquisition', 2);
            }
        }
        if (relatedAcquisitions.length > 0) {
            selectProject(relatedAcquisitions, 'acquisition', 3);
        } else {
            if (relatedTypes.length > 0) {
                selectProject(relatedTypes, 'type', 3);
            } else if (relatedTopics.length > 0) {
                selectProject(relatedTopics, 'topic', 3);
            }
        }

        function selectProject(subset, filter, position) {
            const randomNum = Math.floor(Math.random() * Math.floor(subset.length));
            const randomPick = subset[randomNum];
            const pickAcquisitionArray = randomPick.acquisition.split(', ');
            const intersection = acquisitionArray.filter(x => pickAcquisitionArray.includes(x));
            let $template = $(`
                <div class="related__flex">
                    <div class="related__context">
                        <img src="/assets/images/${randomPick.images.split(', ')[0]}" alt="Thumbnail of project ${randomPick.project}">
                    </div>
                    <div class="related__text">
                        <h2>${randomPick.project.length > 28 ? randomPick.project.substring(0, 28) + '…' : randomPick.project.substring(0, 28)}</h2>
                        <p>${randomPick.description.substring(0, 140)}…</p>
                    </div>
                </div>
                <h3>${filter}:</h3>
                <p class="project__filter">${filter == "acquisition" ? filters[intersection[Math.floor(Math.random() * Math.floor(intersection.length))]].label : filters[randomPick[filter]].label}</p>
            `);

            $(`.related__item:nth-child(${position})`).attr('href', () => {
                return '/case_studies/' + slugify(randomPick.project) + '.html';
            }).append($template);
        }

    }).catch(error => console.log(error));

    let projectImages = $('.project__images img');
    const srcArray = [];
    projectImages.each(function (i) {
        this.setAttribute('data-image-index', i);
        let newImage = {
            'src': this.src,
            'caption': this.alt
        }
        srcArray.push(newImage);
    });

    projectImages.on('click', function (event) {
        let imageIndex = +$(event.currentTarget).attr('data-image-index');
        let $modal = $('.modal');
        let $modalTemplate = $(`
            <span class="project__close"></span>
            <div class="modal__container">
                <span class="project__arrow prev--arrow"></span>
                <div class="modal__image">
                    <img src="${srcArray[imageIndex].src}" alt="${srcArray[imageIndex].caption}">
                    <p class="modal__caption">${imageIndex + 1}. ${srcArray[imageIndex].caption}<p>
                </div>
                <span class="project__arrow next--arrow"></span>
            </div>
        `);
        $modal.addClass('modal--open').append($modalTemplate);
        let $modalImage = $('.modal__image img');
        let $modalCaption = $('.modal__caption');

        $('.project__close').on('click', function(event){
            $modal.removeClass('modal--open');
            $modalTemplate.remove();
        });

        $('.project__arrow').on('click', function(event){
            if ($(event.currentTarget).hasClass('prev--arrow')) {
                imageIndex = imageIndex == 0 ? srcArray.length - 1 : imageIndex - 1;
            } else {
                imageIndex = imageIndex == srcArray.length - 1 ? 0 : imageIndex + 1;
            }   
            $modalImage.attr('src', srcArray[imageIndex].src);
            $modalCaption.text(`${imageIndex + 1}. ${srcArray[imageIndex].caption}`);
        });
    })

});

// Credits to Matthew Hagemann - https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
function slugify(string) {
    const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_;'
    const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh----'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with ‘and’
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        //   .replace(/\-\-+/g, '-') // Replace multiple — with single -
        .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
}