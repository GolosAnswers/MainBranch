import golos from 'golos-js'
import {apiCallForLoggedUser} from '../../services/api/httpsApi'
import {
  LEAVE_COMMENT_MAIN_TAG,
  LEAVE_COMMENT_CURENT_USER,
  LEAVE_COMMENT_MAIN_WIF_NAME,
  LEAVE_COMMENT_STRING_RE
} from './leavePostProperties'
import {
  EMPTY_STRING,
  EMPTY_STRING_OBJECT, HOSTNAME,
  MAIN_TAG,
  PATH_METHOD_POST_LOAD,
  PATH_METHOD_POST_NEW,
  PORT,
  POST,
  STRING_DASH,
  UTC_FORMAT
} from '../../properties/properties'
import {getCurrentDateTimeInUtc} from '../../utils/commonDateUtils'

export function leavePost(data) {

  var wif = localStorage.getItem(LEAVE_COMMENT_MAIN_WIF_NAME);
  var parentAuthor = EMPTY_STRING;
  var parentPermlink = LEAVE_COMMENT_MAIN_TAG;
  var author = localStorage.getItem(LEAVE_COMMENT_CURENT_USER);
  var permlink = String(LEAVE_COMMENT_STRING_RE + parentAuthor + STRING_DASH + parentPermlink + STRING_DASH + Date.now());
  var title = String(data.data.quastion);
  var body = String(data.data.quastion);
  var jsonMetadata = EMPTY_STRING_OBJECT;
  var currentDateTimeUtc = getCurrentDateTimeInUtc();

  return new Promise((resolve, reject) => {
    golos.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
      if (err) reject(err);
      else {
        resolve(result);

        const res = apiCallForLoggedUser(HOSTNAME, PORT, PATH_METHOD_POST_NEW, POST, {
          data: {
            "author": author,
            "url": "",
            "tag": MAIN_TAG,
            "parentPermlink": parentPermlink,
            "permlink": permlink,
            "link": "",
            "title": title,
            "keywords": "",
            "body": body,
            "rating": 1,
            "comments": 1,
            "date": currentDateTimeUtc
          }
        })
        return res
      }
    });
  })

}
