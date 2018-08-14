// import golos from 'golos-js'
// import { MAIN_TAG, EMPTY_STRING } from "../../properties/properties";
// import { MAX_VOTE } from "./fetchPostsProperties";
//
// export function fetchGolosBlog (data) {
//   /* const resultData = golos.api.getBlogAsync(data.data.author, data.data.enterId, data.data.limit);
//   const query = {
//     select_tags: ['golosanswers'],
//     limit: 25,
//   };
//   return new Promise((resolve, reject) => {
//     golos.api.getDiscussionsByCreated(query, (err, result) => {
//       if (err) reject(err);
//       else {
//         resolve(result);
//       }
//     });
//   })*/
//
//   return new Promise((resolve, reject) => {
//     golos.api.getContentReplies(EMPTY_STRING, MAIN_TAG, MAX_VOTE, (err, result) => {
//       if (err) reject(err);
//       else {
//         resolve(result);
//       }
//     });
//   })
//
// }


import {apiCallForLoggedUser} from '../../services/api/httpsApi'
import {
  HOSTNAME,
  PATH_METHOD_POST_LOAD,
  PORT,
  POST
} from '../../properties/properties'

export function fetchGolosBlog (ob) {

  const result =  apiCallForLoggedUser(HOSTNAME, PORT, PATH_METHOD_POST_LOAD, POST, ob)
  return result
}
