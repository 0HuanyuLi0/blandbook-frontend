






// https://0huanyuli0.github.io/blandbook-frontend/

let RAILS_BASE_URL
let REACT_BASE_URL

if (process.env.NODE_ENV === 'development') {

    RAILS_BASE_URL = 'http://localhost:3000'
    REACT_BASE_URL = 'http://localhost:3001/#'


} else {

    RAILS_BASE_URL = 'https://blandbook-server.herokuapp.com'
    REACT_BASE_URL = 'https://0huanyuli0.github.io/blandbook-frontend/#'

}

export {RAILS_BASE_URL,REACT_BASE_URL}
