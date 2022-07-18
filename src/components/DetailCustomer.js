import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import { useParams, useNavigate, Link } from 'react-router-dom';



async function getCustomers(no){
    const response = await axios.get(`http://localhost:3001/customers/${no}`);  //server에서 주소 맞춰줌
    return response.data;
}

const DetailCustomer = () => {
    const { no } = useParams();
    const navigate = useNavigate();
    console.log(no);
    const [ state ] = useAsync(()=>getCustomers(no),[no]);
    const { loading, data:customer, error } = state;  // data:customer??
    // console.log(customer);

    // 삭제하기
    const onDelete = () => {
        axios.delete(`http://localhost:3001/delCustomer/${no}`)
        .then(result=>{
            console.log("삭제되었습니다.");
            navigate("/");
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    // 업데이트하기
    

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
                    <TableRow>
                        <TableCell colSpan={2}>
                            <button onClick={onDelete}>삭제</button>
                            <button><Link to={`/editcustomer/${no}`}>수정</Link></button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default DetailCustomer;