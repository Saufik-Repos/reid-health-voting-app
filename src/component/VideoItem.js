import * as React from 'react';
import { useState } from 'react';

const VideoItem = ({ JoyAtWorkVideoVotingItem , totalVotes = 0, selectedItemId = 0, isConfig = false, isVote = false, isThank = false, handleSelectedItem = (id) => { }, submitHandling= ()=>{} }) => {


    let ch = "vc-video-card d-flex  justify-content-between align-items-center ";
    if (isVote) {
        ch = ch + " cursor-pointer"    
    }
    
    const votePercentage = JoyAtWorkVideoVotingItem?.vote_count && totalVotes ? Math.floor(JoyAtWorkVideoVotingItem.vote_count / totalVotes * 100) : 0;
    const votes = {
        marginLeft: `calc(${votePercentage < 3 ? 3 : votePercentage > 99 ? 99 : votePercentage}% - 27px)`
    }
    const widthStyle = {
        width: `${votePercentage}%`,
        animation: "animatebar .3s ease"
    }
    const isCheckHandling = (event) => {
        const isChecked = event.target.checked;
        handleSelectedItem(isChecked ? JoyAtWorkVideoVotingItem.Id : 0);
    }

    return (
        <label htmlFor={"selectCheck" + JoyAtWorkVideoVotingItem?.Id} className={selectedItemId == JoyAtWorkVideoVotingItem?.Id && isVote ? 'checked-border ' + ch : ch}>
            <div className={isThank ? "d-flex gap-4 flex-grow-1" : "d-flex gap-4 align-items-center flex-grow-1"}>
                <div className="position-relative">

                    <iframe key={isThank ? 'thank' : 'no-thank'} width="200px" height="124px" className={isThank ? "d-flex gap-4 flex-grow-1" : "d-flex gap-4 align-items-center flex-grow-1"}
                        src={JoyAtWorkVideoVotingItem.videolink.Url}
                        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                </div>
                <div className={isThank ? 'd-flex flex-column justify-content-between flex-grow-1' : 'flex-grow-1'}>
                    <h2 className="vc-video-card-title">{JoyAtWorkVideoVotingItem?.title}</h2>
                    {
                        isThank
                            ? <div>
                                <div className="vote-prograss-bar position-relative">
                                    <span className="prograss-number" style={votes}> {votePercentage} % </span>
                                    <div className="vote-prograssed" style={widthStyle}></div>
                                </div>
                                <p className="number-of-vote mb-0">{JoyAtWorkVideoVotingItem?.vote_count} votes</p>
                            </div>
                            : ''
                    }
                </div>
            </div>
            <div>
            </div>


            {
                isVote
                    ?
                    
                    <input checked={selectedItemId === JoyAtWorkVideoVotingItem?.Id} type="checkbox" name="" onChange={isCheckHandling} className='radio-like-checkbox' id={"selectCheck" + JoyAtWorkVideoVotingItem?.Id} />
                    : ""
            }

            {
                isConfig
                    ? <div className='cursor-pointer dropdown'>
                        <svg xmlns="http://www.w3.org/2000/svg" data-bs-toggle="dropdown" aria-expanded="false" width="25" height="5" viewBox="0 0 28 5" fill="none">
                            <path d="M13.6456 4.64C14.9276 4.64 15.9669 3.6013 15.9669 2.32C15.9669 1.0387 14.9276 0 13.6456 0C12.3636 0 11.3243 1.0387 11.3243 2.32C11.3243 3.6013 12.3636 4.64 13.6456 4.64Z" fill="#707070" />
                            <path d="M24.9702 4.64C26.2522 4.64 27.2915 3.6013 27.2915 2.32C27.2915 1.0387 26.2522 0 24.9702 0C23.6882 0 22.6489 1.0387 22.6489 2.32C22.6489 3.6013 23.6882 4.64 24.9702 4.64Z" fill="#707070" />
                            <path d="M2.32127 4.64C3.60327 4.64 4.64254 3.6013 4.64254 2.32C4.64254 1.0387 3.60327 0 2.32127 0C1.03927 0 0 1.0387 0 2.32C0 3.6013 1.03927 4.64 2.32127 4.64Z" fill="#707070" />
                        </svg>

                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Edit </a></li>
                            <li><a className="dropdown-item" href="#">Delete</a></li>
                        </ul>
                    </div>
                    : ""
            }


        </label>
    );
};

export default VideoItem;


