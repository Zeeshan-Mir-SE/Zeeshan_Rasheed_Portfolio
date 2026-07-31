import { ShoppingCart, ListChecks, Newspaper, Home } from 'lucide-react'

// EDIT THIS FILE to add your real projects.
//
// Fields:
//   title    - project name, shown as the card heading
//   desc     - 1-3 sentence description
//   tags     - array of tech names shown as small pills
//   github   - link to the GitHub repo ('#' if private/none)
//   live     - link to the live/deployed site ('#' if none yet)
//   image    - (optional) import a screenshot from src/assets/projects/
//              and pass it here. If omitted, an animated icon is shown instead.
//   icon     - fallback icon (from lucide-react) shown when there's no image
//   featured - (optional) true to show a "FEATURED" badge on the card
//
// Example once you have a screenshot:
//   import shopEaseImg from '../assets/projects/shopease.png'
//   { title: '...', image: shopEaseImg, ... }

export const PROJECTS = [
  {
    title: 'ShopEase — E-commerce Store',
    desc: 'A full-stack online store with product catalog, cart, checkout, and an admin dashboard to manage inventory and orders in real time.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    icon: ShoppingCart,
    image: null,
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'TaskFlow — Team Task Manager',
    desc: 'A Trello-style task board with drag-and-drop columns, team member assignment, and due-date reminders, built for small dev teams.',
    tags: ['React', 'Express', 'MongoDB', 'JWT Auth'],
    icon: ListChecks,
    image: null,
    github: '#',
    live: '#',
  },
  {
    title: 'DevBlog — Personal Blogging Platform',
    desc: 'A CMS-style blog where writers can draft, edit, and publish posts with markdown support, tags, and a public reader-facing site.',
    tags: ['React', 'Node.js', 'MongoDB'],
    icon: Newspaper,
    image: null,
    github: '#',
    live: '#',
  },
  {
    title: 'NestFinder — Property Listings',
    desc: 'A real-estate listing app with search filters, map-based browsing, and a saved-favorites feature backed by a REST API.',
    tags: ['React', 'FastAPI', 'MongoDB'],
    icon: Home,
    image: null,
    github: '#',
    live: '#',
  },
]
