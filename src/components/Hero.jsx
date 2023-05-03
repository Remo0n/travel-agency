import React, { useState, useEffect } from "react";
import styled from "styled-components";
import homeImage from "../assets/hero.png";
import Autocomplete from "./Autocomplete";
import Modal from "./modal/Modal";
export default function Hero() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;
  const [checkIn, setCheckIn] = useState(todayDate);
  const [checkOut, setCheckOut] = useState("");
  const [tripDays, setTripDays] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const nightsNum = Array.from({ length: 21 }, (_, i) => i);

  useEffect(() => {
    if (checkOut && checkIn) {
      setTripDays((new Date(checkOut) - new Date(checkIn)) / 86400000);
    } else {
      setTripDays(0);
    }
  }, [checkOut, checkIn]);

  const nextFoucs = (name) => {
    let fieldIndex = name.split("-")[1];
    if (parseInt(fieldIndex, 10) < 3) {
      // Get the next input field
      const nextSibling = document.querySelector(
        `input[name=input-${parseInt(fieldIndex, 10) + 1}]`
      );

      // If found, focus the next field
      if (nextSibling !== null) {
        nextSibling.showPicker();
      }
    }
  };

  const handleCheckOutDate = (daysToAdd) => {
    console.log(daysToAdd);
    const startingDate = new Date(checkIn);
    const endingDate = new Date(
      startingDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
    );
    const endingDateString = endingDate.toISOString().slice(0, 10);
    setCheckOut(endingDateString);
  };
  return (
    <Section id="hero">
      <div className="background">
        <img src={homeImage} alt="" />
      </div>
      <div className="content">
        <div className="title">
          <h1>TRAVEL TO EXPLORE</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            natus, enim ipsam magnam odit deserunt itaque? Minima earum velit
            tenetur!
          </p>
        </div>
        <div className="search">
          <div className="container">
            <Autocomplete
              options={[
                "Cairo, Egypt",
                "Dahab, Egypt",
                "Hurgada, Egypt",
                "Sharm, Egypt",
                "Marsa Allam, Egypt",
                "Alexandria, Egypt",
              ]}
              name="input-1"
              nextFoucs={nextFoucs}
              placeholder="🔍 Search Your location..."
            />
          </div>
          <div className="container">
            <label htmlFor="">Check-in</label>
            <input
              type="date"
              name="input-2"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                nextFoucs(e.target.name);
              }}
            />
          </div>
          <div className="container">
            <label htmlFor="">Check-out</label>
            <input
              type="date"
              name="input-3"
              min={checkIn}
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
            />
          </div>
          <div className="container">
            <label htmlFor="nights">Nights:</label>
            <select
              name="nights"
              id="nights"
              value={tripDays}
              onChange={(e) => {
                setTripDays(e.target.value);
                handleCheckOutDate(e.target.value);
              }}
            >
              {nightsNum.map((num) => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="search">
          <div className="container">
            <Autocomplete
              options={[
                { nationality: "Egyptian", flag: "EG" },
                { nationality: "Deutch", flag: "DE" },
                { nationality: "Jordanian", flag: "JO" },
                { nationality: "Emirati", flag: "AE" },
                { nationality: "Tunisian", flag: "TN" },
              ]}
              flagSearch={true}
              name="input-4"
              placeholder="Nationality"
            />
          </div>
          <button className="optionsBtn" onClick={() => setOpenModal(true)}>
            More Options
          </button>
          <button>Explore Now</button>
        </div>
      </div>
      <Modal isOpen={openModal} setOpenModal={setOpenModal} />
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  margin-top: 2rem;
  width: 100%;
  height: 100%;

  .background {
    height: 100%;
    img {
      width: 100%;
      filter: brightness(60%);
    }
  }
  .content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 3;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .title {
      color: white;
      h1 {
        font-size: 3rem;
        letter-spacing: 0.2rem;
      }
      p {
        text-align: center;
        padding: 0 30vw;
        margin-top: 0.5rem;
        font-size: 1.2rem;
      }
    }
    .search {
      display: flex;
      background-color: #ffffffce;
      padding: 0.5rem;
      border-radius: 0.5rem;
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 1.5rem;
        label {
          font-size: 1.1rem;
          color: #03045e;
        }
        input {
          background-color: transparent;
          border: none;
          text-align: center;
          color: black;
          &[type="date"] {
            padding-left: 3rem;
          }

          &::placeholder {
            color: black;
          }
          &:focus {
            outline: none;
          }
        }
        select {
          background-color: white;
          border: thin solid blue;
          border-radius: 4px;
          display: inline-block;
          font: inherit;
          line-height: 1.5em;
          padding: 0.5em 3.5em 0.5em 1em;
          background-image: linear-gradient(45deg, transparent 50%, blue 50%),
            linear-gradient(135deg, blue 50%, transparent 50%),
            linear-gradient(to right, skyblue, skyblue);
          background-position: calc(100% - 20px) calc(1em + 2px),
            calc(100% - 15px) calc(1em + 2px), 100% 0;
          background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
          background-repeat: no-repeat;
          /* reset */
          margin: 0;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-appearance: none;
          -moz-appearance: none;
        }
      }

      button {
        padding: 1rem;
        cursor: pointer;
        border-radius: 0.3rem;
        border: none;
        color: white;
        background-color: #4361ee;
        font-size: 1.1rem;
        text-transform: uppercase;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #023e8a;
        }
      }
      .optionsBtn {
        margin: 0px 20px;
        background-color: #7a7871;
        &:hover {
          background-color: #838482;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 980px) {
    height: 25rem;
    .background {
      background-color: palegreen;
      img {
        height: 100%;
      }
    }
    .content {
      .title {
        h1 {
          font-size: 1rem;
        }
        p {
          font-size: 0.8rem;
          padding: 1vw;
        }
      }
      .search {
        flex-direction: column;
        padding: 0.8rem;
        gap: 0.8rem;
        /* padding: 0; */
        .container {
          padding: 0 0.8rem;
          input[type="date"] {
            padding-left: 1rem;
          }
        }
        button {
          padding: 1rem;
          font-size: 1rem;
        }
        /* display: none; */
      }
    }
  }
`;
