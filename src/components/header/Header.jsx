import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.scss';
import {HiOutlineSearch} from 'react-icons/hi';
import {SlMenu} from 'react-icons/sl';
import {VscChromeClose} from 'react-icons/vsc';
import logo from '../../assets/movix-logo.svg';
import Container from '../container/Container';


function Header() {
    const [showTopnav, setShowTopnav] = useState("top");
    const [firstScrollY, setFirstScrollY] = useState(0);       ///thiết lập thông số ban đầu của lastScroll là 0
    const [mobileMenu, setMobileMenu] = useState(false);     ///thiết lập trạng thái hiển thị ban đầu của mobileMenu là false dành cho di động
    const [query_tukhoa, setQuery_tukhoa] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    const openSearchInput = ()=>{
        setSearchInput(true);
        setMobileMenu(false);
    }


    const openMobileMenu = ()=>{
        setMobileMenu(true);
        setSearchInput(false);
    }


    const searchHandle = (event)=>{
        if(event.key === "Enter" && query_tukhoa.length > 0) {
            navigate(`/search/${query_tukhoa}`);
            setTimeout(()=>{
                setSearchInput(false);
            }, 1000);
        }
    }


    const navigationHandle = (type)=>{
        navigate(`/explore_khampha/${type}`);
        setMobileMenu(false);
    }


    //Sidebar là thanh bên; Navbar là thanh điều hướng
    const controlTopnav = ()=>{
        // console.log(window.scrollY);     ///hiển thị thông số trong console khi cuộn
        if(window.scrollY > 200) {
            ////chỉ ẩn navbar khi > firstScrollY và mobileMenu là false 
            if(window.scrollY > firstScrollY && !mobileMenu) {
                setShowTopnav("hide");
            } else {     /////nếu cuộn ngược lại(< firstScrollY) và mobileMenu là true
                setShowTopnav("show");
            }
        } else {
            setShowTopnav("top");
        }
        setFirstScrollY(window.scrollY);   ///thiết lập thông số cho mỗi lần cuộn cho firstScrollY
    }


    useEffect(()=>{
        window.addEventListener("scroll", controlTopnav);
        return ()=>{
            window.removeEventListener("scroll", controlTopnav);
        }
    }, [firstScrollY]);     ///đưa vào những thành phần có liên quan mà đã đc khai báo


    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [location]);


    return (
        ///nếu mobileMenu là true thì tiết lập hiển thị cho màn hình di động
        <header className={`header ${mobileMenu?"mobileView":""} ${showTopnav}`}>    {/*lấy giá trị của showTopnav*/}
            <Container>
                <div className="logo" onClick={()=>navigate("/")}>
                    <img src={logo} alt="" />
                </div>

                {/*desktop và mobile*/}
                <ul className="menuItems">       {/*ul.menuItems*/}
                    {/*sd dấu () khi muốn truyền đối số cho hàm, nếu chỉ muốn gọi hàm thì ko sd ()*/}
                    <li className="menuItem" onClick={()=>navigationHandle("movie")}>Movie</li>     {/*li.menuItem*3*/}
                    <li className="menuItem" onClick={()=>navigationHandle("tv")}>TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearchInput} />
                    </li>
                </ul>

                {/*mobile menu*/}
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearchInput} />
                    {
                        mobileMenu?<VscChromeClose onClick={()=>setMobileMenu(false)}/>:<SlMenu onClick={openMobileMenu}/>
                    }
                </div>
            </Container>

            {/*Search input; nếu searchInput true thì hiển thị input*/}
            {
                searchInput &&
                <div className="searchBar">
                    <Container>
                        <div className="searchInput">
                            <input type="text" placeholder="Search for a movie or tv show..."
                                onChange={(e) => setQuery_tukhoa(e.target.value)} onKeyUp={searchHandle} />
                            <VscChromeClose onClick={() => setSearchInput(false)} />
                        </div>
                    </Container>
                </div>
            }
        </header>
    );
}

export default Header;