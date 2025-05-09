import React from 'react'
import { Provider } from 'react-redux'
import store from './utils/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './components/Body'
import MainContainer from './components/MainContainer'
import WatchPage from './components/WatchPage'
import YouTubeSearchPage from './components/YouTubeSearchPage'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        path: '/',
        element: <MainContainer />
      },
      {
        path: 'watch',
        element: <WatchPage />
      },
      {
        path: 'search',
        element: <YouTubeSearchPage />
      }
    ]
  }
])

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  )
}

export default App
