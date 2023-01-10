import React from 'react';
import useCollapse from 'react-collapsed';
import './collapsible_example.style.css';
function Section(props) {
    const config = {
        defaultExpanded: props.defaultExpanded || false,
        collapsedHeight: props.collapsedHeight || 0
    };
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
return (
    <div className="collapsible">
        <div className="header" {...getToggleProps()}>
            <div className="title">{props.title}</div>
            <div className="icon">
                <i className={'fas fa-chevron-circle-' + (isExpanded ? 'up' : 'down')}></i>
            </div>
        </div>
        <div {...getCollapseProps()}>
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
    );
}
function App() {
    return (
        <div className="preferences">
             <Section title="General" defaultExpanded="true">
                <label>
                    <input type="checkbox"/> Use dark theme
                </label>
                <label>
                    <input type="checkbox"/> Use internet connection to download resources
                </label>
                <br/><br/>
            </Section>
             <Section title="Application Startup">
                <label>
                    <input type="checkbox"/> Open the application when you log into the computer
                </label>
                <br/><br/><br/><br/>
            </Section>
            <Section title="Notifications" collapsedHeight="32">
                <i>Now you can get notifications to your smart watch!&nbsp;
                    <a href="#">Learn more</a>
                </i>
                <br/><br/>
                <label>
                    <input type="checkbox"/> Notify me task statuses via SMS
                </label>
                <br/><br/>
            </Section>
       </div>
    );
}
export default App;