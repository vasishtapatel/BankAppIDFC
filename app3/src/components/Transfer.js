/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Transfer() {
  const [state, setState] = useState({
    to: "",
    from: "",
    ifscCode: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.to === state.from) {
      alert("Payer's and Reciever's account numbers cannot be same!");
      setState({ ...state, to: "", from: "", amount: "" });
    }
    let response = fetch(
      `/transfer/${state.from}/${state.to}/${state.ifscCode}/${state.amount}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((res) => {
      alert("Please check the details.");
    });

    console.log("api called");
    console.log(response);

    response
      .then((res) => {
        if (res.status === 200)
          alert(
            `amount ${state.amount} transfereed from account ${state.from} to  account number ${state.to}.`
          );
        else alert("Please check the details.");
      })
      .catch((res) => {
        alert("Something went wrong,Please check the details.");
      });
  };

  return (
    <div className="transfer" css={CSS}>
      <h1>Transfer:</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__item">
          <label htmlFor="from" className="label">
            Transfer from:
          </label>
          <input
            type="number"
            // min={100000}
            // max={999999}
            name="from"
            className="input"
            placeholder="Account Number"
            value={state.from}
            onChange={(e) => setState({ ...state, from: e.target.value })}
          />
        </div>
        <div className="form__item">
          <label htmlFor="from" className="label">
            Transfer to:
          </label>
          <input
            type="number"
            // min={100000}
            // max={999999}
            name="to"
            className="input"
            placeholder="Account Number"
            value={state.to}
            onChange={(e) => setState({ ...state, to: e.target.value })}
          />
        </div>
        <div className="form__item">
          <label htmlFor="account-no" className="label">
            Receiver Ifsc Code:
          </label>
          <input
            type="text"
            name="ifscCode"
            className="input"
            value={state.ifscCode}
            placeholder="Ifsc Code"
            onChange={(event) =>
              setState({ ...state, ifscCode: event.target.value })
            }
          />
        </div>
        <div className="form__item">
          <label htmlFor="from" className="label">
            Enter Amount:
          </label>
          <input
            type="number"
            min={1}
            name="from"
            className="input"
            placeholder="Amount"
            value={state.amount}
            onChange={(e) => setState({ ...state, amount: e.target.value })}
          />
        </div>
        <div className="form__item">
          <button type="submit" className="submit">
            Transfer
          </button>
        </div>
      </form>
    </div>
  );
}

const CSS = css`
  width: 100%;
  height: calc(100vh - 1.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgb(72, 202, 228);
  background: linear-gradient(
    180deg,
    rgba(72, 202, 228, 1) 0%,
    rgba(173, 232, 244, 1) 50%,
    rgba(202, 240, 248, 1) 100%
  );

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

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--dark-cornflower-blue);
    padding: 50px;
    margin: 0 auto;
    border-radius: 4px;
    color: white;
    font-family: "Roboto", sans-serif;
    width: 80%;
    max-width: 650px;

    .form__item {
      display: flex;
      flex-direction: column;
      padding: 5px;
      margin: 10px 0;

      .label {
        font-size: 20px;
      }

      .input {
        font-size: 18px;
        margin-top: 10px;
        padding: 5px;
        border-radius: 4px;
      }

      .submit {
        padding: 10px;
        text-transform: uppercase;
        border-radius: 4px;
        font-weight: 600;
        background: var(--navy-blue);
        color: var(--powder-blue);
        transition: all 0.3s ease;
      }

      .submit:hover {
        background-color: var(--sky-blue-crayola);
        color: var(--navy-blue);
      }

      .submit:target {
        background-color: var(--blizzard-blue;);
      }
    }
  }

  @media screen and (max-width: 780px) {
    .form {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

export default Transfer;
