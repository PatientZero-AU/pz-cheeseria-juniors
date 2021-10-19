import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from "redux-saga";
import order from './reducers/order';
import rootSaga from './middlewares/root';

const reducer = combineReducers({
	order: order
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer,{},applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;



// src
// ├── App.css
// ├── App.test.tsx
// ├── App.tsx
// ├── components
// │   ├── post.tsx
// │   └── postList.tsx
// ├── containers
// │   ├── __tests__
// │   │   └── postList.container.spec.tsx
// │   └── postList.tsx
// ├── index.css
// ├── index.tsx
// ├── logo.svg
// ├── react-app-env.d.ts
// ├── serviceWorker.ts
// └── state
//     ├── configureStore.dev.ts
//     ├── ducks
//     │   ├── index.ts
//     │   └── post
//     │       ├── __tests__
//     │       │   ├── __mockData__
//     |       |   |  └── postsData.json    
//     |       │   ├── actions.spec.ts
//     │       │   ├── reducers.spec.ts
//     │       │   └── sagas.spec.ts
//     │       ├── actions.ts
//     │       ├── reducers.ts
//     │       ├── sagas.ts
//     │       └── types.ts
//     ├── index.ts
//     ├── middlewares
//     │   └── saga.ts
//     └── utils
//         └── apiCaller.ts