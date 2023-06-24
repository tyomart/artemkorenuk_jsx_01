
import './test-styles.less'
import { useState, useEffect } from 'react'
// import Calculator from '../calculator/calculator';
// import Markdown from '../markdown/markdown';
// import Quotamat from '../quotamat/quotamat';


const log = console.log
const Test = () => {

  const [activeTab, setActiveTab] = useState('home');

  // const handleTabClick = (tabName) => {
  //   setActiveTab(tabName);
  // };

  // useEffect( () => {
  //   const tabContent = document.querySelector(`[id="${activeTab}"`);
  //   tabContent.classList.add('active');
  // }    
  // ,[activeTab]) 
  
  // const handleTabChange = () => {
  //   // const activeTab = this.state.activeTab;
   

  //   // Update the state
  //   // this.setState({
  //   //   activeTab: activeTab,
  //   // });
  // };


  return (
    <div>
      {/* <ul className="nav nav-tabs">
        <li className={activeTab === 'home' ? 'active' : ''}>
          <a href="#" onClick={() => handleTabClick('home')}>Home</a>
        </li>
        <li className={activeTab === 'about' ? 'active' : ''}>
          <a href="#" onClick={() => handleTabClick('about')}>About</a>
        </li>
        <li className={activeTab === 'contact' ? 'active' : ''}>
          <a href="#" onClick={() => handleTabClick('contact')}>Contact</a>
        </li>
      </ul> */}
      {/* <div className="tab-content">
        <div className={activeTab === 'home' ? 'active' : 'tab-pane'} id="home">
          
          <p><Calculator/></p>
        </div>
        <div className={activeTab === 'about' ? 'active' : 'tab-pane'} id="about">
          
          <p><Quotamat /></p>
        </div>
        <div className={activeTab === 'contact' ? 'active' : 'tab-pane'}id="contact">
          
          <p><Markdown /></p>
        </div> */}
      {/* </div> */}
      <div className ='aux'>test area</div>
    </div>

   
  );
};



    // const tabs = document.querySelectorAll('.tab');

    // tabs.forEach(tab => {
    //   tab.addEventListener('click', () => {
    //     tabs.forEach(tab => tab.classList.remove('active'));
    //     tab.classList.add('active');
    //   });
    // }); 

//BIG RETURN before OUTPUT ---------------------------------
    // return <> 

      
{/* <div class="accordion">
  <div class="tab">Tab 1</div>
  <div class="panel"><Calculator/></div>
  
  <div class="tab">Tab 2</div>
  <div class="panel"><Quotamat /></div>
  
  <div class="tab">Tab 3</div>
  <div class="panel"><Markdown /></div>
</div> */}

// </>
// }

export default Test;


