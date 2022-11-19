/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState, useEffect } from "react";

function Transactions() {
  const [state, setState] = useState([]);

  useEffect(() => {
    var response = fetchData();
    response
      .then((res) => {
        if (res.status === 200) {
          console.log("fetched transactions");
          return res.json();
        } else alert("Something went wrong.");
      })
      .then((data) => {
        console.log(data);
        setState(data);
      })
      .catch((res) => {
        alert("Something went wrong,Please check the details.");
      });
  }, []);

  const fetchData = () => {
    let response = fetch("/transactions", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((res) => {
      alert("Please check the details.");
    });

    console.log("api called");
    console.log(response);

    return response;
  };

  return (
    <div className="transactions" css={CSS}>
      <h1>Transactions History</h1>
      <div className="table">
        <table>
          <thead>
            <tr key={"id-1"}>
              <td>UID</td>
              <td>Payer</td>
              <td>Receiver</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {state.map((obj, i) => (
              <tr key={`id${i}`} className={i % 2 === 0 ? "" : "light"}>
                <td>{i + 1}</td>
                <td>{obj.accNo1}</td>
                <td>{obj.accNo2}</td>
                <td>{obj.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const CSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: rgb(72, 202, 228);
  background: linear-gradient(
    180deg,
    rgba(72, 202, 228, 1) 0%,
    rgba(173, 232, 244, 1) 50%,
    rgba(202, 240, 248, 1) 100%
  );
  font-family: "Roboto", sans-serif;

  h1 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: "Roboto", sans-serif;
    font-size: 3rem;
    color: var(--star-command-blue);
    text-decoration: underline;
  }

  @media screen and (max-width: 400px) {
    h1 {
      font-size: 2.5rem;
    }
  }

  .table {
    display: table;
    overflow: scroll;
    height: 100vh;

    table {
      table-layout: fixed;
      color: var(--powder-blue);
      margin: 2rem 0;
      border-collapse: collapse;
      border: 1px solid black;

      thead {
        background-color: var(--navy-blue);

        tr {
          td {
            padding: 10px;
            text-align: center;
            font-weight: 700;
          }
        }
      }

      tbody {
        background-color: var(--cerulean-crayola);

        tr {
          td {
            padding: 10px;
            border-right: 1px solid var(--navy-blue);
            text-align: right;
          }
        }

        .light {
          background-color: var(--sky-blue-crayola);
        }
      }
    }
  }
`;

export default Transactions;
