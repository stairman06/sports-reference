interface WinLossData {
  [team: string]: {
    [opponent: string]: { W: number; L: number };
  };
}

/**
 * Utility function for generating <th> elements
 * @param text text of element
 * @returns <th> element
 */
function $th(text: string): HTMLTableCellElement {
  const $el = document.createElement("th");
  $el.innerText = text;
  return $el;
}

/**
 * Generate table given win-loss data
 * @param data win-loss data
 * @returns <table> of win-loss data
 */
function generateTable(data: WinLossData): HTMLTableElement {
  const allTeams = Object.keys(data);

  const $table = document.createElement("table");

  const $header = document.createElement("thead");
  const $footer = document.createElement("tfoot");
  const $body = document.createElement("tbody");

  const TEAM_LABEL = "Tm";

  $header.appendChild($th(TEAM_LABEL));
  $footer.appendChild($th(TEAM_LABEL));

  $table.appendChild($header);

  for (const team of allTeams) {
    $header.appendChild($th(team));
    $footer.appendChild($th(team));

    const $row = document.createElement("tr");
    $row.appendChild($th(team));

    const teamData = data[team];
    for (const opponent of allTeams) {
      const $td = document.createElement("td");
      if (team === opponent) {
        $td.innerText = "--";
      } else {
        const opponentData = teamData[opponent];
        $td.innerText = opponentData.W + "";
      }

      $row.appendChild($td);
    }
    $body.appendChild($row);
  }

  $table.appendChild($header);
  $table.appendChild($body);
  $table.appendChild($footer);

  return $table;
}

// Assumes data is well-formed and exists
async function getData(): Promise<WinLossData> {
  return (await (await fetch("data.json")).json()) as WinLossData;
}

async function render() {
  document
    .getElementById("table-dest")!
    .appendChild(generateTable(await getData()));
}

render();
