import React from 'react';

const startMeetingLink = 'https://zoom.us/oauth/authorize?response_type=code&client_id=9zmYaRNcRoWQk8DIjzhyxw&redirect_uri=https://zoom-php-app.herokuapp.com/callback.php';

const Home = () => (
    <div>
    <nav id="nav-tool" className="navbar navbar-inverse navbar-fixed-top">
    <div className="container">
        <div className="navbar-header">
            <a href={startMeetingLink} className="navbar-brand">Start a meeting</a>
            <a href="/join" className="navbar-brand">Join the meeting</a>
        </div>
    </div>
</nav>


{/* <div id="show-test-tool">
    <button type="submit" className="btn btn-primary" id="show-test-tool-btn" title="show or hide top test tool">Show</button>
</div> */}
</div>
);

export default Home;