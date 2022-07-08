import './App.css';
import CustomerList from './components/CustomerList';
import DetailCustomer from './components/DetailCustomer';
import Footer from './components/Footer';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import CreateCustomer from './components/CreateCustomer';

// const customers = [
//   {
//     no:1,
//     name:"고객1",
//     phone:"01012345675",
//     birth:"19960108",
//     gender:"여성",
//     add:"울산시 남구"
//   },
//   {
//     no:2,
//     name:"고객2",
//     phone:"01012345675",
//     birth:"19960108",
//     gender:"여성",
//     add:"울산시 북구"
//   },
//   {
//     no:3,
//     name:"고객3",
//     phone:"01012345675",
//     birth:"19960108",
//     gender:"여성",
//     add:"울산시 동구"
//   },
// ]

function App() {
  
  return (
    <div className="App">
      <Header/>
      <Routes>
      {/* customers={customers} */}
        <Route path="/" element={<CustomerList/>} />  
        <Route path='/detailview/:no' element={<DetailCustomer/>} />
        <Route path='/write' element={<CreateCustomer/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
