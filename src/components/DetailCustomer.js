import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import {useParams} from 'react-router-dom';


async function getCustomers(no){
    const response = await axios.get(`http://localhost:3001/customers/${no}`);  //server에서 주소 맞춰줌
    return response.data;
}

const DetailCustomer = () => {
    const { no } = useParams();
    console.log(no);
    const [ state ] = useAsync(()=>getCustomers(no),[no]);
    const { loading, data:customer, error } = state;
    console.log(customer);
    if(loading) return <div>로딩중입니다.......</div>;
    if(error) return<div>에러가 발생했습니다.</div>;
    if(!customer) return null;

    return (
        <div>
            <h2>고객 상세 정보</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell>{customer.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락쳐</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>생년월일</TableCell>
                        <TableCell>{customer.birth}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        <TableCell>{customer.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                        <TableCell>{customer.add1}{customer.add2}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default DetailCustomer;