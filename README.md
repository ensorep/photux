
> *Leave a README or a commented write-up (a paragraph or bulleted list) on how you'd plan and implement next steps if the intention was to scale this up to a large production-quality project - what would your priorities and considerations be?*


# Next Steps

There are several additions / modifications this application would need in order to ensure scalability, maintainability, and improve UX: 

## Client-side search
 - add local search functionality to make it easier to traverse through albums / photos 


## Filtering / sorting 
 - similar to the point above, adding client-side filtering / sorting would make it easier for users to navigate the data 


## State Management 
- outside of built in context, there is no current state management, so including a strategy for handling global state (redux, context) would go a long way to ensure stable and bug free performance 


## Nextjs Middleware
- using middleware to check for user authentication vs the current strategy (checking for user object & conditionally rendering JSX) would bring major improvements to security (middleware is handled server-side) and would reduce the overall surface area for security & bug issues to arise. 

## Dockerize 
- using containerization platforms like docker (depending on the stack / backend) would help with painless deployment & scaling as the app grows in complexity 


## Linting & Testing
- using TDD + tooling like git-hooks / Github Actions to automate things like unit, e2e, and integration tests would reduce labor required for code reviews / bug bashing. 


## DevOps
- related to the above point, the app is currently being deployed as a static site, if this were to be converted to a SSG (server-side generated) web app or hybrid app (as is normal when scaling / including more dynamic content), the need for a backend & structured deployment pipeline would increase, especially if pursuing something highly automated such as CI/CD
