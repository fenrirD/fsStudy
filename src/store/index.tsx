import {applyMiddleware, createStore, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import modules from './modules'


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const configure = () => {
    // saga 등록
    // const sagaMiddleware = createSagaMiddleware()

    // chrome redux 개발자 도구를 사용 가능하게

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
    const store = createStore(modules, composeEnhancers(applyMiddleware()))
    //  param reducer , middleware...

    //saga start
    // sagaMiddleware.run(rootSagas)

    return store
}

export default configure()
