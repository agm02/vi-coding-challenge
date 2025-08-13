import { css } from "lit";

export const cardStyles = css`
  .card {
    padding: 8px;
    border: 2.5px solid black;
  }`;

export const globalStyles = css`
  p {
    margin: 0;
    padding-bottom: 8px;
  }

  h1 {
    font-weight: normal;
  }

  .circle-color-type {
    width: 12px;
    aspect-ratio: 1;
    border-radius: 50%;
    margin-left: 5px;
  }

  .round-button {
    border-radius: 50%;
    width: 35px;
    aspect-ratio: 1;
    border: none;
    background-color: #263238;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 8px;

    &:hover {
      background-color: #1f292eff;
    }

    &:disabled {
      cursor: auto;
      opacity: 0.5;
    }
  }

  .flip {
    transform: scaleX(-1);
  }
`