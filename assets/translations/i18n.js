$(document).ready(function () {

    const languageSelector = $('#language-selector');
    let translations = {};
    let basePath = ""

    function loadTranslations(language) {
        updateLanguageImage(language);

        $.getJSON(`${basePath}../../assets/translations/${language}.json`)
            .done(function (data) {
                translations = data;
                applyTranslations();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Error loading translation file:', textStatus, errorThrown);
            });
    }

    function applyTranslations() {
        $('[data-i18n]').each(function () {
            const key = $(this).data('i18n');
            if (translations[key]) {
                $(this).text(translations[key]);
            }
        });
    }

    function updateLanguageImage(language) {
        const imagePath = `${basePath}../../assets/images/${language}.svg`;
        $('#langImg').attr('src', imagePath);
    }

    function setSelectOption(value) {
        const options = languageSelector.find('option');
        options.each(function () {
            if ($(this).val() === value) {
                $(this).prop('selected', true);
                return false;
            }
        });
    }

    function setBasePath() {
        // Get the path to the current HTML file
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/');

        // Remove the last part (the filename) and navigate to the root folder
        pathParts.pop();
        basePath = pathParts.join('/') + '/';
    }

    languageSelector.on('change', function () {
        const selectedLanguage = $(this).val();
        loadTranslations(selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
    });

    setBasePath();
    // Load the default or stored language
    const storedLanguage = localStorage.getItem('language') || 'ru';
    loadTranslations(storedLanguage);
    setSelectOption(storedLanguage);
});