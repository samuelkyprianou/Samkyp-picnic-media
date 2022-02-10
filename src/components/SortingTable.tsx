import { MouseEventHandler, useState } from "react";

//TYPES
type SortKeys = string;
type SortOrder = "ascn" | "desc";

//Sort button function returns the button on table headers
//styled according to sort order and sort key active.
function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        sortKey === columnKey && sortOrder === "desc"
          ? "sort-button sort-reverse"
          : "sort-button"
      }`}
    >
      ▲
    </button>
  );
}

function SortingTable({ data, sortData }) {
//create states to specify which table header is actively sorted and the current sort order (asc || desc).
const [sortKey, setSortKey] = useState<SortKeys>("id");
const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

//table headers initilised, keys matching data that has been set in APP component state
  const headers = [
    { key: "id", label: "ID" },
    { key: "name_first", label: "First Name" },
    { key: "name_last", label: "Last Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "username", label: "User Name" },
  ];

//function is called on mouse click of header sort button. Will sort data 
//by calling the sortData function passed down as prop from APP comp
//States as also set.
  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
    sortData({key, reverse: sortOrder === "desc" })
  }

  return (
    <table>
    <thead>
    <tr>
    {headers.map((row) => {
            return (
              <td key={row.key}>
                {row.label}{" "}
                <SortButton
                  columnKey={row.key}
                  onClick={() => changeSort(row.key)}
                  {...{
                    sortOrder,
                    sortKey,
                  }}
                />
              </td>
            );
            })}
    </tr>
    </thead>
    <tbody>
        {data.map((person, index) => {
          return (
            <tr key={index}>
            <td>{person.id}</td>
            <td>{person.name_first}</td>
            <td>{person.name_last}</td>
            <td>{person.age}</td>
            <td>{person.gender}</td>
            <td>{person.username}</td>
            </tr>
        );
        })}
      </tbody>
    </table>
  );
  
}

export default SortingTable;