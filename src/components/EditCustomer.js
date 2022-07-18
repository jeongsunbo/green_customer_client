import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import  PopupDom  from './PopupDom';
import PopupPostCode from './PopupPostCode';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import useAsync from '../customHook/useAsync';



const EditCustomer = () => {
    const { no } = useParams();
    const [ formData, setFormData ] = useState({  //input에 입력되는 값은 formdata가 가지고 있음
        c_name:"",
        c_phone:"",
        c_birth:"",
        c_gender:"",
        c_add1:"",
        c_add2:"",
    });
    async function getCustomer(no){
        const response = await axios.get(`http://localhost:3001/customers/${no}`);  //server에서 주소 맞춰줌
        return response.data;
    }
    
    const [ state ] = useAsync(()=>getCustomer(no),[no]);
    const { loading, error, data:customer } = state;

    // ** 다시 확인하기
    // useEffect(()=>{
    //     console.log('렌더링 될 때마다 실행');
    // })
    // //useEffect에 두번째 인자로 []를 넘겨주면 마운트될 때만 호출한다
    // //componentDidMount
    // useEffect(()=>{
    //     console.log('처음 마운트될 때만 useEffect호출');
    // }, [])
    // useEffect(()=>{
    //     console.log('배열요소 안의 값이 업데이트 되면  useEffect호출');
    // }, [count])




    useEffect(()=>{   // 페이지가 로딩될때 
        setFormData({
            c_name: customer ? customer.name : "",
            c_phone: customer ? customer.phone : "",
            c_birth: customer ? customer.birth : "",
            c_gender: customer ? customer.gender : "",
            c_add1: customer ? customer.add1 : "",
            c_add2: customer ? customer.add2 : "",
        })
    },[customer])  //[customer]의존성 배열 얘가 변경될때 초기값을 넣어줌

    const navigate = useNavigate(); 
    // 우편번호 관리하기
    const onAddData = (data) => {
        console.log(data);
        setFormData({
            ...formData,
            c_add1:data.address,
            c_add2:data.address
        })
    }
    // 팝업창 상태관리
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    // 팝업창 상태 true로 변경
    const openPostCode = () => {
        setIsPopupOpen(true);
    }
    // 팝업창 상태 false로 변경
    const closePostCode = () => {
        setIsPopupOpen(false);
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    // 폼 submit이벤트
    const onSubmit = (e) => {
        // 폼에 원래 연결된 이벤트를 제거 e.preventDefault();
        e.preventDefault();
        console.log(formData);
        // 전화번호가 숫자인지 체크하기
        if(isNaN(formData.c_phone)){
            alert("전화번호는 숫자만 입력하세요.");
            setFormData({
                ...formData,
                c_phone:""
            })
        }
        // input에 값이 있는지 체크하고
        
        if(formData.c_name !== "" && formData.c_phone !== "" &&
        formData.c_birth !== "" && formData.c_gender !== "" && 
        formData.c_add1 !== "" && formData.c_add1 !== ""){
            UpdateCustomer();
        }
        
    }
    function UpdateCustomer(){
        //put : 데이터 수정
        axios.put(`http://localhost:3001/editcustomer/${no}`, formData) //서버에 등록할때 경로랑 같아야함ㄴ
        .then((result)=>{
            console.log(result);
            navigate("/");
        })
        .catch(e=>{
            console.log(e);
        })
    }
    if(loading) return <div>로딩중...</div>;
    if(error) return <div> 페이지를 나타낼 수 없습니다.</div>;
    if(!customer) return null; //데이터를 받아오지 못하면 null  
    return (
        <div>
            <h2>고객 정보 수정하기</h2>
            <form onSubmit={onSubmit}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>
                                <input name='c_name' type="text"
                                value={formData.c_name}
                                onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell>
                                <input name='c_phone' type="text"
                                value={formData.c_phone}
                                onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell>
                                <input name='c_birth' type="date"
                                value={formData.c_birth}
                                onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                여성<input name='c_gender' type="radio"
                                value="여성"
                                onChange={onChange}
                                checked={formData.c_gender === "여성" ? true : false }
                                />
                                남성<input name='c_gender' type="radio"
                                value="남성"
                                onChange={onChange}
                                checked={formData.c_gender === "남성" ? true : false }
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell>
                                <input name='c_add1' type="text"
                                value={formData.c_add1}
                                onChange={onChange}/>
                                <input name='c_add2' type='text'
                                value={formData.c_add2}
                                onChange={onChange}/>
                                <button type='button' onClick={openPostCode}>우편번호 검색</button>
                                <div id='popupDom'>
                                    {isPopupOpen && (
                                        <PopupDom>
                                            <PopupPostCode onClose={closePostCode}
                                            onAddData={onAddData}
                                            />
                                        </PopupDom>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <button type='submit'>등록</button>
                                <button type='reset'>취소</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
};

export default EditCustomer;