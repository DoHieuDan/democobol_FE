
import { type ChangeEvent, useState, useEffect, type KeyboardEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import axios from 'axios';
import httpConfig from '../../config/httpConfig';

import { GridItem } from '../../components/GridSystem';
import { dateFormat, timeFormat } from '../../utils/dateTimeFormat';

export default function COUSR01() {

    type formInput = {
        firstName: string,
        lastName: string,
        userId: string,
        password: string,
        role: string,

    }

    type formOutput = {
        cousr01: string,
        cousr1a: string,
        trnname: string,
        title01: string,
        curdate: string,
        pgmname: string,
        title02: string,
        curtime: string,
        errmsg: string,
        msg: string

    }

    const [formData, setFormData] = useState<formInput>(
        {
            firstName: '',
            lastName: '',
            userId: '',
            password: '',
            role: '',

        });

    const [receivedData, setReceivedData] = useState<formOutput>(
        {
            cousr01: '',
            cousr1a: '',
            trnname: 'CU01',
            title01: '',
            curdate: 'mm/dd/yy',
            pgmname: 'COUSR01C',
            title02: '',
            curtime: 'hh:mm:ss',
            errmsg: '',
            msg: '',

        });

    const navigate = useNavigate();

    const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "F3") {
                event.preventDefault();
                navigate("/COADM01"); // Quay lại trang ADMIN
            }

            if (event.key === "F12") {
                event.preventDefault();
                navigate("/"); // Quay lại trang HOME
            }

            if (event.key === "F4") {
                event.preventDefault();
                clearForm(); // Xóa toàn bộ thông tin đã nhập
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [navigate]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData((state) => {
            return {
                ...state,
                [event.target.name]: event.target.value,
            };
        });
    };


    const clearForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            userId: '',
            password: '',
            role: '',
        });
        setReceivedData(prevState => ({
            ...prevState,
            errmsg: '',
            msg: '',
        }))
    };

    const validateFormData = (data: formInput) => {
        if (!data.firstName) {
            receivedData.errmsg = "First Name can NOT be empty..."
            return false;
        }

        if (!data.lastName) {
            receivedData.errmsg = "Last Name can NOT be empty..."
            return false;
        }

        if (!data.userId) {
            receivedData.errmsg = "User ID can NOT be empty..."
            return false;
        }

        if (data.userId.length != 8) {
            receivedData.errmsg = "User ID must be exactly 8 characters..."
            return false;
        }

        if (!data.password) {
            receivedData.errmsg = "Password can NOT be empty..."
            return false;
        }

        if (data.password.length != 8) {
            receivedData.errmsg = "Password must be exactly 8 characters..."
            return false;
        }

        if (!data.role) {
            receivedData.errmsg = "User type can NOT be empty..."
            return false;
        }

        if (data.role != "A" && data.role != "U") {
            receivedData.errmsg = "User type must be 'A' or 'U'"
            return false;
        }

        return true;
    };

    const handleSubmit = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {

            if (validateFormData(formData)) {
                try {
                    const response = await axios.post(
                        httpConfig.domain + httpConfig.resources.user,
                        formData
                    );

                    setFormData({
                        firstName: '',
                        lastName: '',
                        userId: '',
                        password: '',
                        role: '',
                    });
                    setReceivedData(_state => response.data);

                    setReceivedData(prevState => ({
                        ...prevState,
                        msg: response?.data.message,
                    }));

                } catch (error: any) {
                    if (error.response) {
                        // Lấy lỗi đầu tiên từ details nếu có, nếu không thì lấy message
                        const errmsg = typeof error.response.data.details === "string" ? error.response.data.details
                            : error.response.data.details
                                ? Object.values(error.response.data.details)[0] : "Unknown error";

                        setReceivedData(prevState => ({
                            ...prevState,
                            errmsg: errmsg, // Thêm lỗi vào state
                        }))
                    }
                }
            }
        }
    };

    return (
        <>

            <Helmet>
                <title>COUSR01</title>
            </Helmet>

            <GridItem col={1} row={1}>
                <pre style={{ color: "#7faded" }}>
                    Tran:
                </pre>
            </GridItem>


            <GridItem col={7} row={1}>
                <pre style={{ color: "#7faded" }}>
                    {receivedData.trnname}
                </pre>
            </GridItem>


            <GridItem col={21} row={1}>
                <pre style={{ color: "yellow" }}>
                    {receivedData.title01}
                </pre>
            </GridItem>


            <GridItem col={65} row={1}>
                <pre style={{ color: "#7faded" }}>
                    Date:
                </pre>
            </GridItem>

            <GridItem row={1} col={71}>
                <pre style={{ color: "#7faded" }}>
                    {dateFormat(currentDateTime)}
                </pre>
            </GridItem>

            <GridItem row={2} col={71}>
                <pre style={{ color: "#7faded" }}>
                    {timeFormat(currentDateTime)}
                </pre>
            </GridItem>

            <GridItem col={1} row={2}>
                <pre style={{ color: "#7faded" }}>
                    Prog:
                </pre>
            </GridItem>


            <GridItem col={7} row={2}>
                <pre style={{ color: "#7faded" }}>
                    {receivedData.pgmname}
                </pre>
            </GridItem>


            <GridItem col={21} row={2}>
                <pre style={{ color: "yellow" }}>
                    {receivedData.title02}
                </pre>
            </GridItem>


            <GridItem col={65} row={2}>
                <pre style={{ color: "#7faded" }}>
                    Time:
                </pre>
            </GridItem>


            <GridItem col={35} row={4}>
                <pre style={{ color: "neutral" }}>
                    Add User
                </pre>
            </GridItem>


            <GridItem col={6} row={8}>
                <pre style={{ color: "turquoise" }}>
                    First Name:
                </pre>
            </GridItem>


            <GridItem col={18} row={8}>
                <input maxLength={20} className='bms underLine' name='firstName' id='firstName' type='text' style={{ color: "green" }} value={formData.firstName} onChange={handleInputChange} onKeyDown={handleSubmit} />
            </GridItem>

            <GridItem col={39} row={8}>
                <pre >

                </pre>
            </GridItem>


            <GridItem col={45} row={8}>
                <pre style={{ color: "turquoise" }}>
                    Last Name:
                </pre>
            </GridItem>


            <GridItem col={56} row={8}>
                <input maxLength={20} className='bms underLine' name='lastName' id='lastName' type='text' style={{ color: "green" }} value={formData.lastName} onChange={handleInputChange} onKeyDown={handleSubmit} />
            </GridItem>

            <GridItem col={77} row={8}>
                <pre style={{ color: "green" }}>

                </pre>
            </GridItem>


            <GridItem col={6} row={11}>
                <pre style={{ color: "turquoise" }}>
                    User ID:
                </pre>
            </GridItem>


            <GridItem col={15} row={11}>
                <input maxLength={8} className='bms underLine' name='userId' id='userId' type='text' style={{ color: "green" }} value={formData.userId} onChange={handleInputChange} onKeyDown={handleSubmit} />
            </GridItem>

            <GridItem col={24} row={11}>
                <pre style={{ color: "#7faded" }}>
                    (8 Char)
                </pre>
            </GridItem>


            <GridItem col={45} row={11}>
                <pre style={{ color: "turquoise" }}>
                    Password:
                </pre>
            </GridItem>


            <GridItem col={55} row={11}>
                <input maxLength={8} className='bms underLine' name='password' id='password' type='text' style={{ color: "green" }} value={formData.password} onChange={handleInputChange} onKeyDown={handleSubmit} />
            </GridItem>

            <GridItem col={64} row={11}>
                <pre style={{ color: "#7faded" }}>
                    (8 Char)
                </pre>
            </GridItem>


            <GridItem col={6} row={14}>
                <pre style={{ color: "turquoise" }}>
                    User Type:
                </pre>
            </GridItem>


            <GridItem col={17} row={14}>
                <input maxLength={1} className='bms underLine' name='role' id='role' type='text' style={{ color: "green" }} value={formData.role} onChange={handleInputChange} onKeyDown={handleSubmit} />
            </GridItem>

            <GridItem col={19} row={14}>
                <pre style={{ color: "#7faded" }}>
                    (A=Admin, U=User)
                </pre>
            </GridItem>


            <GridItem col={1} row={23}>
                <pre style={{ color: "red" }}>
                    {receivedData.errmsg}
                </pre>
                <pre style={{ color: "green" }}>
                    {receivedData.msg}
                </pre>
            </GridItem>


            <GridItem col={1} row={24}>
                <pre style={{ color: "yellow" }}>
                    ENTER=Add User  F3=Back  F4=Clear  F12=Exit
                </pre>
            </GridItem>


        </>
    );
}
