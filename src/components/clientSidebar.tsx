import React from "react";
import { Link, useLocation} from "react-router-dom";
import styled from "styled-components"



const ClientSidebar = () => {

    const activedMenu = useLocation(); //현재 경로 확인
    const defaultPath = activedMenu.pathname === "/" ? "/my/order" : activedMenu.pathname;

    const menuItems = [
        {name: '주문내역 조회', path:"/my/order"},
        {name: '회원정보 수정', path:"/my/modify"},
        {name: '리뷰관리', path:"/my/review"},
        {name: '문의사항', path:"/my/question"}
    ];

    return (
        <SidebarContainer>
            <MenuList>
                {menuItems.map((item) => (
                    <MenuItem
                    key={item.path}
                    isActive={defaultPath === item.path }>
                        <Link to={item.path} style={{textDecoration: 'none', color: 'inherit'}}>
                            {item.name}
                        </Link>
                    </MenuItem>

                ))}
            </MenuList>
        </SidebarContainer>
    );
};

export default ClientSidebar;

const SidebarContainer = styled.div`
    width: 11%;
    height: 100%
    max-width: 100px;
    background-color: white;
`;

const MenuList = styled.ul`
    list-style: none;
    padding: 0;
`;

const MenuItem = styled.li<{isActive: boolean}>`
    padding: 20px 10px;
    cursor: pointer;
    font-size: 0.9rem;
    background-color: ${({isActive}) => (isActive ? 'rgba(255, 93, 93, 0.8)' : 'white')};
    color: ${({isActive}) => (isActive ? 'white' : 'black')};
    text-align: center;
    &:hover {
        filter: brightness(0.95); 
    }
`;