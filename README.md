# Sports-Reference Project
This is a simple, pure-TypeScript implementation which renders win-loss data in the provided format to an HTML table.

## Explanation
The data is remotely fetched from a `data.json` file running on the same origin as the webpage.

1. The algorithm first obtains every team name as keys of the provided JSON object. This is required in order to maintain consistent ordering, as a team does not appear as a child of itself
2. Then, the basic `<table>` structure is built, with the header and footer containing the "Tm" label
3. Then, for each team...
    1. The team is added to the header and footer
    2. A row is created for the team, with the name of the team as the first item
    3. For each team, the number of wins they have as an opponent is added, or "--" for the current team
    4. The row is then added to the table
4. The complete `<table>` is assembled by adding the header, body, and footer
5. The table is placed into the DOM inside `#table-dest`

From an algorithmic analysis standpoint, this is in $\mathcal{O}(n^2)$ time, where $n$ is the number of teams. This level of complexity is unavoidable, as each team must be compared to every other team.

## Running
To compile the given TypeScript:
```sh
npm i
npm run compile
```
(replace with `bun`, `pnpm`, `yarn`, etc, whatever your preferred package manager is)

Then simply view `index.html` in a browser. For the network request that loads the data to work, you will need to run an actual HTTP server (e.g. `pyhton -m http.server`) as CORS policy forbids an XHR request on the `file` protocol.



