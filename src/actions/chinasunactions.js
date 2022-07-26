export const fetchProgramlist = 'FETCH_PROGRAMLIST'
export const sendEmail = 'SEND_EMAIL'


// fetch the programlist
export function fetchProgramlistAction() {

    // return fetch(`http://localhost:3000/api/v1/programlist`)
    //     .then(response => response.json())
    //     .then(json => dispatch(receivePosts(subreddit, json)))

    return {
      type: fetchProgramlist
    }
  
}

// send the email with email config
export function sendEmailAction() {

    return {
      type: sendEmail
    }

}
  