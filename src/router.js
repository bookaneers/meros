// import dependencies and libraries
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import components and layouts
import Header from './components/header';
import Home from './components/home';
import ListAll from './components/listparts';
import AddParts from './components/addparts'; // imports from the folder addparts inside components
import UpdateParts from './components/updateparts';
import DeleteParts from './components/deleteparts';
import MainLayout from './layouts/mainlayout';

// build Router component with a Header and Routes
const Router = () => {
  return(
    <BrowserRouter>
      <Header/>
      <MainLayout>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='listparts' element={<ListAll/>}/>
            <Route path='addparts' element={<AddParts/>}/>
            <Route path='updateparts' element={<UpdateParts/>}/>
            <Route path='deleteparts' element={<DeleteParts/>}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

// export component Router
export default Router;