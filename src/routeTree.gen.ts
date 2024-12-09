/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as protectedProtectedImport } from './routes/(protected)/_protected'
import { Route as authSignupIndexImport } from './routes/(auth)/signup/index'
import { Route as authSigninIndexImport } from './routes/(auth)/signin/index'
import { Route as protectedProtecteddashboardDashboardImport } from './routes/(protected)/_protected/(dashboard)/_dashboard'
import { Route as protectedProtectedNotesEditNoteIdIndexImport } from './routes/(protected)/_protected/notes/edit/$noteId/index'
import { Route as protectedProtectedFlashcardsReviewFlashcardIdIndexImport } from './routes/(protected)/_protected/flashcards/review/$flashcardId/index'
import { Route as protectedProtectedFlashcardsPreviewFlashcardIdIndexImport } from './routes/(protected)/_protected/flashcards/preview/$flashcardId/index'
import { Route as protectedProtectedFlashcardsFromNoteIdIndexImport } from './routes/(protected)/_protected/flashcards/from/$noteId/index'
import { Route as protectedProtectedFlashcardsEditFlashcardIdIndexImport } from './routes/(protected)/_protected/flashcards/edit/$flashcardId/index'
import { Route as protectedProtecteddashboardDashboardSettingsIndexImport } from './routes/(protected)/_protected/(dashboard)/_dashboard/settings/index'
import { Route as protectedProtecteddashboardDashboardNotesIndexImport } from './routes/(protected)/_protected/(dashboard)/_dashboard/notes/index'
import { Route as protectedProtecteddashboardDashboardHomeIndexImport } from './routes/(protected)/_protected/(dashboard)/_dashboard/home/index'
import { Route as protectedProtecteddashboardDashboardFlashcardsIndexImport } from './routes/(protected)/_protected/(dashboard)/_dashboard/flashcards/index'
import { Route as protectedProtecteddashboardDashboardExploreIndexImport } from './routes/(protected)/_protected/(dashboard)/_dashboard/explore/index'

// Create Virtual Routes

const protectedImport = createFileRoute('/(protected)')()
const IndexLazyImport = createFileRoute('/')()
const protectedProtecteddashboardImport = createFileRoute(
  '/(protected)/_protected/(dashboard)',
)()
const protectedProtectedNotesNewIndexLazyImport = createFileRoute(
  '/(protected)/_protected/notes/new/',
)()
const protectedProtectedFlashcardsNewIndexLazyImport = createFileRoute(
  '/(protected)/_protected/flashcards/new/',
)()
const protectedProtecteddashboardDashboardFaqIndexLazyImport = createFileRoute(
  '/(protected)/_protected/(dashboard)/_dashboard/faq/',
)()

// Create/Update Routes

const protectedRoute = protectedImport.update({
  id: '/(protected)',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const protectedProtectedRoute = protectedProtectedImport.update({
  id: '/_protected',
  getParentRoute: () => protectedRoute,
} as any)

const protectedProtecteddashboardRoute =
  protectedProtecteddashboardImport.update({
    id: '/(dashboard)',
    getParentRoute: () => protectedProtectedRoute,
  } as any)

const authSignupIndexRoute = authSignupIndexImport.update({
  id: '/(auth)/signup/',
  path: '/signup/',
  getParentRoute: () => rootRoute,
} as any)

const authSigninIndexRoute = authSigninIndexImport.update({
  id: '/(auth)/signin/',
  path: '/signin/',
  getParentRoute: () => rootRoute,
} as any)

const protectedProtecteddashboardDashboardRoute =
  protectedProtecteddashboardDashboardImport.update({
    id: '/_dashboard',
    getParentRoute: () => protectedProtecteddashboardRoute,
  } as any)

const protectedProtectedNotesNewIndexLazyRoute =
  protectedProtectedNotesNewIndexLazyImport
    .update({
      id: '/notes/new/',
      path: '/notes/new/',
      getParentRoute: () => protectedProtectedRoute,
    } as any)
    .lazy(() =>
      import('./routes/(protected)/_protected/notes/new/index.lazy').then(
        (d) => d.Route,
      ),
    )

const protectedProtectedFlashcardsNewIndexLazyRoute =
  protectedProtectedFlashcardsNewIndexLazyImport
    .update({
      id: '/flashcards/new/',
      path: '/flashcards/new/',
      getParentRoute: () => protectedProtectedRoute,
    } as any)
    .lazy(() =>
      import('./routes/(protected)/_protected/flashcards/new/index.lazy').then(
        (d) => d.Route,
      ),
    )

const protectedProtecteddashboardDashboardFaqIndexLazyRoute =
  protectedProtecteddashboardDashboardFaqIndexLazyImport
    .update({
      id: '/faq/',
      path: '/faq/',
      getParentRoute: () => protectedProtecteddashboardDashboardRoute,
    } as any)
    .lazy(() =>
      import(
        './routes/(protected)/_protected/(dashboard)/_dashboard/faq/index.lazy'
      ).then((d) => d.Route),
    )

const protectedProtectedNotesEditNoteIdIndexRoute =
  protectedProtectedNotesEditNoteIdIndexImport.update({
    id: '/notes/edit/$noteId/',
    path: '/notes/edit/$noteId/',
    getParentRoute: () => protectedProtectedRoute,
  } as any)

const protectedProtectedFlashcardsReviewFlashcardIdIndexRoute =
  protectedProtectedFlashcardsReviewFlashcardIdIndexImport.update({
    id: '/flashcards/review/$flashcardId/',
    path: '/flashcards/review/$flashcardId/',
    getParentRoute: () => protectedProtectedRoute,
  } as any)

const protectedProtectedFlashcardsPreviewFlashcardIdIndexRoute =
  protectedProtectedFlashcardsPreviewFlashcardIdIndexImport.update({
    id: '/flashcards/preview/$flashcardId/',
    path: '/flashcards/preview/$flashcardId/',
    getParentRoute: () => protectedProtectedRoute,
  } as any)

const protectedProtectedFlashcardsFromNoteIdIndexRoute =
  protectedProtectedFlashcardsFromNoteIdIndexImport.update({
    id: '/flashcards/from/$noteId/',
    path: '/flashcards/from/$noteId/',
    getParentRoute: () => protectedProtectedRoute,
  } as any)

const protectedProtectedFlashcardsEditFlashcardIdIndexRoute =
  protectedProtectedFlashcardsEditFlashcardIdIndexImport.update({
    id: '/flashcards/edit/$flashcardId/',
    path: '/flashcards/edit/$flashcardId/',
    getParentRoute: () => protectedProtectedRoute,
  } as any)

const protectedProtecteddashboardDashboardSettingsIndexRoute =
  protectedProtecteddashboardDashboardSettingsIndexImport.update({
    id: '/settings/',
    path: '/settings/',
    getParentRoute: () => protectedProtecteddashboardDashboardRoute,
  } as any)

const protectedProtecteddashboardDashboardNotesIndexRoute =
  protectedProtecteddashboardDashboardNotesIndexImport.update({
    id: '/notes/',
    path: '/notes/',
    getParentRoute: () => protectedProtecteddashboardDashboardRoute,
  } as any)

const protectedProtecteddashboardDashboardHomeIndexRoute =
  protectedProtecteddashboardDashboardHomeIndexImport.update({
    id: '/home/',
    path: '/home/',
    getParentRoute: () => protectedProtecteddashboardDashboardRoute,
  } as any)

const protectedProtecteddashboardDashboardFlashcardsIndexRoute =
  protectedProtecteddashboardDashboardFlashcardsIndexImport.update({
    id: '/flashcards/',
    path: '/flashcards/',
    getParentRoute: () => protectedProtecteddashboardDashboardRoute,
  } as any)

const protectedProtecteddashboardDashboardExploreIndexRoute =
  protectedProtecteddashboardDashboardExploreIndexImport.update({
    id: '/explore/',
    path: '/explore/',
    getParentRoute: () => protectedProtecteddashboardDashboardRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/(protected)': {
      id: '/(protected)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof protectedImport
      parentRoute: typeof rootRoute
    }
    '/(protected)/_protected': {
      id: '/(protected)/_protected'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof protectedProtectedImport
      parentRoute: typeof protectedRoute
    }
    '/(auth)/signin/': {
      id: '/(auth)/signin/'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof authSigninIndexImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/signup/': {
      id: '/(auth)/signup/'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof authSignupIndexImport
      parentRoute: typeof rootRoute
    }
    '/(protected)/_protected/(dashboard)': {
      id: '/(protected)/_protected/(dashboard)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof protectedProtecteddashboardImport
      parentRoute: typeof protectedProtectedImport
    }
    '/(protected)/_protected/(dashboard)/_dashboard': {
      id: '/(protected)/_protected/(dashboard)/_dashboard'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof protectedProtecteddashboardDashboardImport
      parentRoute: typeof protectedProtecteddashboardRoute
    }
    '/(protected)/_protected/flashcards/new/': {
      id: '/(protected)/_protected/flashcards/new/'
      path: '/flashcards/new'
      fullPath: '/flashcards/new'
      preLoaderRoute: typeof protectedProtectedFlashcardsNewIndexLazyImport
      parentRoute: typeof protectedProtectedImport
    }
    '/(protected)/_protected/notes/new/': {
      id: '/(protected)/_protected/notes/new/'
      path: '/notes/new'
      fullPath: '/notes/new'
      preLoaderRoute: typeof protectedProtectedNotesNewIndexLazyImport
      parentRoute: typeof protectedProtectedImport
    }
    '/(protected)/_protected/(dashboard)/_dashboard/explore/': {
      id: '/(protected)/_protected/(dashboard)/_dashboard/explore/'
      path: '/explore'
      fullPath: '/explore'
      preLoaderRoute: typeof protectedProtecteddashboardDashboardExploreIndexImport
      parentRoute: typeof protectedProtecteddashboardDashboardImport
    }
    '/(protected)/_protected/(dashboard)/_dashboard/flashcards/': {
      id: '/(protected)/_protected/(dashboard)/_dashboard/flashcards/'
      path: '/flashcards'
      fullPath: '/flashcards'
      preLoaderRoute: typeof protectedProtecteddashboardDashboardFlashcardsIndexImport
      parentRoute: typeof protectedProtecteddashboardDashboardImport
    }
    '/(protected)/_protected/(dashboard)/_dashboard/home/': {
      id: '/(protected)/_protected/(dashboard)/_dashboard/home/'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof protectedProtecteddashboardDashboardHomeIndexImport
      parentRoute: typeof protectedProtecteddashboardDashboardImport
    }
    '/(protected)/_protected/(dashboard)/_dashboard/notes/': {
      id: '/(protected)/_protected/(dashboard)/_dashboard/notes/'
      path: '/notes'
      fullPath: '/notes'
      preLoaderRoute: typeof protectedProtecteddashboardDashboardNotesIndexImport
      parentRoute: typeof protectedProtecteddashboardDashboardImport
    }
    '/(protected)/_protected/(dashboard)/_dashboard/settings/': {
      id: '/(protected)/_protected/(dashboard)/_dashboard/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof protectedProtecteddashboardDashboardSettingsIndexImport
      parentRoute: typeof protectedProtecteddashboardDashboardImport
    }
    '/(protected)/_protected/flashcards/edit/$flashcardId/': {
      id: '/(protected)/_protected/flashcards/edit/$flashcardId/'
      path: '/flashcards/edit/$flashcardId'
      fullPath: '/flashcards/edit/$flashcardId'
      preLoaderRoute: typeof protectedProtectedFlashcardsEditFlashcardIdIndexImport
      parentRoute: typeof protectedProtectedImport
    }
    '/(protected)/_protected/flashcards/from/$noteId/': {
      id: '/(protected)/_protected/flashcards/from/$noteId/'
      path: '/flashcards/from/$noteId'
      fullPath: '/flashcards/from/$noteId'
      preLoaderRoute: typeof protectedProtectedFlashcardsFromNoteIdIndexImport
      parentRoute: typeof protectedProtectedImport
    }
    '/(protected)/_protected/flashcards/preview/$flashcardId/': {
      id: '/(protected)/_protected/flashcards/preview/$flashcardId/'
      path: '/flashcards/preview/$flashcardId'
      fullPath: '/flashcards/preview/$flashcardId'
      preLoaderRoute: typeof protectedProtectedFlashcardsPreviewFlashcardIdIndexImport
      parentRoute: typeof protectedProtectedImport
    }
    '/(protected)/_protected/flashcards/review/$flashcardId/': {
      id: '/(protected)/_protected/flashcards/review/$flashcardId/'
      path: '/flashcards/review/$flashcardId'
      fullPath: '/flashcards/review/$flashcardId'
      preLoaderRoute: typeof protectedProtectedFlashcardsReviewFlashcardIdIndexImport
      parentRoute: typeof protectedProtectedImport
    }
    '/(protected)/_protected/notes/edit/$noteId/': {
      id: '/(protected)/_protected/notes/edit/$noteId/'
      path: '/notes/edit/$noteId'
      fullPath: '/notes/edit/$noteId'
      preLoaderRoute: typeof protectedProtectedNotesEditNoteIdIndexImport
      parentRoute: typeof protectedProtectedImport
    }
    '/(protected)/_protected/(dashboard)/_dashboard/faq/': {
      id: '/(protected)/_protected/(dashboard)/_dashboard/faq/'
      path: '/faq'
      fullPath: '/faq'
      preLoaderRoute: typeof protectedProtecteddashboardDashboardFaqIndexLazyImport
      parentRoute: typeof protectedProtecteddashboardDashboardImport
    }
  }
}

// Create and export the route tree

interface protectedProtecteddashboardDashboardRouteChildren {
  protectedProtecteddashboardDashboardExploreIndexRoute: typeof protectedProtecteddashboardDashboardExploreIndexRoute
  protectedProtecteddashboardDashboardFlashcardsIndexRoute: typeof protectedProtecteddashboardDashboardFlashcardsIndexRoute
  protectedProtecteddashboardDashboardHomeIndexRoute: typeof protectedProtecteddashboardDashboardHomeIndexRoute
  protectedProtecteddashboardDashboardNotesIndexRoute: typeof protectedProtecteddashboardDashboardNotesIndexRoute
  protectedProtecteddashboardDashboardSettingsIndexRoute: typeof protectedProtecteddashboardDashboardSettingsIndexRoute
  protectedProtecteddashboardDashboardFaqIndexLazyRoute: typeof protectedProtecteddashboardDashboardFaqIndexLazyRoute
}

const protectedProtecteddashboardDashboardRouteChildren: protectedProtecteddashboardDashboardRouteChildren =
  {
    protectedProtecteddashboardDashboardExploreIndexRoute:
      protectedProtecteddashboardDashboardExploreIndexRoute,
    protectedProtecteddashboardDashboardFlashcardsIndexRoute:
      protectedProtecteddashboardDashboardFlashcardsIndexRoute,
    protectedProtecteddashboardDashboardHomeIndexRoute:
      protectedProtecteddashboardDashboardHomeIndexRoute,
    protectedProtecteddashboardDashboardNotesIndexRoute:
      protectedProtecteddashboardDashboardNotesIndexRoute,
    protectedProtecteddashboardDashboardSettingsIndexRoute:
      protectedProtecteddashboardDashboardSettingsIndexRoute,
    protectedProtecteddashboardDashboardFaqIndexLazyRoute:
      protectedProtecteddashboardDashboardFaqIndexLazyRoute,
  }

const protectedProtecteddashboardDashboardRouteWithChildren =
  protectedProtecteddashboardDashboardRoute._addFileChildren(
    protectedProtecteddashboardDashboardRouteChildren,
  )

interface protectedProtecteddashboardRouteChildren {
  protectedProtecteddashboardDashboardRoute: typeof protectedProtecteddashboardDashboardRouteWithChildren
}

const protectedProtecteddashboardRouteChildren: protectedProtecteddashboardRouteChildren =
  {
    protectedProtecteddashboardDashboardRoute:
      protectedProtecteddashboardDashboardRouteWithChildren,
  }

const protectedProtecteddashboardRouteWithChildren =
  protectedProtecteddashboardRoute._addFileChildren(
    protectedProtecteddashboardRouteChildren,
  )

interface protectedProtectedRouteChildren {
  protectedProtecteddashboardRoute: typeof protectedProtecteddashboardRouteWithChildren
  protectedProtectedFlashcardsNewIndexLazyRoute: typeof protectedProtectedFlashcardsNewIndexLazyRoute
  protectedProtectedNotesNewIndexLazyRoute: typeof protectedProtectedNotesNewIndexLazyRoute
  protectedProtectedFlashcardsEditFlashcardIdIndexRoute: typeof protectedProtectedFlashcardsEditFlashcardIdIndexRoute
  protectedProtectedFlashcardsFromNoteIdIndexRoute: typeof protectedProtectedFlashcardsFromNoteIdIndexRoute
  protectedProtectedFlashcardsPreviewFlashcardIdIndexRoute: typeof protectedProtectedFlashcardsPreviewFlashcardIdIndexRoute
  protectedProtectedFlashcardsReviewFlashcardIdIndexRoute: typeof protectedProtectedFlashcardsReviewFlashcardIdIndexRoute
  protectedProtectedNotesEditNoteIdIndexRoute: typeof protectedProtectedNotesEditNoteIdIndexRoute
}

const protectedProtectedRouteChildren: protectedProtectedRouteChildren = {
  protectedProtecteddashboardRoute:
    protectedProtecteddashboardRouteWithChildren,
  protectedProtectedFlashcardsNewIndexLazyRoute:
    protectedProtectedFlashcardsNewIndexLazyRoute,
  protectedProtectedNotesNewIndexLazyRoute:
    protectedProtectedNotesNewIndexLazyRoute,
  protectedProtectedFlashcardsEditFlashcardIdIndexRoute:
    protectedProtectedFlashcardsEditFlashcardIdIndexRoute,
  protectedProtectedFlashcardsFromNoteIdIndexRoute:
    protectedProtectedFlashcardsFromNoteIdIndexRoute,
  protectedProtectedFlashcardsPreviewFlashcardIdIndexRoute:
    protectedProtectedFlashcardsPreviewFlashcardIdIndexRoute,
  protectedProtectedFlashcardsReviewFlashcardIdIndexRoute:
    protectedProtectedFlashcardsReviewFlashcardIdIndexRoute,
  protectedProtectedNotesEditNoteIdIndexRoute:
    protectedProtectedNotesEditNoteIdIndexRoute,
}

const protectedProtectedRouteWithChildren =
  protectedProtectedRoute._addFileChildren(protectedProtectedRouteChildren)

interface protectedRouteChildren {
  protectedProtectedRoute: typeof protectedProtectedRouteWithChildren
}

const protectedRouteChildren: protectedRouteChildren = {
  protectedProtectedRoute: protectedProtectedRouteWithChildren,
}

const protectedRouteWithChildren = protectedRoute._addFileChildren(
  protectedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof protectedProtecteddashboardDashboardRouteWithChildren
  '/signin': typeof authSigninIndexRoute
  '/signup': typeof authSignupIndexRoute
  '/flashcards/new': typeof protectedProtectedFlashcardsNewIndexLazyRoute
  '/notes/new': typeof protectedProtectedNotesNewIndexLazyRoute
  '/explore': typeof protectedProtecteddashboardDashboardExploreIndexRoute
  '/flashcards': typeof protectedProtecteddashboardDashboardFlashcardsIndexRoute
  '/home': typeof protectedProtecteddashboardDashboardHomeIndexRoute
  '/notes': typeof protectedProtecteddashboardDashboardNotesIndexRoute
  '/settings': typeof protectedProtecteddashboardDashboardSettingsIndexRoute
  '/flashcards/edit/$flashcardId': typeof protectedProtectedFlashcardsEditFlashcardIdIndexRoute
  '/flashcards/from/$noteId': typeof protectedProtectedFlashcardsFromNoteIdIndexRoute
  '/flashcards/preview/$flashcardId': typeof protectedProtectedFlashcardsPreviewFlashcardIdIndexRoute
  '/flashcards/review/$flashcardId': typeof protectedProtectedFlashcardsReviewFlashcardIdIndexRoute
  '/notes/edit/$noteId': typeof protectedProtectedNotesEditNoteIdIndexRoute
  '/faq': typeof protectedProtecteddashboardDashboardFaqIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof protectedProtecteddashboardDashboardRouteWithChildren
  '/signin': typeof authSigninIndexRoute
  '/signup': typeof authSignupIndexRoute
  '/flashcards/new': typeof protectedProtectedFlashcardsNewIndexLazyRoute
  '/notes/new': typeof protectedProtectedNotesNewIndexLazyRoute
  '/explore': typeof protectedProtecteddashboardDashboardExploreIndexRoute
  '/flashcards': typeof protectedProtecteddashboardDashboardFlashcardsIndexRoute
  '/home': typeof protectedProtecteddashboardDashboardHomeIndexRoute
  '/notes': typeof protectedProtecteddashboardDashboardNotesIndexRoute
  '/settings': typeof protectedProtecteddashboardDashboardSettingsIndexRoute
  '/flashcards/edit/$flashcardId': typeof protectedProtectedFlashcardsEditFlashcardIdIndexRoute
  '/flashcards/from/$noteId': typeof protectedProtectedFlashcardsFromNoteIdIndexRoute
  '/flashcards/preview/$flashcardId': typeof protectedProtectedFlashcardsPreviewFlashcardIdIndexRoute
  '/flashcards/review/$flashcardId': typeof protectedProtectedFlashcardsReviewFlashcardIdIndexRoute
  '/notes/edit/$noteId': typeof protectedProtectedNotesEditNoteIdIndexRoute
  '/faq': typeof protectedProtecteddashboardDashboardFaqIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/(protected)': typeof protectedRouteWithChildren
  '/(protected)/_protected': typeof protectedProtectedRouteWithChildren
  '/(auth)/signin/': typeof authSigninIndexRoute
  '/(auth)/signup/': typeof authSignupIndexRoute
  '/(protected)/_protected/(dashboard)': typeof protectedProtecteddashboardRouteWithChildren
  '/(protected)/_protected/(dashboard)/_dashboard': typeof protectedProtecteddashboardDashboardRouteWithChildren
  '/(protected)/_protected/flashcards/new/': typeof protectedProtectedFlashcardsNewIndexLazyRoute
  '/(protected)/_protected/notes/new/': typeof protectedProtectedNotesNewIndexLazyRoute
  '/(protected)/_protected/(dashboard)/_dashboard/explore/': typeof protectedProtecteddashboardDashboardExploreIndexRoute
  '/(protected)/_protected/(dashboard)/_dashboard/flashcards/': typeof protectedProtecteddashboardDashboardFlashcardsIndexRoute
  '/(protected)/_protected/(dashboard)/_dashboard/home/': typeof protectedProtecteddashboardDashboardHomeIndexRoute
  '/(protected)/_protected/(dashboard)/_dashboard/notes/': typeof protectedProtecteddashboardDashboardNotesIndexRoute
  '/(protected)/_protected/(dashboard)/_dashboard/settings/': typeof protectedProtecteddashboardDashboardSettingsIndexRoute
  '/(protected)/_protected/flashcards/edit/$flashcardId/': typeof protectedProtectedFlashcardsEditFlashcardIdIndexRoute
  '/(protected)/_protected/flashcards/from/$noteId/': typeof protectedProtectedFlashcardsFromNoteIdIndexRoute
  '/(protected)/_protected/flashcards/preview/$flashcardId/': typeof protectedProtectedFlashcardsPreviewFlashcardIdIndexRoute
  '/(protected)/_protected/flashcards/review/$flashcardId/': typeof protectedProtectedFlashcardsReviewFlashcardIdIndexRoute
  '/(protected)/_protected/notes/edit/$noteId/': typeof protectedProtectedNotesEditNoteIdIndexRoute
  '/(protected)/_protected/(dashboard)/_dashboard/faq/': typeof protectedProtecteddashboardDashboardFaqIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/signin'
    | '/signup'
    | '/flashcards/new'
    | '/notes/new'
    | '/explore'
    | '/flashcards'
    | '/home'
    | '/notes'
    | '/settings'
    | '/flashcards/edit/$flashcardId'
    | '/flashcards/from/$noteId'
    | '/flashcards/preview/$flashcardId'
    | '/flashcards/review/$flashcardId'
    | '/notes/edit/$noteId'
    | '/faq'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/signin'
    | '/signup'
    | '/flashcards/new'
    | '/notes/new'
    | '/explore'
    | '/flashcards'
    | '/home'
    | '/notes'
    | '/settings'
    | '/flashcards/edit/$flashcardId'
    | '/flashcards/from/$noteId'
    | '/flashcards/preview/$flashcardId'
    | '/flashcards/review/$flashcardId'
    | '/notes/edit/$noteId'
    | '/faq'
  id:
    | '__root__'
    | '/'
    | '/(protected)'
    | '/(protected)/_protected'
    | '/(auth)/signin/'
    | '/(auth)/signup/'
    | '/(protected)/_protected/(dashboard)'
    | '/(protected)/_protected/(dashboard)/_dashboard'
    | '/(protected)/_protected/flashcards/new/'
    | '/(protected)/_protected/notes/new/'
    | '/(protected)/_protected/(dashboard)/_dashboard/explore/'
    | '/(protected)/_protected/(dashboard)/_dashboard/flashcards/'
    | '/(protected)/_protected/(dashboard)/_dashboard/home/'
    | '/(protected)/_protected/(dashboard)/_dashboard/notes/'
    | '/(protected)/_protected/(dashboard)/_dashboard/settings/'
    | '/(protected)/_protected/flashcards/edit/$flashcardId/'
    | '/(protected)/_protected/flashcards/from/$noteId/'
    | '/(protected)/_protected/flashcards/preview/$flashcardId/'
    | '/(protected)/_protected/flashcards/review/$flashcardId/'
    | '/(protected)/_protected/notes/edit/$noteId/'
    | '/(protected)/_protected/(dashboard)/_dashboard/faq/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  protectedRoute: typeof protectedRouteWithChildren
  authSigninIndexRoute: typeof authSigninIndexRoute
  authSignupIndexRoute: typeof authSignupIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  protectedRoute: protectedRouteWithChildren,
  authSigninIndexRoute: authSigninIndexRoute,
  authSignupIndexRoute: authSignupIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(protected)",
        "/(auth)/signin/",
        "/(auth)/signup/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/(protected)": {
      "filePath": "(protected)",
      "children": [
        "/(protected)/_protected"
      ]
    },
    "/(protected)/_protected": {
      "filePath": "(protected)/_protected.tsx",
      "parent": "/(protected)",
      "children": [
        "/(protected)/_protected/(dashboard)",
        "/(protected)/_protected/flashcards/new/",
        "/(protected)/_protected/notes/new/",
        "/(protected)/_protected/flashcards/edit/$flashcardId/",
        "/(protected)/_protected/flashcards/from/$noteId/",
        "/(protected)/_protected/flashcards/preview/$flashcardId/",
        "/(protected)/_protected/flashcards/review/$flashcardId/",
        "/(protected)/_protected/notes/edit/$noteId/"
      ]
    },
    "/(auth)/signin/": {
      "filePath": "(auth)/signin/index.tsx"
    },
    "/(auth)/signup/": {
      "filePath": "(auth)/signup/index.tsx"
    },
    "/(protected)/_protected/(dashboard)": {
      "filePath": "(protected)/_protected/(dashboard)",
      "parent": "/(protected)/_protected",
      "children": [
        "/(protected)/_protected/(dashboard)/_dashboard"
      ]
    },
    "/(protected)/_protected/(dashboard)/_dashboard": {
      "filePath": "(protected)/_protected/(dashboard)/_dashboard.tsx",
      "parent": "/(protected)/_protected/(dashboard)",
      "children": [
        "/(protected)/_protected/(dashboard)/_dashboard/explore/",
        "/(protected)/_protected/(dashboard)/_dashboard/flashcards/",
        "/(protected)/_protected/(dashboard)/_dashboard/home/",
        "/(protected)/_protected/(dashboard)/_dashboard/notes/",
        "/(protected)/_protected/(dashboard)/_dashboard/settings/",
        "/(protected)/_protected/(dashboard)/_dashboard/faq/"
      ]
    },
    "/(protected)/_protected/flashcards/new/": {
      "filePath": "(protected)/_protected/flashcards/new/index.lazy.tsx",
      "parent": "/(protected)/_protected"
    },
    "/(protected)/_protected/notes/new/": {
      "filePath": "(protected)/_protected/notes/new/index.lazy.tsx",
      "parent": "/(protected)/_protected"
    },
    "/(protected)/_protected/(dashboard)/_dashboard/explore/": {
      "filePath": "(protected)/_protected/(dashboard)/_dashboard/explore/index.tsx",
      "parent": "/(protected)/_protected/(dashboard)/_dashboard"
    },
    "/(protected)/_protected/(dashboard)/_dashboard/flashcards/": {
      "filePath": "(protected)/_protected/(dashboard)/_dashboard/flashcards/index.tsx",
      "parent": "/(protected)/_protected/(dashboard)/_dashboard"
    },
    "/(protected)/_protected/(dashboard)/_dashboard/home/": {
      "filePath": "(protected)/_protected/(dashboard)/_dashboard/home/index.tsx",
      "parent": "/(protected)/_protected/(dashboard)/_dashboard"
    },
    "/(protected)/_protected/(dashboard)/_dashboard/notes/": {
      "filePath": "(protected)/_protected/(dashboard)/_dashboard/notes/index.tsx",
      "parent": "/(protected)/_protected/(dashboard)/_dashboard"
    },
    "/(protected)/_protected/(dashboard)/_dashboard/settings/": {
      "filePath": "(protected)/_protected/(dashboard)/_dashboard/settings/index.tsx",
      "parent": "/(protected)/_protected/(dashboard)/_dashboard"
    },
    "/(protected)/_protected/flashcards/edit/$flashcardId/": {
      "filePath": "(protected)/_protected/flashcards/edit/$flashcardId/index.tsx",
      "parent": "/(protected)/_protected"
    },
    "/(protected)/_protected/flashcards/from/$noteId/": {
      "filePath": "(protected)/_protected/flashcards/from/$noteId/index.tsx",
      "parent": "/(protected)/_protected"
    },
    "/(protected)/_protected/flashcards/preview/$flashcardId/": {
      "filePath": "(protected)/_protected/flashcards/preview/$flashcardId/index.tsx",
      "parent": "/(protected)/_protected"
    },
    "/(protected)/_protected/flashcards/review/$flashcardId/": {
      "filePath": "(protected)/_protected/flashcards/review/$flashcardId/index.tsx",
      "parent": "/(protected)/_protected"
    },
    "/(protected)/_protected/notes/edit/$noteId/": {
      "filePath": "(protected)/_protected/notes/edit/$noteId/index.tsx",
      "parent": "/(protected)/_protected"
    },
    "/(protected)/_protected/(dashboard)/_dashboard/faq/": {
      "filePath": "(protected)/_protected/(dashboard)/_dashboard/faq/index.lazy.tsx",
      "parent": "/(protected)/_protected/(dashboard)/_dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
