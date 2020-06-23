/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';

const API_KEY = 'GG-QnD4ARsSheZwfl4ng0A';
const API_SECRET = 'Q3ybAFytf4F1YkPbgxFiX289c5w1IYu26ijV';

const startMeetingLink = 'https://zoom.us/oauth/authorize?response_type=code&client_id=9zmYaRNcRoWQk8DIjzhyxw&redirect_uri=https://zoom-php-app.herokuapp.com/callback.php';

const PAGE_TYPES = {
    CHOICE_MEETING: 'CHOICE_MEETING',
    JOIN_MEETING: 'JOIN_MEETING',
}

const App = () => {
  const [page, setPage] = useState(PAGE_TYPES.CHOICE_MEETING);
  const [displayName, setDisplayName] = useState('');
  const [meetingNumber, setMeetingNumber] = useState('');
  const [meetingPassword, setMeetingPassword] = useState('');

  const handleJoin = () => {
            const meetConfig = {
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            meetingNumber: parseInt(meetingNumber.replace(/\s+/g, '')),
            userName: displayName,
            passWord: meetingPassword,
            leaveUrl: "https://zoom.us",
            role: 0
        }

        const signature = ZoomMtg.generateSignature({
            meetingNumber: meetConfig.meetingNumber,
            apiKey: meetConfig.apiKey,
            apiSecret: meetConfig.apiSecret,
            role: meetConfig.role,
            success: function(res){
                console.log(res.result);
            }
        });

        ZoomMtg.init({
            leaveUrl: 'http://www.zoom.us',
            success: function () {
                ZoomMtg.join(
                    {
                        meetingNumber: meetConfig.meetingNumber,
                        userName: meetConfig.userName,
                        signature: signature,
                        apiKey: meetConfig.apiKey,
                        passWord: meetConfig.passWord,
                        success: function(res){
                            $('#nav-tool').hide();
                            console.log('join meeting success');
                        },
                        error: function(res) {
                            console.log(res);
                        }
                    }
                );
            },
            error: function(res) {
                console.log(res);
            }
        });
  }

  const handleSubmit = e => e.preventDefault();

  useEffect(() => {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }, []);

  if (page === PAGE_TYPES.CHOICE_MEETING) {
    return (
        <div>
        <nav id="nav-tool" className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <a href={startMeetingLink} className="navbar-brand">Start a meeting</a>
                <button onClick={() => setPage(PAGE_TYPES.JOIN_MEETING)} className="navbar-brand">Join the meeting</button>
            </div>
        </div>
        </nav>
    </div>
    )
  }

  return (
  <div>
        <nav id="nav-tool" className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">Zoom WebSDK</a>
            </div>
            <div id="navbar" className="websdktest">
                <form onSubmit={handleSubmit} className="navbar-form navbar-right" id="meeting_form">
                    <div className="form-group">
                        <input value={displayName} type="text" name="display_name" id="display_name" maxLength="100"
                            placeholder="Your name" onChange={e => setDisplayName(e.target.value)} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="meeting_number" id="meeting_number" value={meetingNumber}
                            style={{ width: '150px' }} onChange={e => setMeetingNumber(e.target.value)} placeholder="Meeting Number" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="meeting_pwd" id="meeting_pwd" onChange={e => setMeetingPassword(e.target.value)} value={meetingPassword} style={{ width: '150px' }}
                             placeholder="Meeting Password" className="form-control" />
                    </div>

                    <button onClick={handleJoin} className="btn btn-primary" id="join_meeting">Join</button>
                    <button className="btn btn-primary" id="clear_all">Clear</button>

                </form>
            </div>
        </div>
    </nav>
  </div>
)}

export default App;
