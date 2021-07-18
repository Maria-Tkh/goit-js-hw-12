import './css/styles.css';
import API from './js/fetchCountries.js';
import countryCard from './templates/countrycard.hbs';
import countryList from './templates/countrylist.hbs';
import getRefs from './js/getRefs.js';
import { Notify } from "notiflix";
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    event.preventDefault();
    refs.countryCardContainer.innerHTML = '';
    refs.countryListContainer.innerHTML = '';
    const searchLetter = event.target.value;

   
API.fetchCountries(searchLetter)
    .then(countries => {
        if (countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        }
        if (countries.length >= 2 && countries.length <= 10) {
            renderCountryList(countries);

        }
        if (countries.length === 1) {
            renderCountryCard(countries[0])
        }
        if (countries.status === 404) {
           Notiflix.Notify.failure('Oops, there is no country with that name.'); 
        }
    })
    .catch(error => console(error)); 
}

function renderCountryCard(country) {
    const countryCardMarkup = countryCard(country);
    // languages.map(language => language.name).join(', ')
    console.log(countryCardMarkup);
    refs.countryCardContainer.innerHTML = ('beforeend', countryCardMarkup) ;
}

function renderCountryList(country) {
    const countryListMarkup = countryList(country);
    console.log(countryListMarkup);
    refs.countryListContainer.innerHTML = ('beforeend', countryListMarkup);
}

// function onFetchError(error) {
//     alert('ooops');
// }