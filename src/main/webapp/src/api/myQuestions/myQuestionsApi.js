import golos from 'golos-js'
import { MY_QUESTIONS_MAIN_TAG, MY_QUESTIONS_CURENT_USER, MY_QUESTIONS_MAX_QUESTIONS_LIMIT  } from './myQuestionsProperties'

export function getMyQuestions (data) {

  var author = localStorage.getItem(MY_QUESTIONS_CURENT_USER);

  const query = {
    select_tags: [MY_QUESTIONS_MAIN_TAG],
    select_authors: [author],
    limit: MY_QUESTIONS_MAX_QUESTIONS_LIMIT,
  };

  return new Promise((resolve, reject) => {
    golos.api.getDiscussionsByActive(query, (err, result) => {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  })

}
