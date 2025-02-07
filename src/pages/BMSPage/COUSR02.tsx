
import { type ChangeEvent, useState, type KeyboardEvent } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import httpConfig from '../../config/httpConfig';
import { useNavigate } from "react-router-dom";
import { GridItem } from '../../components/GridSystem';

export default function COUSR02() {

    type formInput = {
        userId: string,
        firstName: string,
        lastName: string,
        password: string,
        role: string,

    }

    type formOutput = {
        cousr02: string,
        cousr2a: string,
        trnname: string,
        title01: string,
        curdate: string,
        pgmname: string,
        title02: string,
        curtime: string,
        errmsg: string,

    }

    const [formData, setFormData] = useState<formInput>(
        {
            userId: '',
            firstName: '',
            lastName: '',
            password: '',
            role: '',

        });
    const [receivedData, setReceivedData] = useState<formOutput>(
        {
            cousr02: '',
            cousr2a: '',
            trnname: '',
            title01: '',
            curdate: 'mm/dd/yy',
            pgmname: '',
            title02: '',
            curtime: 'hh:mm:ss',
            errmsg: '',

        });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData((state) => {
            return {
                ...state,
                [event.target.name]: event.target.value,
            };
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (!formData.userId) {
                return; // Ngăn request nếu userId trống
            }

            try {
                const response = await axios.get(`${httpConfig.domain}/api/v1/user/${formData.userId}`);

                // Extracting the 'result' object correctly
                const userData = response.data?.result;

                if (userData && userData.userId) {
                    // Populate form fields with the retrieved data
                    setFormData({
                        userId: userData.userId.trim(),
                        firstName: userData.firstName.trim(),
                        lastName: userData.lastName.trim(),
                        password: userData.password.trim(),
                        role: userData.role.trim(),
                    });

                    // Clear error message if successful
                    setReceivedData(prevState => ({
                        ...prevState,
                        errmsg: '',
                    }));
                } else {
                    setReceivedData(prevState => ({
                        ...prevState,
                        errmsg: response.data.message || 'User not found'
                    }));
                }
            } catch (error) {
                console.error("Lỗi khi gửi request:", error);
                setReceivedData(prevState => ({
                    ...prevState,
                    errmsg: 'Lỗi kết nối đến server'
                }));
            }
        }
        else if (event.key === 'F4') {
            // Khi nhấn F4 -> Xóa userId và một số trường hiển thị
            setFormData({
                userId: '',
                firstName: '',
                lastName: '',
                password: '',
                role: '',
            });
        }
    };

    return (
        <>

            <Helmet>
                <title>COUSR02</title>
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


            <GridItem col={71} row={1}>
                <pre style={{ color: "#7faded" }}>
                    {receivedData.curdate}
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


            <GridItem col={71} row={2}>
                <pre style={{ color: "#7faded" }}>
                    {receivedData.curtime}
                </pre>
            </GridItem>


            <GridItem col={35} row={4}>
                <pre style={{ color: "neutral" }}>
                    Update User
                </pre>
            </GridItem>


            <GridItem col={6} row={6}>
                <pre style={{ color: "green" }}>
                    Enter User ID:
                </pre>
            </GridItem>


            <GridItem col={21} row={6}>
                <input maxLength={8} className='bms underLine' name='userId' id='userId' value={formData.userId} type='text' style={{ color: "green" }} onChange={handleInputChange} onKeyDown={handleSubmit} />
            </GridItem>

            <GridItem col={30} row={6}>
                <pre >

                </pre>
            </GridItem>


            <GridItem col={6} row={8}>
                <pre style={{ color: "yellow" }}>
                    **********************************************************************
                </pre>
            </GridItem>


            <GridItem col={6} row={11}>
                <pre style={{ color: "turquoise" }}>
                    First Name:
                </pre>
            </GridItem>


            <GridItem col={18} row={11}>
                <input maxLength={20} className='bms underLine' name='firstName' id='firstName' value={formData.firstName} type='text' style={{ color: "green" }} onChange={handleInputChange} onKeyDown={handleSubmit} />
            </GridItem>

            <GridItem col={39} row={11}>
                <pre >

                </pre>
            </GridItem>


            <GridItem col={45} row={11}>
                <pre style={{ color: "turquoise" }}>
                    Last Name:
                </pre>
            </GridItem>


            <GridItem col={56} row={11}>
                <input maxLength={20} className='bms underLine' name='lastName' id='lastName' value={formData.lastName} type='text' style={{ color: "green" }} onChange={handleInputChange} onKeyDown={handleSubmit} />
            </GridItem>

            <GridItem col={77} row={11}>
                <pre style={{ color: "green" }}>

                </pre>
            </GridItem>


            <GridItem col={6} row={13}>
                <pre style={{ color: "turquoise" }}>
                    Password:
                </pre>
            </GridItem>


            <GridItem col={16} row={13}>
                <input maxLength={8} className='bms underLine' name='password' id='password' value={formData.password} type='text' style={{ color: "green" }} onChange={handleInputChange} onKeyDown={handleSubmit} />
            </GridItem>

            <GridItem col={25} row={13}>
                <pre style={{ color: "#7faded" }}>
                    (8 Char)
                </pre>
            </GridItem>


            <GridItem col={6} row={15}>
                <pre style={{ color: "turquoise" }}>
                    User Type:
                </pre>
            </GridItem>


            <GridItem col={17} row={15}>
                <input maxLength={1} className='bms underLine' name='role' id='role' type='text' value={formData.role} style={{ color: "green" }} onChange={handleInputChange} onKeyDown={handleSubmit} />
            </GridItem>

            <GridItem col={19} row={15}>
                <pre style={{ color: "#7faded" }}>
                    (A=Admin, U=User)
                </pre>
            </GridItem>


            <GridItem col={1} row={23}>
                <pre style={{ color: "red" }}>
                    {receivedData.errmsg}
                </pre>
            </GridItem>


            <GridItem col={1} row={24}>
                <pre style={{ color: "yellow" }}>
                    ENTER=Fetch  F3=Save&&Exit  F4=Clear  F5=Save  F12=Cancel
                </pre>
            </GridItem>


        </>
    );
}
