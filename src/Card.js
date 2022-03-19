import React from "react";
import Aries from "../src/images/Aries.png";
import Taurus from "../src/images/taurus.png";
import Gemini from "../src/images/gemini.png";
import Cancer from "../src/images/cancer.png";
import Leo from "../src/images/leo.png";
import Virgo from "../src/images/virgo.png";
import Libra from "../src/images/libra.png";
import Scorpio from "../src/images/scorpio.png";
import sagittarius from "../src/images/sagittarius.png";
import Capricorn from "../src/images/capricorn.png";
import Aquarius from "../src/images/aquarius.png";
import Pisces from "../src/images/pisces.png";
import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "500px",
    width: "500px",
    transform: "translate(-50%, -50%)",
  },
};
const CardComponent = () => {
  const [data, setData] = useState({
    sign: "",
    name: "",
    email: "",
    date: "",
  });

  const horoscopeSigns = [
    { name: "Aries", img: Aries },
    { name: "Taurus", img: Taurus },
    { name: "Gemini", img: Gemini },
    { name: "Cancer", img: Cancer },
    { name: "Leo", img: Leo },
    { name: "Virgo", img: Virgo },
    { name: "Libra", img: Libra },
    { name: "Scorpio", img: Scorpio },
    { name: "sagittarius", img: sagittarius },
    { name: "Capricorn", img: Capricorn },
    { name: "Aquarius", img: Aquarius },
    { name: "Pisces", img: Pisces },
  ];
  const [horoscopeData, setHoroscopeData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectSign, setSelectSign] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const closeMOdal = () => {
    setOpenModal(false);
  };

  const onSubmit = () => {
    if (selectSign == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Select Sign!",
      });
      return;
    }

    if (name == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter Username!",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Select Email!",
      });
      return;
    }

    if (selectedDate == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Select Date!",
      });
      return;
    }
    var options = {
      method: "POST",
      url: "https://sameer-kumar-aztro-v1.p.rapidapi.com/",
      params: { sign: selectSign, day: selectedDate },
      headers: {
        "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        "x-rapidapi-key": "456913741cmshf5657862acd2282p15246bjsnf5d53de505aa",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        setHoroscopeData(response.data);
        setOpenModal(true);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Check your Internet Connection",
        });
        console.error(error);
      });
  };

  const onCacel = () => {
    setSelectSign("");
    setSelectedDate("");
    setName("");
    setHoroscopeData({});
  };
  return (
    <div className="main-background">
      <h1 className="text-center  mb-2 heading-text"> Astrology </h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 p-3 border rounded shadow ms-4">
            <div className={`row`} row>
              <h5 className="text-center text-warning">
                {" "}
                Choose Your Zodic Sign{horoscopeData.color}
              </h5>
              {horoscopeSigns.map((item, index) => {
                return (
                  <div
                    className="col-lg-3  mt-3"
                    onClick={() => {
                      setSelectSign(item.name);
                      setImage(item.img);
                    }}
                  >
                    <div className="">
                      <div
                        className="background"
                        style={
                          item.name == selectSign
                            ? { boxShadow: "0 0 20px black" }
                            : { boxShadow: "none" }
                        }
                      >
                        <img
                          className="card-img-top sign"
                          style={{
                            width: "70px",
                            height: "70px",
                            display: "flex",
                            margin: "auto",
                            padding: "10px",
                          }}
                          src={item.img}
                          alt="Card image cap"
                        />
                      </div>
                      <div className="card-body">
                        <div
                          className="card-text text-white "
                          style={{ textAlign: "center", fontWeight: "bold" }}
                        >
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form strat here */}

          <div className="col-lg-6 ms-4 border rounded shadow p-3">
            <div className="">
              <h5 className="text-center text-warning">Enter Your Detailes </h5>
              <div className="col-lg-12 mt-3 mb-5">
                <input
                  type="text"
                  placeholder="User Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-lg-12 mb-5">
                <input
                  type="mail"
                  placeholder="Enter Email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-lg-12 text-center mt-5">
                <div className="row">
                  <div className="col-lg-4">
                    <button
                      className="btn btn-outline-warning text-white ps-4 pe-4"
                      onClick={() => setSelectedDate("today")}
                    >
                      Today{" "}
                    </button>
                  </div>
                  <div className="col-lg-4">
                    <button
                      className="btn btn-outline-warning text-white ps-4 pe-4"
                      onClick={() => setSelectedDate("tomorrow")}
                    >
                      {" "}
                      Tommorow{" "}
                    </button>
                  </div>
                  <div className="col-lg-4">
                    <button
                      className="btn btn-outline-warning text-white ps-4 pe-4"
                      onClick={() => setSelectedDate("Yesturday")}
                    >
                      {" "}
                      Yesturday{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 text-center mt-5">
                <div className="row">
                  <div className="col-lg-6 mt-5">
                    <button
                      className="btn btn-success btn-lg mt-5  px-5"
                      onClick={onSubmit}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="col-lg-6 mt-5">
                    <button
                      className="btn btn-danger btn-lg mt-5 px-5"
                      onClick={onCacel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeMOdal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="col-lg-12">
          <div class="card">
            <img
              class="card-img-top"
              src={image}
              style={{
                height: "120px",
                width: "120px",
                padding: "15px",
                margin: "auto",
                marginTop: "10px",
                border: "1px solid black",
                background: "linear-gradient(#66ebff, #d734f7)",
                borderRadius: "50%",
              }}
              alt="Card image cap"
            />
            <div class="card-body">
              <p> User Name : {name} </p>
              <p> Sign : {horoscopeData?.compatibility} </p>
              <p> Current Date : {horoscopeData?.current_date} </p>
              <p> Lucky_number : {horoscopeData?.lucky_number}</p>
              <p
                style={{
                  backgroundColor: `${horoscopeData?.color}`,
                  padding: "10px",
                }}
              >
                {" "}
                Discription : {horoscopeData.description}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardComponent;
