import React, { useState, useEffect } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";

import axios from "axios";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [user, setUser] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [changeUser, setChangeUser] = useState(true);
  const [userList, setUserList] = useState([]);
  const userImg = user?.picture?.medium;

  const getUser = async () => {
    const { data } = await axios(url);
    setUser(data.results[0]);
  };
  console.log(user);

  useEffect(() => {
    getUser();
  }, []);
  const showName = (e) => {
    setTitle(e.target.name);
    setDescription(
      user.name.title + " " + user.name.first + " " + user.name.last
    );
  };

  const showEmail = (e) => {
    setTitle(e.target.name);
    setDescription(user.email);
  };

  const change = () => {
    setChangeUser(!changeUser);
    console.log(changeUser);
  };

  const add = () => {
    userList.includes(user) || setUserList([...userList, user]);
  };

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={userImg} alt="random user" className="user-img" />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{description}</p>
          <div className="values-list">
            <button className="icon" name="name" onClick={showName}>
              <img
                src={user?.gender == "female" ? womanSvg : manSvg}
                alt="user"
                id="iconImg"
                name="name"
              />
            </button>
            <button className="icon" name="email" onClick={showEmail}>
              <img src={mailSvg} alt="mail" id="iconImg" name="email" />
            </button>
            <button className="icon" name="age">
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" name="street">
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" name="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" name="password">
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={add}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item) => {
                return (
                  <tr key={item.id.value}>
                    <td>{item.name.first}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.dob.age} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
    </main>
  );
}

export default App;
