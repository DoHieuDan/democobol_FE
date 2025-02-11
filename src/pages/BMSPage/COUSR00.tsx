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

export default function COUSR00() {
  type formInput = {
    usridin: string;
    sel0001: string;
    sel0002: string;
    sel0003: string;
    sel0004: string;
    sel0005: string;
    sel0006: string;
    sel0007: string;
    sel0008: string;
    sel0009: string;
    sel0010: string;
  };

  type formOutput = {
    cousr00: string;
    cousr0a: string;
    trnname: string;
    title01: string;
    curdate: string;
    pgmname: string;
    title02: string;
    curtime: string;
    pagenum: string;
    usrid01: string;
    fname01: string;
    lname01: string;
    utype01: string;
    usrid02: string;
    fname02: string;
    lname02: string;
    utype02: string;
    usrid03: string;
    fname03: string;
    lname03: string;
    utype03: string;
    usrid04: string;
    fname04: string;
    lname04: string;
    utype04: string;
    usrid05: string;
    fname05: string;
    lname05: string;
    utype05: string;
    usrid06: string;
    fname06: string;
    lname06: string;
    utype06: string;
    usrid07: string;
    fname07: string;
    lname07: string;
    utype07: string;
    usrid08: string;
    fname08: string;
    lname08: string;
    utype08: string;
    usrid09: string;
    fname09: string;
    lname09: string;
    utype09: string;
    usrid10: string;
    fname10: string;
    lname10: string;
    utype10: string;
    errmsg: string;
  };

  const [formData, setFormData] = useState<formInput>({
    usridin: "",
    sel0001: "",
    sel0002: "",
    sel0003: "",
    sel0004: "",
    sel0005: "",
    sel0006: "",
    sel0007: "",
    sel0008: "",
    sel0009: "",
    sel0010: "",
  });
  const [receivedData, setReceivedData] = useState<formOutput>({
    cousr00: "",
    cousr0a: "",
    trnname: "",
    title01: "",
    curdate: "mm/dd/yy",
    pgmname: "",
    title02: "",
    curtime: "hh:mm:ss",
    pagenum: " ",
    usrid01: " ",
    fname01: " ",
    lname01: " ",
    utype01: " ",
    usrid02: " ",
    fname02: " ",
    lname02: " ",
    utype02: " ",
    usrid03: " ",
    fname03: " ",
    lname03: " ",
    utype03: " ",
    usrid04: " ",
    fname04: " ",
    lname04: " ",
    utype04: " ",
    usrid05: " ",
    fname05: " ",
    lname05: " ",
    utype05: " ",
    usrid06: " ",
    fname06: " ",
    lname06: " ",
    utype06: " ",
    usrid07: " ",
    fname07: " ",
    lname07: " ",
    utype07: " ",
    usrid08: " ",
    fname08: " ",
    lname08: " ",
    utype08: " ",
    usrid09: " ",
    fname09: " ",
    lname09: " ",
    utype09: " ",
    usrid10: " ",
    fname10: " ",
    lname10: " ",
    utype10: " ",
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

  let currentPage = 1;

  //   const handleSubmit = async (event: KeyboardEvent<HTMLInputElement>) => {
  //     switch (event.key) {
  //       case "Enter": // Gửi API khi nhấn Enter
  //         for (const key in formData) {
  //           if (!formData[key]) {
  //             return;
  //           }
  //         }

  //         try {
  //           const response = await axios.get(
  //             `${httpConfig.domain}/api/v1/users/10/${currentPage}`
  //           );
  //           console.log(response);
  //           const users = response.data;

  //           // Đảm bảo có đủ 10 mục trong danh sách
  //           const maxEntries = 10;
  //           const filledUsers = Array.from(
  //             { length: maxEntries },
  //             (_, index) =>
  //               users[index] || {
  //                 userId: "",
  //                 firstName: "",
  //                 lastName: "",
  //                 role: "",
  //               }
  //           );

  //           // const updatedData: formOutput = {
  //           //   cousr00: "",
  //           //   cousr0a: "",
  //           //   trnname: "",
  //           //   title01: "",
  //           //   curdate: new Date().toLocaleDateString(),
  //           //   pgmname: "",
  //           //   title02: "",
  //           //   curtime: new Date().toLocaleTimeString(),
  //           //   pagenum: currentPage.toString(),
  //           //   errmsg: "",
  //           //   ...Object.fromEntries(
  //           //     filledUsers.flatMap((user, index) => [
  //           //       [`usrid0${index + 1}`, user.userId],
  //           //       [`fname0${index + 1}`, user.firstName],
  //           //       [`lname0${index + 1}`, user.lastName],
  //           //       [`utype0${index + 1}`, user.role],
  //           //     ])
  //           //   ),
  //           // };

  //           // setReceivedData(updatedData);
  //           setReceivedData((prevState) => ({
  //             ...prevState,
  //             cousr00: "",
  //             cousr0a: "",
  //             trnname: "",
  //             title01: "",
  //             curdate: new Date().toLocaleDateString(),
  //             pgmname: "",
  //             title02: "",
  //             curtime: new Date().toLocaleTimeString(),
  //             pagenum: currentPage.toString(),
  //             errmsg: "",
  //             ...Object.fromEntries(
  //               filledUsers.flatMap((user, index) => [
  //                 [`usrid0${index + 1}`, user.userId],
  //                 [`fname0${index + 1}`, user.firstName],
  //                 [`lname0${index + 1}`, user.lastName],
  //                 [`utype0${index + 1}`, user.role],
  //               ])
  //             ),
  //           }));
  //         } catch (error) {
  //           console.error("Lỗi khi gửi API:", error);
  //         }
  //         break;

  //       case "F3": // Quay lại trang trước
  //         console.log("F3: Back");
  //         window.history.back();
  //         break;

  //       case "F7": // Lùi về trước (Backward) nhưng không nhỏ hơn 1
  //         if (currentPage > 1) {
  //           currentPage--;
  //           console.log(`F7: Backward to page ${currentPage}`);
  //         }
  //         break;

  //       case "F8": // Tiến tới trước (Forward)
  //         currentPage++;
  //         console.log(`F8: Forward to page ${currentPage}`);
  //         break;

  //       default:
  //         break;
  //     }
  //   };

  const handleSubmit = async (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const inputId = event.currentTarget.value.trim();

    switch (key) {
      case "Enter":
        if (!inputId) return;
        try {
          const response = await axios.get(
            `${httpConfig.domain}/api/v1/user/${inputId}`
          );
          const user = response.data;
          setReceivedData((prevState) => ({
            ...prevState,
            cousr00: "",
            cousr0a: "",
            trnname: "",
            title01: "",
            curdate: new Date().toLocaleDateString(),
            pgmname: "",
            title02: "",
            curtime: new Date().toLocaleTimeString(),
            pagenum: currentPage.toString(),
            errmsg: "",
            usrid01: user.userId,
            fname01: user.firstName,
            lname01: user.lastName,
            utype01: user.role,
          }));
        } catch (error) {
          console.error("Lỗi khi gửi API getById:", error);
        }
        break;
      case "F3":
        console.log("F3: Back");
        window.history.back();
        break;
      case "F7":
        event.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          fetchUserList(currentPage);
          //   console.log(`F7: Backward to page ${currentPage}`);
        }
        break;
      case "F8":
        event.preventDefault();
        currentPage++;
        fetchUserList(currentPage);
        console.log(`F8: Forward to page ${currentPage}`);
        break;
    }
  };
  const fetchUserList = async (page) => {
    try {
      const response = await axios.get(
        `${httpConfig.domain}/api/v1/users/10/${page}`
      );
      console.log(response?.data);
      const users = response?.data.users;
      const maxEntries = 10;
      const filledUsers = Array.from(
        { length: maxEntries },
        (_, index) =>
          users[index] || {
            userId: "",
            firstName: "",
            lastName: "",
            role: "",
          }
      );

      setReceivedData((prevState) => ({
        ...prevState,
        ...Object.fromEntries(
          filledUsers.flatMap((user, index) => [
            [`usrid0${index + 1}`, user.userId],
            [`fname0${index + 1}`, user.firstName],
            [`lname0${index + 1}`, user.lastName],
            [`utype0${index + 1}`, user.role],
          ])
        ),
      }));
    } catch (error) {
      console.error("Cannot get user list", error);
    }
  };

  useEffect(() => {
    fetchUserList(currentPage);
  }, [currentPage]);

  return (
    <>
      <Helmet>
        <title>COUSR00</title>
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

      <GridItem col={71} row={1}>
        <pre style={{ color: "#7faded" }}>{receivedData.curdate}</pre>
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
        <pre style={{ color: "neutral" }}>List Users</pre>
      </GridItem>

      <GridItem col={65} row={4}>
        <pre style={{ color: "turquoise" }}>Page:</pre>
      </GridItem>

      <GridItem col={71} row={4}>
        <pre style={{ color: "#7faded" }}>{receivedData.pagenum}</pre>
      </GridItem>

      <GridItem col={5} row={6}>
        <pre style={{ color: "turquoise" }}>Search User ID:</pre>
      </GridItem>

      <GridItem col={21} row={6}>
        <input
          maxLength={8}
          className="bms underLine"
          name="usridin"
          id="usridin"
          type="text"
          style={{ color: "green" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={30} row={6}>
        <pre></pre>
      </GridItem>

      <GridItem col={5} row={8}>
        <pre style={{ color: "neutral" }}>Sel</pre>
      </GridItem>

      <GridItem col={12} row={8}>
        <pre style={{ color: "neutral" }}>User ID</pre>
      </GridItem>

      <GridItem col={24} row={8}>
        <pre style={{ color: "neutral" }}>First Name</pre>
      </GridItem>

      <GridItem col={48} row={8}>
        <pre style={{ color: "neutral" }}>Last Name</pre>
      </GridItem>

      <GridItem col={72} row={8}>
        <pre style={{ color: "neutral" }}>Type</pre>
      </GridItem>

      <GridItem col={5} row={9}>
        <pre style={{ color: "neutral" }}>---</pre>
      </GridItem>

      <GridItem col={12} row={9}>
        <pre style={{ color: "neutral" }}>--------</pre>
      </GridItem>

      <GridItem col={24} row={9}>
        <pre style={{ color: "neutral" }}>--------------------</pre>
      </GridItem>

      <GridItem col={48} row={9}>
        <pre style={{ color: "neutral" }}>--------------------</pre>
      </GridItem>

      <GridItem col={72} row={9}>
        <pre style={{ color: "neutral" }}>----</pre>
      </GridItem>

      <GridItem col={6} row={10}>
        <input
          maxLength={1}
          className="bms underLine"
          name="sel0001"
          id="sel0001"
          type="text"
          style={{ color: "green", width: "20px" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={8} row={10}>
        <pre></pre>
      </GridItem>

      <GridItem col={12} row={10}>
        <pre style={{ color: "#7faded" }}>{receivedData.usrid01}</pre>
      </GridItem>

      <GridItem col={24} row={10}>
        <pre style={{ color: "#7faded" }}>{receivedData.fname01}</pre>
      </GridItem>

      <GridItem col={48} row={10}>
        <pre style={{ color: "#7faded" }}>{receivedData.lname01}</pre>
      </GridItem>

      <GridItem col={73} row={10}>
        <pre style={{ color: "#7faded" }}>{receivedData.utype01}</pre>
      </GridItem>

      <GridItem col={6} row={11}>
        <input
          maxLength={1}
          className="bms underLine"
          name="sel0002"
          id="sel0002"
          type="text"
          style={{ color: "green", width: "20px" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={8} row={11}>
        <pre></pre>
      </GridItem>

      <GridItem col={12} row={11}>
        <pre style={{ color: "#7faded" }}>{receivedData.usrid02}</pre>
      </GridItem>

      <GridItem col={24} row={11}>
        <pre style={{ color: "#7faded" }}>{receivedData.fname02}</pre>
      </GridItem>

      <GridItem col={48} row={11}>
        <pre style={{ color: "#7faded" }}>{receivedData.lname02}</pre>
      </GridItem>

      <GridItem col={73} row={11}>
        <pre style={{ color: "#7faded" }}>{receivedData.utype02}</pre>
      </GridItem>

      <GridItem col={6} row={12}>
        <input
          maxLength={1}
          className="bms underLine"
          name="sel0003"
          id="sel0003"
          type="text"
          style={{ color: "green", width: "20px" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={8} row={12}>
        <pre></pre>
      </GridItem>

      <GridItem col={12} row={12}>
        <pre style={{ color: "#7faded" }}>{receivedData.usrid03}</pre>
      </GridItem>

      <GridItem col={24} row={12}>
        <pre style={{ color: "#7faded" }}>{receivedData.fname03}</pre>
      </GridItem>

      <GridItem col={48} row={12}>
        <pre style={{ color: "#7faded" }}>{receivedData.lname03}</pre>
      </GridItem>

      <GridItem col={73} row={12}>
        <pre style={{ color: "#7faded" }}>{receivedData.utype03}</pre>
      </GridItem>

      <GridItem col={6} row={13}>
        <input
          maxLength={1}
          className="bms underLine"
          name="sel0004"
          id="sel0004"
          type="text"
          style={{ color: "green", width: "20px" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={8} row={13}>
        <pre></pre>
      </GridItem>

      <GridItem col={12} row={13}>
        <pre style={{ color: "#7faded" }}>{receivedData.usrid04}</pre>
      </GridItem>

      <GridItem col={24} row={13}>
        <pre style={{ color: "#7faded" }}>{receivedData.fname04}</pre>
      </GridItem>

      <GridItem col={48} row={13}>
        <pre style={{ color: "#7faded" }}>{receivedData.lname04}</pre>
      </GridItem>

      <GridItem col={73} row={13}>
        <pre style={{ color: "#7faded" }}>{receivedData.utype04}</pre>
      </GridItem>

      <GridItem col={6} row={14}>
        <input
          maxLength={1}
          className="bms underLine"
          name="sel0005"
          id="sel0005"
          type="text"
          style={{ color: "green", width: "20px" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={8} row={14}>
        <pre></pre>
      </GridItem>

      <GridItem col={12} row={14}>
        <pre style={{ color: "#7faded" }}>{receivedData.usrid05}</pre>
      </GridItem>

      <GridItem col={24} row={14}>
        <pre style={{ color: "#7faded" }}>{receivedData.fname05}</pre>
      </GridItem>

      <GridItem col={48} row={14}>
        <pre style={{ color: "#7faded" }}>{receivedData.lname05}</pre>
      </GridItem>

      <GridItem col={73} row={14}>
        <pre style={{ color: "#7faded" }}>{receivedData.utype05}</pre>
      </GridItem>

      <GridItem col={6} row={15}>
        <input
          maxLength={1}
          className="bms underLine"
          name="sel0006"
          id="sel0006"
          type="text"
          style={{ color: "green", width: "20px" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={8} row={15}>
        <pre></pre>
      </GridItem>

      <GridItem col={12} row={15}>
        <pre style={{ color: "#7faded" }}>{receivedData.usrid06}</pre>
      </GridItem>

      <GridItem col={24} row={15}>
        <pre style={{ color: "#7faded" }}>{receivedData.fname06}</pre>
      </GridItem>

      <GridItem col={48} row={15}>
        <pre style={{ color: "#7faded" }}>{receivedData.lname06}</pre>
      </GridItem>

      <GridItem col={73} row={15}>
        <pre style={{ color: "#7faded" }}>{receivedData.utype06}</pre>
      </GridItem>

      <GridItem col={6} row={16}>
        <input
          maxLength={1}
          className="bms underLine"
          name="sel0007"
          id="sel0007"
          type="text"
          style={{ color: "green", width: "20px" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={8} row={16}>
        <pre></pre>
      </GridItem>

      <GridItem col={12} row={16}>
        <pre style={{ color: "#7faded" }}>{receivedData.usrid07}</pre>
      </GridItem>

      <GridItem col={24} row={16}>
        <pre style={{ color: "#7faded" }}>{receivedData.fname07}</pre>
      </GridItem>

      <GridItem col={48} row={16}>
        <pre style={{ color: "#7faded" }}>{receivedData.lname07}</pre>
      </GridItem>

      <GridItem col={73} row={16}>
        <pre style={{ color: "#7faded" }}>{receivedData.utype07}</pre>
      </GridItem>

      <GridItem col={6} row={17}>
        <input
          maxLength={1}
          className="bms underLine"
          name="sel0008"
          id="sel0008"
          type="text"
          style={{ color: "green", width: "20px" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={8} row={17}>
        <pre></pre>
      </GridItem>

      <GridItem col={12} row={17}>
        <pre style={{ color: "#7faded" }}>{receivedData.usrid08}</pre>
      </GridItem>

      <GridItem col={24} row={17}>
        <pre style={{ color: "#7faded" }}>{receivedData.fname08}</pre>
      </GridItem>

      <GridItem col={48} row={17}>
        <pre style={{ color: "#7faded" }}>{receivedData.lname08}</pre>
      </GridItem>

      <GridItem col={73} row={17}>
        <pre style={{ color: "#7faded" }}>{receivedData.utype08}</pre>
      </GridItem>

      <GridItem col={6} row={18}>
        <input
          maxLength={1}
          className="bms underLine"
          name="sel0009"
          id="sel0009"
          type="text"
          style={{ color: "green", width: "20px" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={8} row={18}>
        <pre></pre>
      </GridItem>

      <GridItem col={12} row={18}>
        <pre style={{ color: "#7faded" }}>{receivedData.usrid09}</pre>
      </GridItem>

      <GridItem col={24} row={18}>
        <pre style={{ color: "#7faded" }}>{receivedData.fname09}</pre>
      </GridItem>

      <GridItem col={48} row={18}>
        <pre style={{ color: "#7faded" }}>{receivedData.lname09}</pre>
      </GridItem>

      <GridItem col={73} row={18}>
        <pre style={{ color: "#7faded" }}>{receivedData.utype09}</pre>
      </GridItem>

      <GridItem col={6} row={19}>
        <input
          maxLength={1}
          className="bms underLine"
          name="sel0010"
          id="sel0010"
          type="text"
          style={{ color: "green", width: "20px" }}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
      </GridItem>

      <GridItem col={8} row={19}>
        <pre></pre>
      </GridItem>

      <GridItem col={12} row={19}>
        <pre style={{ color: "#7faded" }}>{receivedData.usrid10}</pre>
      </GridItem>

      <GridItem col={24} row={19}>
        <pre style={{ color: "#7faded" }}>{receivedData.fname10}</pre>
      </GridItem>

      <GridItem col={48} row={19}>
        <pre style={{ color: "#7faded" }}>{receivedData.lname10}</pre>
      </GridItem>

      <GridItem col={73} row={19}>
        <pre style={{ color: "#7faded" }}>{receivedData.utype10}</pre>
      </GridItem>

      <GridItem col={12} row={21}>
        <pre style={{ color: "neutral" }}>Type</pre>
      </GridItem>

      <GridItem col={1} row={23}>
        <pre style={{ color: "red" }}>{receivedData.errmsg}</pre>
      </GridItem>

      <GridItem col={1} row={24}>
        <pre style={{ color: "yellow" }}>
          ENTER=Continue F3=Back F7=Backward F8=Forward
        </pre>
      </GridItem>
    </>
  );
}
