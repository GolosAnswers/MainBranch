// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import SinglePost from './SinglePost'
import AskQuestion from './AskQuestion'
import MyQuestions from './MyQuestions'
import FindQuestion from './FindQuestion'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  childRoutes : [
    {
      path        : '/',
      component   : CoreLayout,
      indexRoute  : Home,
      childRoutes : [
      ]
    },
    {
      path        : '/post',
      component   : CoreLayout,
      indexRoute  : SinglePost,
      childRoutes : [
      ]
    },
    {
      path        : '/askquestion',
      component   : CoreLayout,
      indexRoute  : AskQuestion,
      childRoutes : [
      ]
    },
    {
      path        : '/myquestions',
      component   : CoreLayout,
      indexRoute  : MyQuestions,
      childRoutes : [
      ]
    },
    {
      path        : '/findquestion',
      component   : CoreLayout,
      indexRoute  : FindQuestion,
      childRoutes : [
      ]
    }
  ]
}
  );

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
