import axios from 'axios'

export default async function ajax(url) {
  return new Promise(function (resolve, reject) {
    axios.get(url)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
  })
}
