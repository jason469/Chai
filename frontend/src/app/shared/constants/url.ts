const BASE_URL = 'http://localhost:5000'

// URLs for authentication
export const USER_LOGIN_URL = BASE_URL + '/api/users/login/';
export const TOKEN_VALID_URL = BASE_URL + '/api/token/tokenIsValid/';

// URLs to get data about cwimpies
export const GET_ALL_CWIMPIES_URL = BASE_URL + '/api/cwimpies/'
export const GET_CWIMPIE_URL = BASE_URL + '/api/cwimpies/'
export const GET_ALL_COLOURS_URL = BASE_URL + '/api/colours/'
export const GET_ALL_SPECIES_URL = BASE_URL + '/api/species/'
export const GET_ALL_USERS_URL = BASE_URL + '/api/users/'
export const GET_ALL_FAVOURITE_TYPES_URL = BASE_URL + '/api/favourite-types/'
export const GET_ALL_PROFESSION_TYPES_URL = BASE_URL + '/api/profession-types/'
export const GET_ALL_FONTS_URL = BASE_URL + '/api/fonts/'
export const GET_RANDOM_VALUES_URL = BASE_URL + '/api/cwimpies/random-values/'

// URLs to create cwimpies
export const CREATE_CWIMPIE_URL = BASE_URL + '/api/cwimpies/add/'
export const CREATE_CWIMPIE_PHOTO_URL = BASE_URL + '/api/cwimpies/add-photo/'

// URLs to update cwimpies
export const UPDATE_CWIMPIE_URL = BASE_URL + '/api/cwimpies/update/'

// URLs to delete cwimpies
export const DELETE_CWIMPIE_URL = BASE_URL + '/api/cwimpies/'

// URLs to get all cwimpies whose birthdays are today
export const GET_BIRTHDAY_CWIMPIES_URL = BASE_URL + '/api/cwimpies/birthdays/'

// URLs to get the most current user
export const GET_CURRENT_USER_URL = BASE_URL + '/api/users/'

