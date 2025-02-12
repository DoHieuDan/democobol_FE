/** @format */

import {
  type ChangeEvent,
  useState,
  type KeyboardEvent,
  useEffect,
} from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import httpConfig from "../../config/httpConfig";

import { GridItem } from "../../components/GridSystem";
import Input from "../../components/Input";
import { dateFormat, timeFormat } from "../../utils/dateTimeFormat";

export default function COUSR03() {
  type formInput = {
    userId: string;
  };

  type formOutput = {
    cousr03: string;
    cousr3a: string;
    trnname: string;
    title01: string;
    curdate: string;
    pgmname: string;
    title02: string;
    curtime: string;
    firstName: string;
    lastName: string;
    role: string;
    errmsg: string;
  };

  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    const handleKeyDown = (event) => {
      // switch (event.key) {
      //   case "F4":
      //     setFormData({ userId: "" });
      //     setReceivedData((prevState) => ({
      //       ...prevState,
      //       firstName: "",
      //       lastName: "",
      //       role: "",
      //       errmsg: "",
      //     }));
      //     break;
      // }
      if (event.key === "F4") {
        setFormData({ userId: "" });
        setReceivedData((prevState) => ({
          ...prevState,
          firstName: "",
          lastName: "",
          role: "",
          errmsg: "",
        }));
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [formData, setFormData] = useState<formInput>({
    userId: "",
  });
  const [receivedData, setReceivedData] = useState<formOutput>({
    cousr03: "",
    cousr3a: "",
    trnname: "",
    title01: "",
    curdate: "",
    pgmname: "",
    title02: "",
    curtime: "",
    firstName: "",
    lastName: "",
    role: "",
    errmsg: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!formData.userId) {
        setReceivedData((prevState) => ({
          ...prevState,
          errmsg: "User ID is empty",
        }));
        return;
      }

      try {
        const response = await axios.get(
          `${httpConfig.domain}/api/v1/user/${formData.userId}`
        );
        // Kiểm tra nếu response có dữ liệu hợp lệ
        if (response.data.code === 200 && response.data.result) {
          const { firstName, lastName, role } = response.data.result;
          setReceivedData((prevState) => ({
            ...prevState,
            firstName: firstName.trim(), // Loại bỏ khoảng trắng thừa
            lastName: lastName.trim(),
            role,
            errmsg: "", // Xóa thông báo lỗi nếu có
          }));
        }
      } catch (error) {
        setReceivedData((prevState) => ({
          ...prevState,
          errmsg: (error as any)?.response?.data.message,
        }));
      }
    } else if (event.key === "F5") {
      event.preventDefault();
      try {
        const response = await axios.delete(
          `${httpConfig.domain}/api/v1/user/${formData.userId}`
        );
        if (response.data.code === 200) {
          setFormData({ userId: "" }); // Xóa userId sau khi xóa user thành công
          setReceivedData((prevState) => ({
            ...prevState,
            firstName: "",
            lastName: "",
            role: "",
            errmsg: response.data.message,
          }));
        } else {
          setReceivedData((prevState) => ({
            ...prevState,
            errmsg: response.data.message,
          }));
        }
      } catch (error) {
        // console.error("A", error);
        setReceivedData((prevState) => ({
          ...prevState,
          errmsg: (error as any)?.response?.data.message,
        }));
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>COUSR03</title>
      </Helmet>

      <GridItem col={1} row={1}>
        <pre style={{ color: "#7faded" }}>Tran:</pre>
      </GridItem>

      <GridItem col={7} row={1}>
        <pre style={{ color: "#7faded" }}>{receivedData.trnname}</pre>
      </GridItem>

      <GridItem col={21} row={1}>
        <pre style={{ color: "yellow" }}>{receivedData.title01}</pre>
      </GridItem>

      <GridItem col={65} row={1}>
        <pre style={{ color: "#7faded" }}>Date:</pre>
      </GridItem>

      <GridItem row={1} col={71}>
        <p>
          {dateFormat(currentDateTime)}
          <br />
          {timeFormat(currentDateTime)}
        </p>
      </GridItem>

      <GridItem col={1} row={2}>
        <pre style={{ color: "#7faded" }}>Prog:</pre>
      </GridItem>

      <GridItem col={7} row={2}>
        <pre style={{ color: "#7faded" }}>{receivedData.pgmname}</pre>
      </GridItem>

      <GridItem col={21} row={2}>
        <pre style={{ color: "yellow" }}>{receivedData.title02}</pre>
      </GridItem>

      <GridItem col={65} row={2}>
        <pre style={{ color: "#7faded" }}>Time:</pre>
      </GridItem>

      <GridItem col={71} row={2}>
        <pre style={{ color: "#7faded" }}>{receivedData.curtime}</pre>
      </GridItem>

      <GridItem col={35} row={4}>
        <pre style={{ color: "neutral" }}>Delete User</pre>
      </GridItem>

      <GridItem col={6} row={6}>
        <pre style={{ color: "green" }}>Enter User ID:</pre>
      </GridItem>

      <GridItem col={21} row={6}>
        <input
          maxLength={8}
          className="bms underLine"
          name="userId"
          id="userId"
          value={formData.userId}
          type="text"
          style={{ color: "green" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={30} row={6}>
        <pre></pre>
      </GridItem>

      <GridItem col={6} row={8}>
        <pre style={{ color: "yellow" }}>
          **********************************************************************
        </pre>
      </GridItem>

      <GridItem col={6} row={11}>
        <pre style={{ color: "turquoise" }}>First Name:</pre>
      </GridItem>

      <GridItem col={18} row={11}>
        <pre style={{ color: "#7faded" }}>{receivedData.firstName}</pre>
      </GridItem>

      <GridItem col={39} row={11}>
        <pre></pre>
      </GridItem>

      <GridItem col={6} row={13}>
        <pre style={{ color: "turquoise" }}>Last Name:</pre>
      </GridItem>

      <GridItem col={18} row={13}>
        <pre style={{ color: "#7faded" }}>{receivedData.lastName}</pre>
      </GridItem>

      <GridItem col={39} row={13}>
        <pre style={{ color: "green" }}></pre>
      </GridItem>

      <GridItem col={6} row={15}>
        <pre style={{ color: "turquoise" }}>User Type:</pre>
      </GridItem>

      <GridItem col={17} row={15}>
        <pre style={{ color: "#7faded" }}>{receivedData.role}</pre>
      </GridItem>

      <GridItem col={19} row={15}>
        <pre style={{ color: "#7faded" }}>(A=Admin, U=User)</pre>
      </GridItem>

      <GridItem col={1} row={23}>
        <pre style={{ color: "red" }}>{receivedData.errmsg}</pre>
      </GridItem>

      <GridItem col={1} row={24}>
        <pre style={{ color: "yellow" }}>
          ENTER=Fetch F3=Back F4=Clear F5=Delete
        </pre>
      </GridItem>
    </>
  );
}
