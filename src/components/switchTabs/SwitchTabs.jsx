import React, { useState } from 'react';
import './style.scss';

function SwitchTabs({data, onTabChange_button}) {  ///lấy các đối tượng đc truyền từ Trending.jsx và phải đặt cùng tên với đối tượng đó
    const [selectedTab_button, setSelectedTab_button] = useState(0);
    const [left, setLeft] = useState(0);


    const activeTab = (index, value)=>{
        setLeft(index*100);
        setTimeout(()=>{
            setSelectedTab_button(index);
        }, 300);
        onTabChange_button(value, index);       ////truyền cho props thì phải truyền giá trị trước, index sau
    }


    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {/*sửu dụng map để duyệt qua từng phần tử của mảng; các thẻ phần tử bên trong map() cần có khóa. */}
                {/* phần tử của đối tượng mảng là các đối tượng không có tên và mỗi phần tử chỉ chứa duy nhất giá trị chuỗi nên phải lấy chỉ mục index của từng phần tử trong mảng làm key */}
                {/*nếu mảng chứa các phần tử là các đối tượng có tên thì phải chỉ ra tên đối tượng đó khi tham chiếu*/}
                {data.map((arrElement, index)=>(    ///sd () khi đó là 1 tag
                    <span key={index} className={`tabItem ${selectedTab_button === index?"active":""}`} onClick={()=>activeTab(index, arrElement)}>
                        {arrElement}     {/*in ra giá trị của đã duyệt*/}
                    </span>
                ))}
                <span className="movingBg" style={{left}} />
            </div>
        </div>
    );
}

export default SwitchTabs;