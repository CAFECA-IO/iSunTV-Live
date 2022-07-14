import fetch from 'isomorphic-fetch'

export const FETCH_PROGRAMLIST = 'FETCH_PROGRAMLIST'
export const SEND_EMAIL = 'SEND_EMAIL'


// fetch the programlist
export function fetchProgramlist() {

    // return fetch(`http://localhost:3000/api/v1/programlist`)
    //     .then(response => response.json())
    //     .then(json => dispatch(receivePosts(subreddit, json)))

    return {
      type: GET_PROGRAMLIST,
      payload
    }
  
}

// send the email with email config
export function sendEmail(conig) {
    return {
      type: SEND_EMAIL,
      payload 
    }
}
  