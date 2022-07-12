import fetch from 'isomorphic-fetch'

export const FETCH_PROGRAMLIST = 'FETCH_PROGRAMLIST'
export const SEND_EMAIL = 'SEND_EMAIL'

// if we need to add time and fetch the certain programlist, we can add this 
// export function fetchProgramlist(programlist_time) {
//   return dispatch => {
//     dispatch(requestProgramlist(programlist_time))
//     return fetch(`http://localhost:3000/api/v1/programlist`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(subreddit, json)))
//   }
// }

// fetch the programlist
export function fetchProgramlist() {

    return fetch(`http://localhost:3000/api/v1/programlist`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(subreddit, json)))
  
}

// send the email with email config
export function sendEmail(config) {
    return {
      type: SEND_EMAIL,
      config
    }
}
  