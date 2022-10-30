const BASE_URL = 'http://localhost:5000'

// URLs for authentication
export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const TOKEN_VALID_URL = BASE_URL + '/api/token/tokenIsValid';

// URLs to get data about cwimpies
export const GET_ALL_CWIMPIES_URL = BASE_URL + '/api/cwimpies'
export const GET_ALL_COLOURS_URL = BASE_URL + '/api/colours'
export const GET_ALL_SPECIES_URL = BASE_URL + '/api/species'
export const GET_ALL_USERS_URL = BASE_URL + '/api/users'
export const GET_ALL_FAVOURITE_TYPES = BASE_URL + '/api/favourite-types'
export const GET_ALL_PROFESSION_TYPES = BASE_URL + '/api/profession-types'

// URLs to create cwimpies
export const CREATE_CWIMPIE_URL = BASE_URL + '/api/cwimpies/add'

