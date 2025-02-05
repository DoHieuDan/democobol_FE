
import { type ChangeEvent, useState, type KeyboardEvent } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import httpConfig from '../../config/httpConfig';
import { useNavigate } from "react-router-dom";

import { GridItem } from '../../components/GridSystem';
import Input from '../../components/Input';

export default function COADM01() {

    type formInput = {
        option: string,

    }

    type formOutput = {
        coadm01: string,
        coadm1a: string,
        trnname: string,
        title01: string,
        curdate: string,
        pgmname: string,
        title02: string,
        curtime: string,
        optn001: string,
        optn002: string,
        optn003: string,
        optn004: string,
        optn005: string,
        optn006: string,
        optn007: string,
        optn008: string,
        optn009: string,
        optn010: string,
        optn011: string,
        optn012: string,
        errmsg: string,

    }

    const [formData, setFormData] = useState<formInput>(
        {
            option: '',

        });
    const [receivedData, setReceivedData] = useState<formOutput>(
        {
            coadm01: '',
            coadm1a: '',
            trnname: '',
            title01: '',
            curdate: 'mm/dd/yy',
            pgmname: '',
            title02: '',
            curtime: 'hh:mm:ss',
            optn001: ' ',
            optn002: ' ',
            optn003: ' ',
            optn004: ' ',
            optn005: ' ',
            optn006: ' ',
            optn007: ' ',
            optn008: ' ',
            optn009: ' ',
            optn010: ' ',
            optn011: ' ',
            optn012: ' ',
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

    const navigate = useNavigate(); // Hook để điều hướng không load lại trang
    const handleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const inputElement = event.currentTarget as HTMLInputElement;
            const value = inputElement.value.trim();

            if (!value) {
                alert("Please enter a valid option number...");
                return;
            }

            const numericValue = Number(value);
            if (isNaN(numericValue)) {
                alert("Invalid input. Please enter a number.");
                return;
            }

            if (numericValue >= 1 && numericValue <= 4) {
                const routes: { [key: number]: string } = {
                    1: "/COUSR00",
                    2: "/COUSR01",
                    3: "/COUSR02",
                    4: "/COUSR03",
                };

                // Điều hướng bằng React Router (không load lại trang)
                navigate(routes[numericValue]);
            } else if (numericValue >= 5) {
                alert("is coming soon ...");
            }

            // Xóa nội dung input sau khi submit
            inputElement.value = "";
        }
    };

    return (
        <>

            <Helmet>
                <title>COADM01</title>
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
                    Admin Menu
                </pre>
            </GridItem>


            <GridItem col={20} row={6}>
                <pre style={{ color: "#7faded" }}>
                    01. User List (Security)
                </pre>
            </GridItem>


            <GridItem col={20} row={7}>
                <pre style={{ color: "#7faded" }}>
                    02. User Add (Security)
                </pre>
            </GridItem>


            <GridItem col={20} row={8}>
                <pre style={{ color: "#7faded" }}>
                    03. User Update (Security)
                </pre>
            </GridItem>


            <GridItem col={20} row={9}>
                <pre style={{ color: "#7faded" }}>
                    04. User Delete (Security)
                </pre>
            </GridItem>

            <GridItem col={15} row={20}>
                <pre style={{ color: "turquoise" }}>
                    Please select an option :
                </pre>
            </GridItem>


            <GridItem col={41} row={20}>
                <Input maxLength={2} className='bms underLine' name='option' id='option' type='number' onChange={handleInputChange} onKeyDown={handleSubmit} />
            </GridItem>

            <GridItem col={44} row={20}>
                <pre style={{ color: "green" }}>

                </pre>
            </GridItem>


            <GridItem col={1} row={23}>
                <pre style={{ color: "red" }}>
                    {receivedData.errmsg}
                </pre>
            </GridItem>


            <GridItem col={1} row={24}>
                <pre style={{ color: "yellow" }}>
                    ENTER=Continue  F3=Exit
                </pre>
            </GridItem>


        </>
    );
}
