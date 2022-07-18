import React from 'react';
import { Table, TableBody, TableHead, TableCell, TableRow} from "@mui/material";
import useAsync from '../customHook/useAsync';
import axios from 'axios';
import Customer from './Customer';

async function getCustomers(){
    const response = await axios.get(`http://localhost:3001/customers`) //서버에서 받아오는거
    return response.data;
  }

const CustomerList = () => {
    const [state] = useAsync(getCustomers,[])
    const {loading, data, error} = state;
    if(loading)<div>로딩중...</div>;
    if(error)<div>에러가 발생했습니다.</div>;
    if(!data) return <div>로딩중입니다.</div>
    return (
        <div>
            <h2>고객리스트</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>연락처</TableCell>
                        <TableCell>생년월일</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>주소</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(customer =>
                        <Customer key ={customer.no} customer={customer}/>
                    )}
                    {/* {data.map(Customer=><Customer key={customer.no} customer={customer}/>)} */}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomerList;