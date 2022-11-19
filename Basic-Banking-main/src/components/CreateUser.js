/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";

function CreateUser() {
  const [state, setState] = useState({
    name: "",
    accountNo: "",
    balance: "",
    ifscCode: "",
    custid: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();

    let response = fetch("/adduser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        custName: state.name,
        accNo: parseInt(state.accountNo),
        balance: parseInt(state.balance),
        custid: parseInt(state.custid),
        ifscCode: state.ifscCode,
        city: "hyd",
      }),
    });

    console.log("api called");
    console.log(response);

    response
      .then((res) => {
        if (res.status === 200)
          alert(
            `User ${state.name} with account number ${state.accountNo} added into db.`
          );
        else alert("Please check the details.");
      })
      .catch((res) => {
        alert("Something went wrong,Please check the details.");
      });
    setState({
      ...state,
      name: "",
      accountNo: "",
      balance: "",
      ifscCode: "",
      custid: "",
    });
  };

  return (
    <div className="create__user" css={CSS}>
      <h1>Add Customer</h1>
      <form onSubmit={submitHandler} className="form">
        <div className="form__item">
          <label className="label" htmlFor="name">
            Enter Full Name:
          </label>
          <input
            type="text"
            name="name"
            className="input"
            value={state.name}
            placeholder="Full Name"
            onChange={(event) =>
              setState({ ...state, name: event.target.value })
            }
          />
        </div>
        <div className="form__item">
          <label htmlFor="account-no" className="label">
            Enter Account Number:
          </label>
          <input
            type="number"
            name="account-no"
            className="input"
            min={100000}
            max={999999}
            value={state.accountNo}
            placeholder="6-digit Account Number"
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
            Cust Id:
          </label>
          <input
            type="text"
            name="custid"
            className="input"
            value={state.custid}
            placeholder="Custid"
            onChange={(event) =>
              setState({ ...state, custid: event.target.value })
            }
          />
        </div>
        <div className="form__item">
          <label htmlFor="balance" className="label">
            Enter Balance:
          </label>
          <input
            type="number"
            name="balance"
            className="input"
            min={0}
            value={state.balance}
            placeholder="Enter Balance"
            onChange={(event) =>
              setState({ ...state, balance: event.target.value })
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

export default CreateUser;
