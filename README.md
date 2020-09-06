## Introduction

TV Channels will display your favorite channels along with current schedule, full schedule, search and filters based on Astro API

## Tech stacks

-   React (CRA) ES6
-   MobX (state manager)
-   Styled components (CSS in JS)

## External libraries

-   Axios (REST API interface)
-   Match sorter (Add ranking system to search engine)
-   Reactjs popup (Add portal to open modal)
-   Styled icons (icon libraries)

## Awesomeness

-   Self created styled components (No bootstrap, tailwind, etc) css will be kept in small bundled size
-   Fully using react hooks (No more class components)
-   Use CSS in JS styling, easier to debug and flexible interface
-   Support Dark theme

## Q & A

1. Why do i need store ?

Because i wanted to cache the result of channel data
so, it will render the cached data first upon loading
and meanwhile updating with the new data

2. Why need external libraries ?

-   `Axios` because axios provide a simple interface and expected promise for chaining or awaiting the response, the API is neat and no need to create long enough code just to connect to API, and it also rather small package, so it wont really affect js chunk

-   `Match sorter` because it provides a flexible way of logic for search system, we can have search ranking based on WORDS_START_WITH, CONTAINS, etc. it uses an optimized fuzzy logic, and again its a small package. if i would like to create my own search engine, i can just create filter where `object.contains(input.value)`, but if we want to have a ranking search on fuzzy logic, it will create a lot of code, and not sure if that will be optimized, hence i chose this library.

-   `Reactjs popup` was super impressed by this (3kb) only package, it support all browsers, simple API code, and extensible by styled component as well, animation and styles can be customized, the reason was because its rather painful to create a portal adding DOM outside of main app, and im afraid that also is not optimized, alternatives will be to use React.createElement feature to do that.

3. Why styled components ?

CSS in JS is very easy to debug, because it's isolated to the usage, and you can pass in conditional value inside CSS, therefore to make transition based on conditional javascript is rather easy. it also support Context Provider feature , we can configure that to create Dark and Light theme.
