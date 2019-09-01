import { lazy } from 'react'
import { routes } from 'config/routes.js'

export const mainRoutes = [
    {
        path: routes.dashboard.path,
        exact: true,
        component: lazy(() => import('container/Dashboard/Dashboard.container'))
    }
]