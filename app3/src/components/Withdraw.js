/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";

function Withdraw() {
  const [state, setState] = useState({
    accountNo: "",
    amount: "",
    ifscCode: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();

    let response = fetch(
      `/withdraw/${state.accountNo}/${state.amount}/${state.ifscCode}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("api called");
    console.log(response);

    response
      .then((res) => {
        if (res.status === 200)
          alert(
            `Amount ${state.amount} has been withdrawn from account number ${state.accountNo}.`
          );
        else alert("Please check the details.");
      })
      .catch((res) => {
        alert("Something went wrong,Please check the details.");
      });

    setState({ ...state, accountNo: "", amount: "", ifscCode: "" });
  };

  return (
    <div className="create__user" css={CSS}>
      <h1>Withdraw</h1>
      <form onSubmit={submitHandler} className="form">
        <div className="form__item">
          <label className="label" htmlFor="name">
            Account Number:
          </label>
          <input
            type="text"
            name="accountNo"
            className="input"
            value={state.accountNo}
            placeholder="Account Number"
            onChange={(event) =>
              setState({ ...state, accountNo: event.target.value })
            }
          />
        </div>
        <div className="form__item">
          <label htmlFor="account-no" className="label">
            Ifsc Code:
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
          <label htmlFor="account-no" className="label">
            Amount:
          </label>
          <input
            type="amount"
            name="amount"
            className="input"
            min={1}
            max={999999}
            value={state.amount}
            placeholder="Enter amount"
            onChange={(event) =>
              setState({ ...state, amount: event.target.value })
            }
          />
        </div>

        <div className="form__item">
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const CSS = css`
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

export default Withdraw;
