/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as UsersIndexImport } from './routes/users/index'
import { Route as AboutIndexImport } from './routes/about/index'
import { Route as UsersIdIndexImport } from './routes/users/$id/index'

// Create Virtual Routes

const HelpIndexLazyImport = createFileRoute('/help/')()

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const HelpIndexLazyRoute = HelpIndexLazyImport.update({
  path: '/help/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/help/index.lazy').then((d) => d.Route))

const UsersIndexRoute = UsersIndexImport.update({
  path: '/users/',
  getParentRoute: () => rootRoute,
} as any)

const AboutIndexRoute = AboutIndexImport.update({
  path: '/about/',
  getParentRoute: () => rootRoute,
} as any)

const UsersIdIndexRoute = UsersIdIndexImport.update({
  path: '/users/$id/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about/': {
      preLoaderRoute: typeof AboutIndexImport
      parentRoute: typeof rootRoute
    }
    '/users/': {
      preLoaderRoute: typeof UsersIndexImport
      parentRoute: typeof rootRoute
    }
    '/help/': {
      preLoaderRoute: typeof HelpIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/users/$id/': {
      preLoaderRoute: typeof UsersIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AboutIndexRoute,
  UsersIndexRoute,
  HelpIndexLazyRoute,
  UsersIdIndexRoute,
])

/* prettier-ignore-end */
