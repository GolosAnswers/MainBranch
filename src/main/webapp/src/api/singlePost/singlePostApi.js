import golos from 'golos-js'

export function fetchSinglePost (data) {

  //return new Promise((resolve, reject) => {
  return golos.api.getContent(data.data.author, data.data.permlink, (err, result) => {
      if (err) reject(err);
      else {
        resolve(result);
      }
    })
  //})

}

export function fetchSinglePostComments (data) {

  //return new Promise((resolve, reject) => {
  return golos.api.getContentReplies(data.data.parent, data.data.parentPermlink, (err, result) => {
    if (err) reject(err);
    else {
      resolve(result);
    }
  });
//})

}
