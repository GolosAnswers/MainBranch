import golos from 'golos-js'
import { LEAVE_COMMENT_CURENT_USER, LEAVE_COMMENT_MAIN_WIF_NAME, LEAVE_COMMENT_STRING_RE } from './leaveCommentProperties'
import { EMPTY_STRING, EMPTY_STRING_OBJECT,STRING_DASH } from '../../properties/properties'

export function leaveComment (data) {

  var wif = localStorage.getItem(LEAVE_COMMENT_MAIN_WIF_NAME);
  var parentAuthor = data.data.parentAuthor;
  var parentPermlink = data.data.parentPermLink;
  var author = localStorage.getItem(LEAVE_COMMENT_CURENT_USER);
  var permlink = String(LEAVE_COMMENT_STRING_RE + parentAuthor + STRING_DASH + parentPermlink + STRING_DASH + Date.now());
  var title = EMPTY_STRING;
  var body = data.data.comment;
  var jsonMetadata = EMPTY_STRING_OBJECT;

  return new Promise((resolve, reject) => {
    golos.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  })

}
