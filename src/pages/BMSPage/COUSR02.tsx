import {
    type ChangeEvent,
    useState,
    type KeyboardEvent,
    useEffect
} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import httpConfig from '../../config/httpConfig';
import { useNavigate } from 'react-router-dom';
import { GridItem } from '../../components/GridSystem';
import { dateFormat, timeFormat } from '../../utils/dateTimeFormat';

export default function COUSR02() {
    const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

    type formInput = {
        userId: string;
        firstName: string;
        lastName: string;
        password: string;
        role: string;
    };

    type formOutput = {
        cousr02: string;
        cousr2a: string;
        trnname: string;
        title01: string;
        curdate: string;
        pgmname: string;
        title02: string;
        curtime: string;
        errmsg: string;
        msg: string;
    };

    const [formData, setFormData] = useState<formInput>({
        userId: '',
        firstName: '',
        lastName: '',
        password: '',
        role: ''
    });
    const [receivedData, setReceivedData] = useState<formOutput>({
        cousr02: '',
        cousr2a: '',
        trnname: '',
        title01: '',
        curdate: 'mm/dd/yy',
        pgmname: '',
        title02: '',
        curtime: 'hh:mm:ss',
        errmsg: '',
        msg: ''
    });
    const validateFormData = (data: formInput) => {
        if (!data.userId) {
            receivedData.errmsg = 'User ID can NOT be empty...';
            return false;
        }
        if (!data.firstName) {
            receivedData.errmsg = 'First Name can NOT be empty...';
            return false;
        }

        if (!data.lastName) {
            receivedData.errmsg = 'Last Name can NOT be empty...';
            return false;
        }

        if (data.userId.length != 8) {
            receivedData.errmsg = 'User ID must be exactly 8 characters...';
            return false;
        }

        if (!data.password) {
            receivedData.errmsg = 'Password can NOT be empty...';
            return false;
        }

        if (data.password.length != 8) {
            receivedData.errmsg = 'Password must be exactly 8 characters...';
            return false;
        }

        if (!data.role) {
            receivedData.errmsg = 'User type can NOT be empty...';
            return false;
        }

        if (data.role != 'A' && data.role != 'U') {
            receivedData.errmsg = "User type must be 'A' or 'U'";
            return false;
        }

        return true;
    };
    const validateUserId = (userId: string) => {
        if (!userId.trim()) {
            receivedData.errmsg = 'UserID can NOT be empty...';
            return false;
        }
        if (userId.length !== 8) {
            receivedData.errmsg = 'User ID must be exactly 8 characters';
            return false;
        }
        return true;
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData(state => {
            return {
                ...state,
                [event.target.name]: event.target.value
            };
        });
    };
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    const navigate = useNavigate();

    const handleSubmit = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (validateUserId(formData.userId)) {
                // Ngăn request nếu userId trống
                try {
                    const response = await axios.get(
                        `${httpConfig.domain}/api/v1/user/${formData.userId}`
                    );

                    // Extracting the 'result' object correctly
                    const userData = response.data?.result;

                    if (userData && userData.userId) {
                        // Populate form fields with the retrieved data
                        setFormData({
                            userId: userData.userId.trim(),
                            firstName: userData.firstName.trim(),
                            lastName: userData.lastName.trim(),
                            password: userData.password.trim(),
                            role: userData.role.trim()
                        });

                        // Clear error message if successful
                        setReceivedData(prevState => ({
                            ...prevState,
                            errmsg: ''
                        }));
                    }
                } catch (error) {
                    console.error('Lỗi khi gửi request:', error);
                    setReceivedData(prevState => ({
                        ...prevState,
                        errmsg: (error as any)?.response?.data.message
                    }));
                }
            }
        } else if (event.key === 'F4') {
            // Khi nhấn F4 -> Xóa userId và một số trường hiển thị
            event.preventDefault();
            setFormData({
                userId: '',
                firstName: '',
                lastName: '',
                password: '',
                role: ''
            });
        } else if (event.key === 'F5') {
            event.preventDefault();
            if (validateFormData(formData)) {
                try {
                    const response = await axios.put(
                        httpConfig.domain +
                            httpConfig.resources.user +
                            `/${formData.userId}`,
                        formData
                    );
                    setFormData({
                        userId: '',
                        firstName: '',
                        lastName: '',
                        password: '',
                        role: ''
                    });
                    setReceivedData(_state => response.data);

                    setReceivedData(prevState => ({
                        ...prevState,
                        msg: response?.data.message
                    }));
                } catch (error: any) {
                    if (error.response) {
                        // Lấy lỗi đầu tiên từ details nếu có, nếu không thì lấy message
                        const errmsg =
                            typeof error.response.data.details === 'string'
                                ? error.response.data.details
                                : error.response.data.details
                                ? Object.values(error.response.data.details)[0]
                                : 'Lỗi không xác định';

                        setReceivedData(prevState => ({
                            ...prevState,
                            errmsg: errmsg // Thêm lỗi vào state
                        }));
                    }
                }
            }
        } else if (event.key === 'F3') {
            event.preventDefault();
            if (validateFormData(formData)) {
                try {
                    const response = await axios.put(
                        httpConfig.domain +
                            httpConfig.resources.user +
                            `/${formData.userId}`,
                        formData
                    );
                    setFormData({
                        userId: '',
                        firstName: '',
                        lastName: '',
                        password: '',
                        role: ''
                    });
                    setReceivedData(_state => response.data);

                    setReceivedData(prevState => ({
                        ...prevState,
                        msg: response?.data.message
                    }));
                    event.preventDefault();
                    navigate('/COADM01'); // Quay lại trang ADMIN
                } catch (error: any) {
                    if (error.response) {
                        // Lấy lỗi đầu tiên từ details nếu có, nếu không thì lấy message
                        const errmsg =
                            typeof error.response.data.details === 'string'
                                ? error.response.data.details
                                : error.response.data.details
                                ? Object.values(error.response.data.details)[0]
                                : 'Lỗi không xác định';

                        setReceivedData(prevState => ({
                            ...prevState,
                            errmsg: errmsg // Thêm lỗi vào state
                        }));
                    }
                }
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>COUSR02</title>
            </Helmet>

            <GridItem col={1} row={1}>
                <pre style={{ color: '#7faded' }}>Tran:</pre>
            </GridItem>

            <GridItem col={7} row={1}>
                <pre style={{ color: '#7faded' }}>{receivedData.trnname}</pre>
            </GridItem>

            <GridItem col={21} row={1}>
                <pre style={{ color: 'yellow' }}>{receivedData.title01}</pre>
            </GridItem>

            <GridItem col={65} row={1}>
                <pre style={{ color: '#7faded' }}>Date:</pre>
            </GridItem>

            <GridItem col={71} row={1}>
                <pre style={{ color: '#7faded' }}>
                    {dateFormat(currentDateTime)}
                </pre>
            </GridItem>

            <GridItem col={1} row={2}>
                <pre style={{ color: '#7faded' }}>Prog:</pre>
            </GridItem>

            <GridItem col={7} row={2}>
                <pre style={{ color: '#7faded' }}>{receivedData.pgmname}</pre>
            </GridItem>

            <GridItem col={21} row={2}>
                <pre style={{ color: 'yellow' }}>{receivedData.title02}</pre>
            </GridItem>

            <GridItem col={65} row={2}>
                <pre style={{ color: '#7faded' }}>Time:</pre>
            </GridItem>

            <GridItem col={71} row={2}>
                <pre style={{ color: '#7faded' }}>
                    {timeFormat(currentDateTime)}
                </pre>
            </GridItem>

            <GridItem col={35} row={4}>
                <pre style={{ color: 'neutral' }}>Update User</pre>
            </GridItem>

            <GridItem col={6} row={6}>
                <pre style={{ color: 'green' }}>Enter User ID:</pre>
            </GridItem>

            <GridItem col={21} row={6}>
                <input
                    maxLength={8}
                    className='bms underLine'
                    name='userId'
                    id='userId'
                    value={formData.userId}
                    type='text'
                    style={{ color: 'green' }}
                    onChange={handleInputChange}
                    onKeyDown={handleSubmit}
                />
            </GridItem>

            <GridItem col={30} row={6}>
                <pre></pre>
            </GridItem>

            <GridItem col={6} row={8}>
                <pre style={{ color: 'yellow' }}>
                    **********************************************************************
                </pre>
            </GridItem>

            <GridItem col={6} row={11}>
                <pre style={{ color: 'turquoise' }}>First Name:</pre>
            </GridItem>

            <GridItem col={18} row={11}>
                <input
                    maxLength={20}
                    className='bms underLine'
                    name='firstName'
                    id='firstName'
                    value={formData.firstName}
                    type='text'
                    style={{ color: 'green' }}
                    onChange={handleInputChange}
                    onKeyDown={handleSubmit}
                />
            </GridItem>

            <GridItem col={39} row={11}>
                <pre></pre>
            </GridItem>

            <GridItem col={45} row={11}>
                <pre style={{ color: 'turquoise' }}>Last Name:</pre>
            </GridItem>

            <GridItem col={56} row={11}>
                <input
                    maxLength={20}
                    className='bms underLine'
                    name='lastName'
                    id='lastName'
                    value={formData.lastName}
                    type='text'
                    style={{ color: 'green' }}
                    onChange={handleInputChange}
                    onKeyDown={handleSubmit}
                />
            </GridItem>

            <GridItem col={77} row={11}>
                <pre style={{ color: 'green' }}></pre>
            </GridItem>

            <GridItem col={6} row={13}>
                <pre style={{ color: 'turquoise' }}>Password:</pre>
            </GridItem>

            <GridItem col={16} row={13}>
                <input
                    maxLength={8}
                    className='bms underLine'
                    name='password'
                    id='password'
                    value={formData.password}
                    type='text'
                    style={{ color: 'green' }}
                    onChange={handleInputChange}
                    onKeyDown={handleSubmit}
                />
            </GridItem>

            <GridItem col={25} row={13}>
                <pre style={{ color: '#7faded' }}>(8 Char)</pre>
            </GridItem>

            <GridItem col={6} row={15}>
                <pre style={{ color: 'turquoise' }}>User Type:</pre>
            </GridItem>

            <GridItem col={17} row={15}>
                <input
                    maxLength={1}
                    className='bms underLine'
                    name='role'
                    id='role'
                    type='text'
                    value={formData.role}
                    style={{ color: 'green' }}
                    onChange={handleInputChange}
                    onKeyDown={handleSubmit}
                />
            </GridItem>

            <GridItem col={19} row={15}>
                <pre style={{ color: '#7faded' }}>(A=Admin, U=User)</pre>
            </GridItem>

            <GridItem col={1} row={23}>
                <pre style={{ color: 'red' }}>{receivedData.errmsg}</pre>
                <pre style={{ color: 'green' }}>{receivedData.msg}</pre>
            </GridItem>

            <GridItem col={1} row={24}>
                <pre style={{ color: 'yellow' }}>
                    ENTER=Fetch F3=Save&&Exit F4=Clear F5=Save F12=Cancel
                </pre>
            </GridItem>
        </>
    );
}
